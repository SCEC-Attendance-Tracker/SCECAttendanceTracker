// CreateEventForm.js imports
import { TextField, Typography, Button, Box, IconButton } from '@material-ui/core';
import { CloseIcon } from '@material-ui/icons';
import { Check, Close } from '@material-ui/icons';
import { DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from "@material-ui/core"
import React from 'react';
import './stylesheets/EventForm.css';

// Event Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({   
  palette: {      
    primary: {         
      main: "#500000" // Maroon
    },      
    secondary: {         
      main: "#ffff33" // Yellow               
    }            
  },fontFamily: 'Roboto Mono'
});

export default function CreateEventModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  class CreateEventForm extends React.Component {
      constructor(props) {
          super(props);
          console.log(props);
          this.state = { // gonna need event JSON
              beginDate: new Date(),
              endDate: new Date(),
              created: false,
              onClose: props.onClose,
              event: {
                  start_date: this.convertDate(new Date()),
                  end_date: this.convertDate(new Date()),
                  description: "",
                  location: "",
                  title: ""
              }
          };
      }

      componentDidMount = () => {
          this.render();
      }

      // convert date to utc (datetime in postgresql)
      convertDate = (date) => {
          var utc = require('dayjs/plugin/utc')
          var dayjs = require('dayjs');
          dayjs.extend(utc);

          var datetime = dayjs(date).format();

          return datetime;
      }

      // change start_date in state.event
      beginDateChange = (newDate) => {
          this.setState({beginDate: newDate});

          var newEvent = {...this.state.event};
          newEvent.start_date = this.convertDate(newDate);

          this.setState({event: newEvent})
      }

      // Checks for empty input on title (others can be added)
      validateInput = () => {
          var input = {...this.state.event};
          if (input.title == "") {
              alert("Please fill out all required forms.");
              return false;
          }

          return true;
      }

      // Change end_date in state.event
      endDateChange = (newDate) => {
          this.setState({endDate: newDate});

          var newEvent = {...this.state.event};
          newEvent.end_date = this.convertDate(newDate);

          this.setState({event: newEvent})
      }

      // updates state.event with form change
      handleInputChange = (change) => {
          var eventDiff = {...this.state.event};
          var name = [change.target.name];

          if (name == 'description') {
              eventDiff.description = change.target.value;
          } else if (name == 'location') {
              eventDiff.location = change.target.value;
          } else if (name == 'title') {
              eventDiff.title = change.target.value;
          }
          this.setState({created: false}); // reset if another event creation
          this.setState({event: eventDiff})
      }

      // submits POST form to index route
      submitEvent = () => {
          // gotta validate
          console.log("You tried to submit a new event");
          if (!this.validateInput()) {
              return;
          }
          const token = document.querySelector('[name=csrf-token]').content;
          fetch(`/api/v1/events/`, {
              method: 'POST',
              body: JSON.stringify({event: this.state.event}),
              headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
          }).then((response) => {
              if (response.ok) {
                  console.log("WENT THROUGH");
                  this.setState({created: true})
                  this.state.onClose;
                  location.reload();
                  return response.json;
              }
          }).catch((error) => {
              console.log(error);
          });
      }

      render = () => {
          const style = {
              width: '100%'
          }

          const begin = this.state.beginDate;
          const end = this.state.endDate;
          const closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};

          return (
              <Box sx={style}>
                  <div className='new-event-header'>
                      <Typography id='new-event-header' variant='h4' component ='h4'> New Event </Typography>

                  </div>
                  <div className='event-field'>
                      {this.state.created ? <Typography id='submitted'> Event created! </Typography> : ""}
                      <TextField required id='outlined' label='Event Title' name='title' onChange={this.handleInputChange}/>

                  </div>
                  <br/>
                  <div className='event-field-dates'>
                      <div className='time-pick'>
                          <Typography variant='overline'> From </Typography>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker maxDateTime={this.state.endDate} name="beginDate" value={begin} renderInput={(end) => <TextField id='outlined' label="From"{...end} />} onChange={(newDate) => this.beginDateChange(newDate)}/>
                          </LocalizationProvider>
                      </div>
                      <div className='time-pick'>
                          <Typography variant='overline'> To </Typography>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker minDateTime={this.state.beginDate} name="endDate" value={end} renderInput={(begin) => <TextField id='outlined' label="To" {...begin} />} onChange={(newDate) => this.endDateChange(newDate)}/>
                          </LocalizationProvider>
                      </div>
                  </div>
                  <br/>
                  <div className='event-field'>
                      <TextField id='outlined' label='Description' name='description' onChange={this.handleInputChange}/>
                  </div>
                  <div className='event-field'>
                      <TextField id='outlined' label='Location' name='location' onChange={this.handleInputChange}/>
                  </div>
                  <div className='event-field'>
                      <div className='footer' style={{
                          display: 'flex',
                          flexDirection: 'row-reverse'
                      }}>
                          <Button onClick={() => {
                            this.submitEvent();
                          }}
                          startIcon={<Check/>}> Submit </Button>
                      </div>
                  </div>
              </Box>
          );
      }
  }

  return (
    <div>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleOpen}
      >
        New Event
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateEventForm onClose={handleClose}/>
        </Box>

      </Modal>
    </div>
  )
}
