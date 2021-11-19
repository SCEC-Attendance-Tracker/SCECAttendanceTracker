import React from 'react'
import GoogleCalendar from '../GoogleCalendar'
import EventList from '../EventList'
import MyEventsDataTable from '../MyEventsDataTable'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export default function HelpPage(props) {

  console.log(props);
  
  return (
    <Box>
      {props.roles.admin &&
        <div>
          <Typography variant="h4"> Admin Help </Typography>
          <Typography variant="h6"> How do I create events? </Typography>
          <Typography variant="p">
            Navigate to the Events page through the hamburger menu (<MenuIcon/>). Click the New Event button. A prompt should appear for you to fill out event details.
          </Typography>
          
          <Typography variant="h6"> What can I do with events? </Typography>
          <Typography variant="p">
            Once an event is created, you can search, filter, or sort the events table. The columns marked "RSVP" and "Attendance" can be clicked by members to RSVP or verify their attendance. The Code column is only visible to admin accounts. For a member to verify their attendance, they must enter the correct 4-letter code corresponding to the event, which the Code column shows. There are also additional actions available only to admin accounts: deleting and editing events. To delete an event, click the trash (<DeleteIcon/>) button at the right end of a row. To edit an event, click the pencil (<CreateIcon/>) button at the right end of a row.
          </Typography>
          <Typography variant="h4"> Member Help </Typography>
        </div>
      }
      
      <Typography variant="h6"> How can I RSVP for an event? </Typography>
      <Typography variant="p">
        On the home page, you should see a list of Upcoming Events. If you are signed in, you should see a button to RSVP for an event. Otherwise, navigate to the Events page through the hamburger menu (<MenuIcon/>). Find the event on the All Events table. You can search, filter, and sort to find your event. Then click the RSVP button on the corresponding event. If you have successfully RSVPd, it should change from X (<ClearIcon/>) to a check (<CheckIcon/>). If you are still not RSVPd, try refreshing the page.
      </Typography>
    </Box>
  ); 
}