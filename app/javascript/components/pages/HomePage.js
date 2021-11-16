import React from 'react'
import GoogleCalendar from '../GoogleCalendar'
import EventList from '../EventList'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


export default function HomePage(props) {

  if(!props.props.events.current_events){
    props.props.events.current_events = null
  }
  if(!props.props.events.upcoming_events){
    props.props.events.upcoming_events = null
  }
  
  return (
    <Box>
        <Grid container spacing = {5} alignItems = 'stretch'>
            <Grid item xs = {8} style = {{height: '100%'}}>
              <GoogleCalendar />
            </Grid>
            <Grid item xs = {4}>
              <Typography variant="h5">
                Current Events
              </Typography>
              <EventList page = "Home" events = {props.props.events.current_events} attendances = {props.props.attendances} member = {props.props.member}/>
              <Typography variant="h5">
                Upcoming Events
              </Typography>
              <EventList pagee = "Home" events = {props.props.events.upcoming_events} attendances = {props.props.attendances} member = {props.props.member}/>
            </Grid>
        </Grid>
    </Box>
  );
}