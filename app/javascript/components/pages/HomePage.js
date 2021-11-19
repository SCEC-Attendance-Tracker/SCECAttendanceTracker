import React from 'react'
import GoogleCalendar from '../GoogleCalendar'
import EventList from '../EventList'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


export default function HomePage({roles, events}) {

  return (
    <Box>
        <Grid container spacing = {5} alignItems = 'flex-start'>
            <Grid item xs = {12} lg = {4}  sx = {{maxHeight: '100%'}}>
              <Typography variant="h5">
                Current Events
              </Typography>
              <EventList events = {events.current_events} roles = {roles}/>
              <Typography variant="h5">
                Upcoming Events
              </Typography>
              <EventList events = {events.upcoming_events} roles = {roles}/>
            </Grid>
            <Grid item xs = {12} lg = {8} style = {{height: '100%'}}>
              <GoogleCalendar />
            </Grid>
        </Grid>
    </Box>
  ); 
}