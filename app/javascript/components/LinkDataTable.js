import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, makeStyles, createStyles } from "@material-ui/core"
import { Link } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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

const useStyles = makeStyles((theme) =>
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
      marginTop: '30px',  
      '& .MuiDataGrid-main': {
        width: '100%',
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: '800',
        textOverflow: 'clip',
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

const handleClick = (event, cellValues) => {
  console.log(cellValues.row);
};

const handleCellClick = (param, event) => {
  event.stopPropagation();
};

const editRow = (row) => {
  
}

const deleteRow = (row) => {
  const token = document.querySelector('[name=csrf-token]').content;
  fetch(`/api/v1/links/${row.id}`, {
    method: 'DELETE', 
    headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
  }).then(() => {
    location.reload();
  })
}

const columns = [
  {
    headerClassName: 'theme-header', 
    field: 'id', 
    headerName: 'ID',
    hide: true
  },
  { 
    headerClassName: 'theme-header',
    field: 'name', 
    headerName: 'Name',
    hide: true
  },
  {
    headerClassName: 'theme-header',
    field: 'url',
    headerName: 'URL',
    minWidth: 150,
    flex: 1,
    renderCell: (cellValues) => {
      return <Link href={cellValues.row.url} target="_blank">{cellValues.row.name}</Link>;
    }
  },
  { 
    headerClassName: 'theme-header',
    field: 'description', 
    headerName: 'Description',
    minWidth: 150,
    flex: 1
  }
];

export default function LinkDataTable(props) {
  var member;	
  if (props.props.member != undefined) {
    member = props.props.member[0]
  }
  var rows = props.props.links;
  const classes = useStyles();
  
  { (member != undefined) && (member.admin) &&
    columns.push(
      { 
        field: 'actions', 
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              console.log(params);
              editRow(params.row)
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              console.log(params);
              deleteRow(params.row)
            }}
          />
        ],
      }
    )
  }

  return (
    <div style={{ height: '50em', width: "100%" }}>
      <DataGrid
        rowHeight={120}
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={handleCellClick}
      />
    </div>
  );
}
