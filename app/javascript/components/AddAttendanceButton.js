import React, { createRef, useRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AddAttendanceButton() {
  
  const [open, setOpen] = React.useState(false);
  const inputMid = createRef('')
  const inputEid = createRef('')
  
  var isValid = false;
  var entryNotAttended = false;
  
  const membersOptions = () => {
    const token = document.querySelector('[name=csrf-token]').content;
    
    const [ data, setData ] = useState();
    useEffect(() => {
      getData();
    },[])
    
    const getData = async () => {
      fetch('/api/v1/members', {
        method: 'GET', 
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
      }).then((response) => response.json())
        .then((json) => {
          setData(json);
        })
    }
    return (data)
  }
  
  const eventsOptions = () => {
    const token = document.querySelector('[name=csrf-token]').content;
    
    const [ data, setData ] = useState();
    useEffect(() => {
      getData();
    },[])
    
    const getData = async () => {
      fetch('/api/v1/events', {
        method: 'GET', 
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
      }).then((response) => response.json())
        .then((json) => {
          setData(json);
        })
    }
    return (data)
  }
  
       
  //console.log(membersOptions());
  //console.log(eventsOptions());
  
  const allMembers = membersOptions();
  var mID = -1;
  var eID = -1;

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  function checkExisting() {
    const token = document.querySelector('[name=csrf-token]').content;
    
    fetch(`/api/v1/attendances?member_id=${mID}&event_id=${eID}`, {
      method: 'GET', 
      headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
    }).then(response => response.json())
      .then(data => {
        if (data.length == 0) {
          isValid = true
          return true;
        } else {
          if (!data[0].attended) {
            isValid = true;
            entryNotAttended = true;
            return true;
          }
          isValid = false;
          return false;
        }
    })
  }

  const handleSubmit = () => {
    const token = document.querySelector('[name=csrf-token]').content;
    
    console.log(mID);
    console.log(eID);
    
    var newAttendance = {
      member_id: mID,
      event_id: eID,
      attended: true
    }
    
    if (entryNotAttended) {
      
      fetch(`/api/v1/attendances?member_id=${mID}&event_id=${eID}`, {
        method: 'PUT', 
        body: JSON.stringify(newAttendance),
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
      }).then(() => {
        console.log('Updated attendance entry');
        location.reload();
      })
      setOpen(false);
      
    }
    
    
    fetch('/api/v1/attendances', {
      method: 'POST', 
      body: JSON.stringify(newAttendance),
      headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
    }).then(() => {
      location.reload();
    })
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button sx = {{mt: 2, mb: 1}} size='small' color='secondary' variant="contained" onClick={handleClickOpen}>
        New Entry
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Attendance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Attendances are created automatically when members log into events. Create an attendance entry if you need to bypass that system. If the attendance record already exists, you cannot create a duplicate entry.
          </DialogContentText>
          <Autocomplete
            disablePortal
            getOptionLabel={option => option.first_name + ' ' + option.last_name}
            options={allMembers}
            fullWidth
            onChange={(e, val) => {
              mID = val.id;
              console.log(mID);
              checkExisting();
            }}
            renderInput={(params) => 
              <TextField {...params} 
                required 
                color='secondary' 
                inputRef = {inputMid}
                margin="dense"
                label="Member Name" 
              />}
          />
          
          <Autocomplete
            disablePortal
            getOptionLabel={option => option.title}
            options={eventsOptions()}
            fullWidth
            onChange={(e, val) => {
              eID = val.id;
              console.log(eID);
              checkExisting();
            }}
            renderInput={(params) => 
              <TextField {...params} 
                required 
                inputRef = {inputEid} 
                color='secondary' 
                margin="dense"
                label="Event Title" 
              />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            variant='contained' 
            color='secondary' 
            onClick={() => { isValid ? handleSubmit() : console.log('Cannot create attendance; already exists')}}
          >Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}