import React from 'react' 
import { DialogContent, Box, Typography, Modal, TextField, Button } from '@material-ui/core'

class EventCodeEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event_id: this.props.event_id, 
            //event_code: this.props.event_code,
            member_id: this.props.member_id,
            show: false,
            code: '',
            show_error: false
        }
    }

    componentDidMount = () => {
        this.render();
    }

    handleOpen = e => {
        e.preventDefault();
        this.setState({show: true})
    }
    
    handleClose = () => {
        this.setState({show: false})
    }

    sendAttendance = () => {
        console.log('Correct Entry');
    }

    handleInputChange = (event) => {
        var entry = event.target.value;
        var code = 'poop';

        if (entry.length == 4) {
            if (entry == code) {
                // close modal, send attendance
                this.sendAttendance(); 
                this.setState({show: false})
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
        const boxStyle = {
            position: 'fixed',
            top: '25%', 
            left: '50%', 
            transform: 'translate(-50%,0)', 
            width: '300',
            maxWidth: '100%',
            bgcolor: 'background.paper',  
            boxShadow: 24, 
            p: 4
        }

        return (
            <><Button variant='outlined' onClick={this.handleOpen}> Enter Code </Button>
            <Modal
                open={this.state.show}
                onClose={this.handleClose}
                aria-labelledby="profile-page-label"
                aria-describedby="profile-page-text"
            >
                <Box sx={boxStyle}>
                <DialogContent>
                <div style={{
                    flexDirection: 'column', 
                    alignContent: 'center'
                }}>
                    <Typography> Enter Attendance Code </Typography>
                    <div className='code-entry' style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        {this.state.show_error ? 
                        <TextField
                            inputProps={{
                                maxLength: 4, 
                                fontSize: 24,
                            }}
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
                            value={code}
                            helperText={`${code.length}/${4}`}
                            onChange={this.handleInputChange}
                        />}
                    </div>
                </div>
                </DialogContent>
                </Box>
            </Modal>
            </>
        );
    }
}

export default EventCodeEntry;