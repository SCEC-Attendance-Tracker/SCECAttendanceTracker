import * as React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { DataGrid, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarExport, GridActionsCellItem} from '@mui/x-data-grid';

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';

import { createTheme, makeStyles, createStyles } from "@material-ui/core"

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
        //alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
      },
      grid: {
        marginTop: '10px',
        
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
        padding: '0 10px'
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

const deleteRow = (row, controller) => {
  const token = document.querySelector('[name=csrf-token]').content;
  fetch(`/api/v1/${controller}/${row.event_id}`, {
    method: 'DELETE', 
    headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
  }).then(() => {
    //location.reload();
  })
}

function DeleteSelected(props) {
  return (
    <IconButton
      aria-label="Delete"
      size="small"
      onClick={() => {
        console.log(props.rows);
        for (var i in props.rows) {
          console.log(props.rows[i]);
          deleteRow(props.rows[i], props.controller)
        }
      }}
    >
      <DeleteIcon />
    </IconButton>
  )
}

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
        {props.admin &&
          <DeleteSelected rows={props.selectedRows} controller={props.controller} />
        }
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

export default function DataTable({data, member = null}) {
  
  /*if (data == undefined) {
    data = getData(props);
    //console.log(data);
  }*/
  var controller;
  for (var col in data.columns) {
    var attendanceCheck = 0;
    console.log(col)
    if (data.columns[col].field == 'start_time') {
      controller = 'events'; break;
    }
    else if (data.columns[col].field == 'first_name') {
      controller = 'members'; break;
    }
    else if (data.columns[col].field == 'member_id' || data.columns[col].field == 'event_id') {
      attendanceCheck = attendanceCheck + 1;
    }
    if (attendanceCheck >= 2) {
      controller = 'attendances'; break;
    }
  }
  
  console.log(controller);
  console.log(member);
  console.log(data);
  const classes = useStyles();
  
  const [searchText, setSearchText] = React.useState('');
  const [dataRows, setDataRows] = React.useState(data.rows);
  const [selectedRows, setSelectedRows] = React.useState([]);
  var hideColumn = member ? (member.admin ? false : true) : true;

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
  
  const selectionChange = (rows) => {
    setSelectedRows(rows);
    /*const filteredRows = data.rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });*/
    console.log(selectedRows);
    console.log(rows);
    console.log(selectedRows);
    //setSelectedRows(selectedRows);
  }

  React.useEffect(() => {
    setDataRows(data.rows);
  }, [data.rows]);
  
  if (member != null) {
    data.columns.push(
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        hide: hideColumn,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              console.log(params);
              if (params.row.start_time) {
                deleteRow(params.row, 'events')
              }
              else if (params.row.first_name) {
                deleteRow(params.row, 'members')
              }
              else if (params.row.member_id && params.row.event_id) {
                deleteRow(params.row, 'attendances')
              }
            }}
          />,
        ],
      });
  }
    
  console.log(data.columns);
  
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
            selectedRows: selectedRows,
            controller: controller,
            admin: !hideColumn
          },
        }}
        rows={dataRows}
        columns={dataColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = data.rows.filter((row) =>
            selectedIDs.has(row.id.toString()),
          );
          console.log(selectedRowData);
          console.log(selectedIDs);
          selectionChange(selectedRowData);
        }}
      />
    </div>
  );
}