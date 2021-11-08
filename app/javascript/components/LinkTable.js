import * as React from 'react';
import { DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { createTheme, makeStyles, createStyles } from "@material-ui/core"

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

export default function DataTable(data) {
  const classes = useStyles();
  
  const [dataRows, setDataRows] = React.useState(data.rows);

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
  data.columns.push(
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteRow(params.id)}
        />,
      ],
    });
    
  console.log(data.columns);
  
  const dataColumns = React.useMemo(
    () => data.columns,
    [deleteRow],
  );

  return (
    <div style={{ height: '50em', width: '100%'}}>
      <DataGrid
        className={classes.grid}
        rows={dataRows}
        columns={dataColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}