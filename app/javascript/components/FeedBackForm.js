import React, {useState} from 'react';
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

    render = () => {
        const style = {
            width: '100%'
        }

        return (
            <Box sx={style}>
                <div className='new-feedbackack-header'>
                    <Typography id='new-feedback-header' variant='h4' component='h4'> Feedback </Typography>
                </div>
                <Button onClick={()=>{this.setState({show:!this.state.show})}}>{ this.state.show? 'Hide' : 'Show'} Feedback</Button>
                <div id="feedback">
                    { this.state.show?
                        <>
                            <div className='feedback-field'>
                                <TextField id='outlined' label='Event id :' name='event_id' onChange={this.handleInputChange} />
                            </div><div className='feedback-field'>
                                <TextField id='outlined' label='Event Review:' name='event_review' onChange={this.handleInputChange} />
                            </div><div className='feedback-field'>
                                {this.state.created ? <Typography id='submitted'> Feedback created! </Typography> : ""}
                                <label for="outlined1">Event Rating Score:</label>
                                <input type='number' id='outlined1' label='Event Rating Score:' name='event_rating_score' min="1" max="5" onChange={this.handleInputChange}/>
                            </div><div className='feedback-field'>
                                <div className='footer' style={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse'
                                }}>
                                    <Button onClick={this.submitFeedback} startIcon={<Check />}> Submit </Button>
                                </div>
                            </div> 
                        </>:
                        <div className='feedback-field'>
                            Show Feedback
                        </div>
                    }
                </div>
            </Box>
        );
    }
}

export default FeedBackForm;