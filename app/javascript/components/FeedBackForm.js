import React, {useState} from 'react';
import {Modal, Dialog, DialogTitle, DialogActions} from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import { TextField, Typography, Button, Box, IconButton } from '@material-ui/core';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Check, Close } from '@material-ui/icons';
import CreateIcon from '@mui/icons-material/Create';
import Rating from '@mui/material/Rating';
import './stylesheets/FeedbackForm.css'
 
class FeedBackForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            created: false,
            updated: false,
            existing: false,
            id: this.props.id,
            show: false,
            event: this.props.event,
            rating: 0,
            feedback: {
                id: 0,
                event_id: parseInt(this.props.event.event_id),
                event_review: "",
                event_rating_score: 0
            }
        };
    }

    componentDidMount = () => {
        fetch(`/api/v1/feedbacks?event_id=${this.props.event.event_id}`, {
            method: 'GET', 
            headers: { 'ACCEPT': 'application/json'}
            }).then(response => response.json()
            ).then(data => {
                console.log(data)
                if(data) {
                    this.setState({
                        feedback: {
                            id: data.id,
                            event_id: data.event_id,
                            event_review: data.event_review,
                            event_rating_score: data.event_rating_score
                    }})
                    this.setState({existing: true})

                    console.log(this.state.feedback)
                }
                else {
                    this.setState({
                        feedback: {
                            event_id: parseInt(this.props.event.event_id),
                            event_review: "",
                            event_rating_score: 0
                    }})
                }
            });
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
        var name = change.target.name;
        console.log(change);
        if (name == 'event_review') {
            feedbackDiff.event_review = change.target.value;
        } else if (name == 'event_rating_score') {
            feedbackDiff.event_rating_score = parseFloat(change.target.value);
        } 
        // reset if another feedback is created
        this.setState({created: false}); 
        this.setState({feedback: feedbackDiff});
        
    }

    submitFeedback = () => {
        // validate 
        if (!this.validateInput()) {
            return;
        }
        console.log(this.state.feedback)
        const token = document.querySelector('[name=csrf-token]').content; 
        
        console.log(this.state.existing)
        if(this.state.existing) {
            console.log('updating..')
            fetch(`/api/v1/feedbacks/${this.state.feedback.id}`, {
                method: 'PUT', 
                body: JSON.stringify({feedback: this.state.feedback}),
                headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
            }).then((response) => {
                if (response.ok) {
                    console.log("WENT THROUGH");
                    this.setState({updated: true})
                    this.setState({show: false})
                    return response.json;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
        else {
            console.log('in new')
            fetch(`/api/v1/feedbacks/`, {
                method: 'POST', 
                body: JSON.stringify({feedback: this.state.feedback}),
                headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
            }).then((response) => {
                if (response.ok) {
                    console.log("WENT THROUGH");
                    this.setState({created: true})
                    this.setState({show: false})
                    location.reload()
                    return response.json;
                }
            }).catch((error) => {
                console.log(error);
            });
            this.setState({existing: true})
        }
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
            borderRadius: '10px',
            p: 4
        }
        
        const styleButton = {
            borderRadius: '100px !important',
            flexGrow: '0 !important',
            width: '40px !important',
            height: '40px !important',
            justifyContent: 'center !important',
            marginLeft: '20px !important'
        }
        
        const styleIcon = {
            minWidth: '10px !important'
        }

        return (
            <>
                <ListItemButton sx={styleButton} onClick={this.handleOpen}> 
                    <ListItemIcon sx={styleIcon} >
                        <CreateIcon />
                    </ListItemIcon>
                </ListItemButton>
                
                <Dialog open={this.state.show}
                    onClose={this.handleClose} >
                        <DialogTitle>
                            {this.state.event.title}
                        </DialogTitle>
                        <DialogContent>
                            {/*this.state.created ? <Typography id='submitted'> Feedback created! </Typography> : ""*/}
                            {/*this.state.updated ? <Typography id='submitted'> Feedback updated! </Typography> : ""*/}
                            {/* <Button onClick={() => { this.setState({ show: !this.state.show }) }}>{this.state.show ? 'Hide' : 'Show'} Feedback</Button> */}
                            
                            <Rating
                                name="event_rating_score"
                                value={this.state.feedback.event_rating_score}
                                precision={0.5}
                                onChange={
                                    this.handleInputChange
                                }
                            />
                            <TextField 
                                multiline 
                                fullWidth
                                variant="filled"
                                rows={4} 
                                id='outlined' 
                                color='secondary'
                                defaultValue = {this.state.feedback.event_review}
                                label='Event Review' 
                                name='event_review' 
                                onChange={this.handleInputChange} 
                            />
                            <DialogActions>
                                <Button color='secondary' variant='contained' onClick={this.submitFeedback} startIcon={<Check />}> Submit Feedback </Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
            </>
        );
    }
}

export default FeedBackForm;