import React, { useRef } from 'react';
import EditLinkButton from "./EditLinkButton";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, makeStyles, createStyles } from "@material-ui/core"
import { Link } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button }from '@material-ui/core';

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
        field: 'edit', 
        headerName: " ",
        disableColumnMenu: true,
        sortable: false,
        width: 60,
        renderCell: (params) => {
          const [open, setOpen] = React.useState(false);
          const inputName = useRef('')
          const inputUrl = useRef('')
          const inputDescription = useRef('')
          
          const handleClickOpen = () => {
            setOpen(true);
          };
          
          const handleSubmit = (row) => {
            const token = document.querySelector('[name=csrf-token]').content;
            
            var editedLink = {
              name: inputName.current.value,
              url: inputUrl.current.value,
              description: inputDescription.current.value,
            }
            
            fetch(`/api/v1/links/${row.id}`, {
              method: 'PUT', 
              body: JSON.stringify(editedLink),
              headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
            }).then(() => {
              location.reload();
            });
          
            setOpen(false);
          };

          const handleClose = () => {
            setOpen(false);
          };
          
          return (
            <div>
              <IconButton size="medium" sx={{justifyContent: 'center'}} onClick={handleClickOpen}>
                <EditIcon/>
              </IconButton>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Link</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To edit the link, please update the attributes below:
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Link Name"
                    type="string"
                    fullWidth
                    variant="standard"
                    required
                    defaultValue= {params.row.name}
                    inputRef = {inputName}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="url"
                    label="Link URL (https://www.example.com)"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                    defaultValue= {params.row.url}
                    inputRef = {inputUrl}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                    defaultValue= {params.row.description}
                    inputRef = {inputDescription}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    handleSubmit(params.row);
                  }}
                  >Edit</Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </div>
          )
        }
      },
      { 
        field: 'actions', 
        type: 'actions',
        width: 60,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            size='Medium'
            label='Delete'
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
        rowHeight={80}
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
