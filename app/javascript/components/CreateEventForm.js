import { TextField, Typography, Button, Box, IconButton } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import { DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from 'react'
import './stylesheets/EventForm.css'

class CreateEventForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { // gonna need event JSON
            event: {
                start_date: "", 
                end_date: "", 
                description: "", 
                location: "", 
                title: ""
            }, 
            beginDate: new Date(), 
            endDate: new Date(),
        };
    }

    componentDidMount = () => {
        this.beginDateChange(this.state.beginDate);
        this.endDateChange(this.state.endDate);
        this.render();
    }

    beginDateChange = (newDate) => {
        this.setState({beginDate: newDate});
        
        var utc = require('dayjs/plugin/utc')
        var dayjs = require('dayjs');
        dayjs.extend(utc);

        var datetime = dayjs(newDate).format();
        var newEvent = {...this.state.event}; 
        newEvent.start_date = datetime;
        
        this.setState({event: newEvent})
    }

    endDateChange = (newDate) => {
        this.setState({endDate: newDate});

        var utc = require('dayjs/plugin/utc')
        var dayjs = require('dayjs');
        dayjs.extend(utc);

        var datetime = dayjs(newDate).format();
        var newEvent = {...this.state.event}; 
        newEvent.end_date = datetime;

        this.setState({event: newEvent})
    }

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

        console.log(eventDiff);
        this.setState({event: eventDiff})
        console.log(this.state.event);
    }

    submitEvent = () => {
        // gotta validate 
        const token = document.querySelector('[name=csrf-token]').content; 
        fetch(`/api/v1/events/`, {
            method: 'POST', 
            body: JSON.stringify({event: this.state.event}),
            headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
        }).then((response) => {
            if (response.ok) {
                console.log("WENT THROUGH");
                return response.json;
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render = () => {
        const style = {
            width: 600
        }

        const begin = this.state.beginDate; 
        const end = this.state.endDate;

        return (
            <Box sx={style}>
                <div className='new-event-header'>
                    <Typography id='new-event-header' variant='h3' component ='h3'> New Event </Typography>
                </div>
                <div className='event-field'>
                    <TextField id='outlined' label='Event Title' name='title' onChange={this.handleInputChange}/>
                </div>
                <div className='event-field'>
                    <div className='time-pick'>
                        <Typography id='from' variant='overline'> From </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker name="beginDate" value={begin} renderInput={(end) => <TextField {...end} />} onChange={(newDate) => this.beginDateChange(newDate)}/>
                        </LocalizationProvider>
                    </div>
                    <div className='time-pick'>
                        <Typography id='to' variant='overline'> To </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker name="endDate" value={end} renderInput={(begin) => <TextField {...begin} />} onChange={(newDate) => this.endDateChange(newDate)}/>
                        </LocalizationProvider>
                    </div>
                </div> 
                <div className='event-field'>
                    <TextField id='outlined' label='Description' name='description' onChange={this.handleInputChange}/>
                </div>
                <div className='event-field'>
                    <TextField id='outlined' label='Location' name='location' onChange={this.handleInputChange}/>
                </div>
                <div className='event-field'>
                    <div className='footer'>
                        <IconButton onClick={this.submitEvent}> <Check/> </IconButton>
                    </div>
                </div>
            </Box>
        );
    }
}

export default CreateEventForm; 