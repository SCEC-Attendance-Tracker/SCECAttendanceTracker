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
                    start_date: "",
                    start_time: "",
                    rsvp: false,
                    attended: true
                }
            };
            this.onTagsChange = this.onTagsChange.bind(this);
        }

        componentDidMount = () => {
            this.render();
        }
        setAttendancefields = () => {
            this.setState({attendance: {
                member_id: this.state.members.find(element => element == this.state.attendance.last_name).member_id, 
                event_id: this.state.events.find(element => element == this.state.attendance.title).event_id,
                start_date: this.state.events.find(element => element == this.state.attendance.title).start_date, 
                start_time: this.state.events.find(element => element == this.state.attendance.title).start_time
            }})
        }
        submitAttendance = () => {
            // validate 
            if (!this.validateInput()) {
                return;
            }
            const token = document.querySelector('[name=csrf-token]').content;
            fetch(`/api/v1/attendances/`, {
                method: 'POST',
                body: JSON.stringify({ attendance: this.state.attendance }),
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
        onTagsChange = (e, value) => {
            this.setState({attendance:{ 
                [e.target.name]:value
            }},()=>{
                console.log("name", e.target.name);
                console.log("value", value);
                console.log(this.attendance);
            })
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
                            options={this.state.events.map(a=>a.title)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label='Event Title'/>}
                            onChange={(e, value) => {
                                this.setState({attendance:{ 
                                    title:value
                                }},()=>{
                                    console.log(this.attendance);
                                })
                            }}
                        />
                    </div>
                    <div className='attendance-field'>
                      <Autocomplete
                            disablePortal
                            id='outlined'
                            options={this.state.members.map(a=>a.first_name)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label='First Name'/>}
                            onChange={(e, value) => {
                                this.setState({attendance:{ 
                                    first_name:value
                                }},()=>{
                                    console.log(this.attendance);
                                })
                            }}

                        />
                    </div>
                    <div className='attendance-field'>
                      <Autocomplete
                            disablePortal
                            id='outlined'
                            options={this.state.members.map(a=>a.last_name)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label='Last Name'/>}
                            onChange={(e, value) => {
                                this.setState({attendance:{ 
                                    last_name:value
                                }},()=>{
                                    console.log("value", value);
                                    console.log(this.attendance);
                                })
                            }}
                        />
                    </div>

                    <div className='attendance-field'>
                      <div className='footer' style={{
                          display: 'flex',
                          flexDirection: 'row-reverse'
                      }}>
                          <Button onClick={() => {
                            this.setAttendancefields();
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
