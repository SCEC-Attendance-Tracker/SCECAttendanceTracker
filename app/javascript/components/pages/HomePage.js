import React from 'react'
import GoogleCalendar from '../GoogleCalendar'
import EventList from '../EventList'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


export default function HomePage(props) {

  if(!props.events.current_events){
    props.events.current_events = null
  }
  if(!props.events.upcoming_events){
    props.events.upcoming_events = null
  }

  return (
    <Box>
        {!props.mobile ? 
        <Grid container spacing = {1} alignItems = 'stretch'>
            <Grid item xs = {8} style = {{height: '100%'}}>
              <GoogleCalendar />
            </Grid>
            <Grid item xs = {4}>
              <Typography variant="h5">
                Current Events
              </Typography>
              <EventList events = {props.events.current_events}/>
              <Typography variant="h5">
                Upcoming Events
              </Typography>
              <EventList events = {props.events.upcoming_events}/>
            </Grid>
        </Grid>
        :
        <>
        <Typography variant="h5">
          Current Events
        </Typography>
        <EventList events = {props.events.current_events}/>
        <Typography variant="h5">
          Upcoming Events
        </Typography>
        <EventList events = {props.events.upcoming_events}/>
        </>
        }
    </Box>
  );
}