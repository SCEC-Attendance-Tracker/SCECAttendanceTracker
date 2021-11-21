import React from 'react' 
import { Button, Dialog, DialogContent, Typography, TextField } from '@material-ui/core'

class EventCodeEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event_id: this.props.event_id, 
            event_code: this.props.event_code,
            member_id: this.props.member_id,
            attendance_data: {},
            show: false,
            code: '',
            show_error: false,
            create_new: false,
            has_attended: false,
        }

        console.log(this.state);
    }

    componentDidMount = () => {
        this.render();
        this.validateAttendance();
    }
    
    handleClose = () => {
        this.setState({show: false});
    }

    handleOpen = () => {
        this.setState({show: true});
    }

    // see if attendance exists, and if it does, check if attended is true
    validateAttendance = () => {
        const mid = encodeURIComponent(this.state.member_id);
        const eid = encodeURIComponent(this.state.event_id);
        fetch(`/api/v1/attendances?member_id=${mid}&event_id=${eid}`, {
            method: 'GET', 
            headers: { 'ACCEPT': 'application/json'}
        }).then(response => response.json()
        ).then(data => {
            if (data.length == 0) {
                this.setState({create_new: true});
            } else {
                if (data[0].attended)
                    this.setState({has_attended: true})
                this.setState({attendance_data: data[0]})
            }
        }
        ).catch((error) => {console.log(error);
        });
    }

    updateAttendance = () => {
        var data = this.state.attendance_data;

        var update = {
            event_id: data.event_id,
            member_id: data.member_id,
            rsvp: data.rsvp,
            attended: true
        }

        const token = document.querySelector('[name=csrf-token]').content; 
        fetch(`api/v1/attendances/${this.state.attendance_data.id}`, {
            method: 'PUT',
            body: JSON.stringify(update), 
            headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
        }).then((response) => {
            if (response.ok) {
                this.setState({has_attended: true})
                console.log('Attendance Updated');
                return true;
            }
        }).catch(error => {console.log(error)});
    }

    // create new attendance  
    postAttendance = () => {
        var item = {
            member_id: this.state.member_id,
            event_id: this.state.event_id,
            rsvp: false,
            attended: true
        }

        const token = document.querySelector('[name=csrf-token]').content; 
        fetch(`api/v1/attendances`, {
            method: 'POST', 
            body: JSON.stringify({attendance: item}), 
            headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
        }).then((response) => {
            if(response.ok) {
                this.setState({has_attended: true})
                console.log('Attendance Created');
                return true;
            }
        }).catch(error => {console.log(error)});
    }

    handleInputChange = (event) => {
        var entry = event.target.value;

        if (entry.length == 4) {
            if (entry == this.state.event_code) {
                if (this.state.create_new) {
                    this.postAttendance()
                } else {
                    this.updateAttendance()
                }
            } else {
                this.setState({show_error: true});
            }
        } else {
            this.setState({show_error: false})
        }

        this.setState({code: entry})
    }

    render = () => {
        const code = this.state.code;
        const style = {
            maxWidth: '100%',
            bgcolor: 'background.paper',  
            boxShadow: 24, 
            p: 4
        }

        return (
            <>
            <Button onClick={this.handleOpen}>Attendance Code</Button>
            <Dialog 
                open={this.state.show}
                onClose={this.handleClose}
                aria-labelledby="profile-page-label"
                aria-describedby="profile-page-text"
            >
            <DialogContent>
                <div sx={style}>
                    {!this.state.has_attended ? 
                    <div style={{
                        flexDirection: 'column', 
                        alignContent: 'center'
                    }}>
                        <Typography variant='h6'> Enter Attendance Code: </Typography>
                        <div className='code-entry' style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            {this.state.show_error ? 
                            <TextField
                                inputProps={{
                                    maxLength: 4, 
                                    fontSize: 12,
                                }}
                                autoFocus
                                error
                                value={code}
                                helperText='Incorrect Code.'
                                onChange={this.handleInputChange}
                            />
                            :
                            <TextField
                                inputProps={{
                                    maxLength: 4, 
                                    fontSize: 24,
                                }}
                                autoFocus
                                value={code}
                                helperText={`${code.length}/${4}`}
                                variant='filled'
                                onChange={this.handleInputChange}
                            />}
                        </div>
                    </div>
                    :
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column', 
                        alignContent: 'center'
                    }}>
                        <Typography>Attendance logged for event.</Typography>
                    </div>
                    }
                </div>
            </DialogContent>
            </Dialog>
            </>
        );
    }
}

export default EventCodeEntry;