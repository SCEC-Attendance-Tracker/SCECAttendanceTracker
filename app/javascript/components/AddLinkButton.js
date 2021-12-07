import React, { useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AddLinkButton() {
  
  const [open, setOpen] = React.useState(false);
  const inputName = useRef('')
  const inputUrl = useRef('')
  const inputDescription = useRef('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    const token = document.querySelector('[name=csrf-token]').content;
    
    var newLink = {
      name: inputName.current.value,
      url: inputUrl.current.value,
      description: inputDescription.current.value,
    }
    
    fetch('/api/v1/links', {
      method: 'POST', 
      body: JSON.stringify(newLink),
      headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
    }).then(() => {
      //location.reload();
    })
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button sx = {{mt: 2, mb: 1}} size='small' color='secondary' variant="contained" onClick={handleClickOpen}>
        New Link
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new link, please enter the neccessary attributes below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            color='secondary'
            label="Link Name"
            type="string"
            fullWidth
            variant="standard"
            required
            inputRef = {inputName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="url"
            color='secondary'
            label="Link URL (https://www.example.com)"
            type="text"
            fullWidth
            variant="standard"
            required
            inputRef = {inputUrl}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            color='secondary'
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            required
            inputRef = {inputDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='secondary' onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}