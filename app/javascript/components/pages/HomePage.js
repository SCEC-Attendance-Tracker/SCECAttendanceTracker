import React from 'react'
import GoogleCalendar from '../GoogleCalendar'
import EventList from '../EventList'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


export default function HomePage({roles, events}) {

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
              <EventList events = {events.current_events} roles />
              <Typography variant="h5">
                Upcoming Events
              </Typography>
              <EventList events = {events.upcoming_events} roles />
            </Grid>
        </Grid>
    </Box>
  ); 
}