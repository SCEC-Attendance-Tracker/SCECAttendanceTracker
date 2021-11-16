import * as React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { DataGrid, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarExport, GridActionsCellItem} from '@mui/x-data-grid';

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { createTheme, makeStyles, createStyles } from "@material-ui/core";
import EditEventModal from './EditEventModal';

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const newTheme = createTheme({
  palette: {
    primary: {
      main: "#500000" // Maroon
    },
    secondary: {
      main: "#ffff33" // Yellow
    },
    divider: {
      main: 'rgba(0, 0, 0, 0.2)' // Maroon
    },
  },fontFamily: 'Roboto Mono'
});

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
      },
      grid: {
        marginTop: '30px',

        '& .MuiDataGrid-main': {
          width: '100%',
        },

        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: '800',
          textOverflow: 'clip',
        },

      },
      toolbar: {
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
      },
      textField: {
        [theme.breakpoints.down('xs')]: {
          width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
          color: '#500000',
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid rgba(0, 0, 0, 0.2) !important`,
        },
        '& .MuiInput-underline:after': {
          borderBottom: `2px solid  #500000 !important`,
        },
      },
      button: {
        backgroundColor: '#500000',
        color: '#fff',
        padding: '1em',
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }
      },
      actionButton: {
        color: '#500000 !important',
        margin: `${theme.spacing(1)}px !important`,
        '&:hover': {
          backgroundColor: 'rgba(80, 0, 0, 0.05) !important',
        }
      },
      iconButton: {
        backgroundColor: '#500000',
        color: '#fff',
        borderRadius: '100%',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }
      },
    }),
  { newTheme },
);

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <div>
        <GridToolbarFilterButton className={classes.actionButton}/>
        <GridToolbarDensitySelector className={classes.actionButton}/>
      </div>
      <div>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          className={classes.textField}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
        <GridToolbarExport className={classes.actionButton}/>
      </div>
    </div>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

//var data;

export default function DataTable(data, editable, deletable) {

  /*if (data == undefined) {
    data = getData(props);
    //console.log(data);
  }*/

  const classes = useStyles();

  const [searchText, setSearchText] = React.useState('');
  const [dataRows, setDataRows] = React.useState(data.rows);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setDataRows(filteredRows);
  };

  React.useEffect(() => {
    setDataRows(data.rows);
  }, [data.rows]);

  const deleteRow = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );

  // const updateRow = React.useCallback(
  //   (id) => () => {
  //     console.log("Reached here"),
  //     <EditEventModal id={id} open={true}/>
  //   }
  // )

  // const updateRow = (row) => {
  //       console.log("Reached here")
  //       return (
  //         <EditEventModal id={row.event_id}/>
  //         // id={row.event_id} open={open}
  //       )
  // }

  console.log(data)

  data.columns.push(
    {
      field: 'actions',
      type: 'actions',
      width: 120,
      getActions: (params) => [
        editable && <EditEventModal id={params.row.event_id}/>,
        // editable && <GridActionsCellItem
        //   icon={<EditIcon />}
        //   label="Edit"
        //   onClick={() => {
        //     console.log(params)
        //     updateRow(params.row)
        //   }}
        // />,
        deletable && <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Deleted"
          onClick={deleteRow(params.id)}
        />,
      ],
    });

  const dataColumns = React.useMemo(
    () => data.columns,
    [deleteRow],
  );


  return (
    <div style={{ height: '50em', width: '100%'}}>
      <DataGrid
        className={classes.grid}
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
        rows={dataRows}
        columns={dataColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}
