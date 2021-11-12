import React, {useState} from 'react';
import {Modal} from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import { TextField, Typography, Button, Box, IconButton } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import './stylesheets/FeedbackForm.css'

class FeedBackForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            created: false,
            id: this.props.id,
            show: false,
            feedback: {
                //figure out how to pull the event_id
                event_id: "",
                event_review: "",
                event_rating_score: ""
            }
        };
    }

    componentDidMount = () => {
        this.render();
    }

    validateInput = () => {
        var input = {...this.state.feedback};
        if(input.event_review == "") {
            alert("Please fill out all required forms.");
            return false;
        }

        if(input.event_rating_score == "") {
            alert("Please fill out all required forms.");
            return false;
        }
        return true;
    }
    
    // Change
    handleInputChange = (change) => {
        var feedbackDiff = {...this.state.feedback};
        var name = [change.target.name];
        if (name == 'event_review') {
            feedbackDiff.event_review= change.target.value;
        } else if (name == 'event_rating_score') {
            feedbackDiff.event_rating_score = change.target.value;
        } else if (name == 'event_id') {
            feedbackDiff.event_id = change.target.value;
        }
        // reset if another feedback is created
        this.setState({created: false}); 
        this.setState({feedback: feedbackDiff})
    }

    submitFeedback = () => {
        // validate 
        if (!this.validateInput()) {
            return;
        }
        const token = document.querySelector('[name=csrf-token]').content; 
        fetch(`/api/v1/feedbacks/`, {
            method: 'POST', 
            body: JSON.stringify({feedback: this.state.feedback}),
            headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
        }).then((response) => {
            if (response.ok) {
                console.log("WENT THROUGH");
                this.setState({created: true})
                return response.json;
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    handleOpen = e => {
        e.preventDefault();
        this.setState({show: true})
    }
    
    handleClose = () => {
        this.setState({show: false})
    }

    render = () => {
        const style = {
            position: 'absolute', 
            top: '25%', 
            left: '50%', 
            transform: 'translate(-50%, 0%)', 
            width: 400, 
            bgcolor: 'background.paper',  
            boxShadow: 24, 
            p: 4
        }

        return (
            <>
                <Button onClick={this.handleOpen}> Feedback </Button>
                <Modal open={this.state.show}
                    aria-labelledby="profile-page-label"
                    aria-describedby="profile-page-text"
                    onClose={this.handleClose} >
                    <Box sx={style}>
                        <DialogContent>
                            {/* <Button onClick={() => { this.setState({ show: !this.state.show }) }}>{this.state.show ? 'Hide' : 'Show'} Feedback</Button> */}
                            <div id="feedback">
                                {this.state.show ?
                                    <>
                                        <div className='feedback-field'>
                                            <TextField id='outlined' label='Event id :' name='event_id' onChange={this.handleInputChange} />
                                        </div><div className='feedback-field'>
                                            <TextField id='outlined' label='Event Review:' name='event_review' onChange={this.handleInputChange} />
                                        </div><div className='feedback-field'>
                                            <label for="outlined1">Event Rating Score:</label>
                                            <input type='number' id='outlined1' label='Event Rating Score:' name='event_rating_score' min="1" max="5" onChange={this.handleInputChange} />
                                            {this.state.created ? <Typography id='submitted'> Feedback created! </Typography> : ""}
                                        </div>
                                        <div className='feedback-field'>
                                            <div className='footer' style={{
                                                display: 'flex',
                                                flexDirection: 'row-reverse'
                                            }}>
                                                <Button onClick={this.submitFeedback} startIcon={<Check />}> Submit </Button>
                                            </div>
                                        </div>
                                    </> :
                                    <div className='feedback-field'>
                                        Show Feedback
                                    </div>
                                }
                            </div>
                        </DialogContent>
                    </Box>
                </Modal>
            </>
        );
    }
}

export default FeedBackForm;