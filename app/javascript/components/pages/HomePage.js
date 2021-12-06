import React from 'react'
import GoogleCalendar from '../GoogleCalendar'
import EventList from '../EventList'
import MyEventsDataTable from '../MyEventsDataTable'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


export default function HomePage(props) {

  console.log(props);
  
  return (
    <Box>
        <Grid container spacing = {5} alignItems = 'flex-start'>
            <Grid item xs = {12} lg = {4} >
              {(props.events.current_events.length > 0) &&
                <>
                <Typography variant="h6">
                  Current Events
                </Typography>
                <MyEventsDataTable props = {{page: "Home", events: props.events.current_events, attendances: props.attendances, members: props.member}}/>
                <br/>
                </>
              }
              
              <Typography variant="h6">
                Upcoming Events
              </Typography>
              
              {(props.events.upcoming_events.length > 0) ?
                <MyEventsDataTable props = {{page: "Home", events: props.events.upcoming_events, attendances: props.attendances, members: props.member}}/>
                :
                <Typography variant="p">
                  No upcoming events. Check back soon!
                </Typography>
              }
            </Grid>
            <Grid item xs = {12} lg = {8} style = {{height: '100%'}}>
              <GoogleCalendar />
            </Grid>
        </Grid>
    </Box>
  ); 
}