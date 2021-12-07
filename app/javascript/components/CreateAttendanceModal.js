import { TextField, Typography, Button, Box, IconButton } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import Modal from '@mui/material/Modal';
import React from 'react';
import { createTheme, ThemeProvider } from "@material-ui/core"
import Autocomplete from '@mui/material/Autocomplete';

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
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#500000" // Maroon
        },
        secondary: {
            main: "#ffff33" // Yellow               
        }
    }, fontFamily: 'Roboto Mono'
});

export default function CreateAttendanceModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var members = props.props.members;
    var events = props.props.events;
    console.log(events);
    class CreateAttendanceData extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                created: false,
                onClose: props.onClose,
                members: props.props.members,
                events: props.props.events,
                attendance: {
                    first_name: "",
                    last_name: "",
                    title: "",
                    member_id: "",
                    event_id: "",
                    rsvp: false,
                    attended: true
                }
            };
        }

        componentDidMount = () => {
            this.render();
        }

        validateInput = () => {
            // also check if member_id and event_id is null 
            const mid = encodeURIComponent(this.state.attendance.member_id);
            const eid = encodeURIComponent(this.state.attendance.event_id);
            fetch(`/api/v1/attendances?member_id=${mid}&event_id=${eid}`, {
                method: 'GET',
                headers: { 'ACCEPT': 'application/json' }
            }).then(response => response.json()
            ).then(data => {
                if (data.length == 0) {
                    // POST
                    this.submitAttendance();
                    location.reload();
                } else {
                    if (!data[0].attended) {
                        this.updateAttendance(data[0].rsvp, data[0].id);
                        // UPDATE
                        location.reload();
                    } else {
                        // DO NOTHING, ALREADY ATTENDED
                        alert('Attendance exists already!');
                    }
                }
            }
            ).catch((error) => {
                console.log(error);
            });
        }

        updateAttendance = (rsvp, att_id) => {
            var data = this.state.attendance;

            var update = {
                event_id: data.event_id,
                member_id: data.member_id,
                rsvp: rsvp,
                attended: true
            }

            const token = document.querySelector('[name=csrf-token]').content; 
            fetch(`api/v1/attendances/${att_id}`, {
                method: 'PUT',
                body: JSON.stringify(update), 
                headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
            }).then((response) => {
                if (response.ok) {
                    console.log('Attendance Updated');
                    return true;
                }
            }).catch(error => {console.log(error)});
        }

        submitAttendance = () => {
            // validate 
            const token = document.querySelector('[name=csrf-token]').content;
            fetch(`/api/v1/attendances`, {
                method: 'POST',
                body: JSON.stringify( this.state.attendance ),
                headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
            }).then((response) => {
                if (response.ok) {
                    console.log("WENT THROUGH");
                    this.setState({ created: true })
                    return response.json;
                }
            }).catch((error) => {
                console.log(error);
            });
        }

        render = () => {
            const styleButton = {
                borderRadius: '100px !important',
                flexGrow: '0 !important',
                width: '40px !important',
                height: '40px !important',
                justifyContent: 'center !important',
                marginLeft: '20px !important'
            }
            return (
                <Box sx={style}>
                    <div className='new-attendance-header'>
                      <Typography id='new-attendance-header' variant='h4' component ='h4'> Create Attendance </Typography>
                    </div>

                    <div className='attendance-field'>
                        {this.state.created ? <Typography id='submitted'> Attendance Created! </Typography> : ""}
                        <Autocomplete
                            disablePortal
                            id='outlined'
                            options={this.state.events.map(a=>({label: a.title, event: a}))}
                            sx={{ width: 300 }}
                            getOptionSelected={(option, value) => option === value.event.title} 
                            renderInput={(params) => <TextField {...params} label='Event Title'/>}
                            onChange={(event, value) => {
                                var someProperty = { ...this.state.attendance }
                                someProperty.event_id = value.event.id;
                                this.setState({attendance: someProperty})
                            }}
                        />
                    </div>
                    <div className='attendance-field'>
                      <Autocomplete
                            disablePortal
                            id='outlined'
                            options={this.state.members.map(a=>({label: a.first_name, event: a}))}
                            getOptionSelected={(option, value) => option === value.event.title} 
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label='First Name'/>}
                            onChange={(event, value) => {
                                var someProperty = { ...this.state.attendance }
                                someProperty.member_id = value.event.id;
                                this.setState({attendance: someProperty})
                            }}

                        />
                    </div>
                    <div className='attendance-field'>
                      <Autocomplete
                            disablePortal
                            id='outlined'
                            options={this.state.members.map(a=>({label: a.last_name, event: a}))}
                            getOptionSelected={(option, value) => option === value.event.last_name} 
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label='Last Name'/>}
                            onChange={(event, value) => {
                                var someProperty = { ...this.state.attendance }
                                someProperty.member_id = value.event.id;
                                this.setState({attendance: someProperty})
                            }}
                        />
                    </div>

                    <div className='attendance-field'>
                      <div className='footer' style={{
                          display: 'flex',
                          flexDirection: 'row-reverse'
                      }}>
                          <Button onClick={() => {
                            this.validateInput();
                          }}
                          startIcon={<Close/>}> Submit </Button>
                      </div>
                  </div>
                </Box>
            );
        }
    }


return (
    <div>
      <Button
        variant="text"
        color="primary"
        onClick={handleOpen}
      >
        New Attendance
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateAttendanceData props ={{events: props.props.events, members: props.props.members}}onClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  )
}
