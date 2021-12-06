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
    <Box sx={{marginLeft: 10, marginRight: 10}} >
      
      {props.roles.admin && 
        <>
      <Typography variant = "h5"> Administrator </Typography>

      <Typography variant = "h6"> Signing In </Typography>
      <Typography display = 'block' variant = "p">Once logged in through Google, you will have access to all features of the application. 
      On the front page, it will be similar to the member view; however, you can view the number of RSVPs per event. </Typography>
      <br/>
      <Typography variant = "h6"> Navigation </Typography>
      <Typography display = 'block' variant = "p">Expanding the hamburger menu will reveal several links that are missing from the member view: Attendances, Feedback, and Members. 
      Each page has a table. For Attendance, you can export this data in order to keep track of point totals. </Typography>
      <br/>
      <Typography variant = "h6"> Members </Typography>
      <Typography display = 'block' variant = "p">On the Member page, you will be able to change several attributes. You can mark guest users to be members and if they have paid dues. 
      You can change several members at a time by using the selection box on the far left.</Typography>
      <br/>
      <Typography variant = "h6"> Events </Typography>
      <Typography display = 'block' variant = "p"> When clicking on any events, you will be able to create by clicking a button above the table. It will reveal a dialog box that will accept input. Once all required fields have been filled, it will then show the updated table. Here, you can edit and delete the entry. 
      Any changes to the event will be reflected on the Google Calendar. Deletion of events will notify any attendees. </Typography>
      <Typography display = 'block' variant = "p"> You can also manually mark member’s attendances if they were unable to log it themselves; this entails creating an entire entry on the table. </Typography>
      <br/>
      <Typography variant = "h6"> Feedback </Typography>
      <Typography display = 'block' variant = "p"> On feedback, you will be unable to create feedback. However, you can view the feedback for each event along with the rating each user gives them. </Typography>
      <br/>
      <Typography variant = "h6"> Database Export and Wipe </Typography>
      <Typography display = 'block' variant = "p">When switching semesters, the admin can export the entire database and save it for future record. They can then wipe the database clean for the next semester.</Typography>
      
      <br/>
      <Typography variant = "h5"> Member </Typography>
      </>
    }
      <Typography variant = "h6"> Signing Up </Typography>
      <Typography display = 'block' variant = "p">An SCECAttendanceTracker account will automatically be created when you sign in to the app for the first time using your Google credentials. 
      An email will be sent to that email address and your membership will be pending authorization from the SCEC organization admin. </Typography>
      <br/>
      <Typography variant = "h6">Signing In</Typography>
      <Typography display = 'block' variant = "p">You can log in with your preferred Google email address by clicking the ‘Sign In’ Button in the top right corner of the website. </Typography>
      <br/>
      <Typography variant = "h6">Navigation</Typography>
      <Typography display = 'block' variant = "p">The hamburger menu on the top right expands into the Links, Help, and Events page. The Links page will link to any important organization websites or zoom calls. The events page will show you current and upcoming events with more detail than the home page, 
      as well as a list of events you have RSVP'd or attended. The Help page is self explanatory, you are already here!</Typography>
      <br/>
      <Typography variant = "h6">Calendar</Typography>
      <Typography display = 'block' variant = "p">On the home page is a calendar showing all of SCEC’s created events. If you click ‘Subscribe’ at the top of the calendar, your google calendar
       will sync automatically with the website and any changes that are made to an event. You can unsubscribe at any time by clicking the ‘Unsubscribe’ button in the same place. </Typography>
       <br/>
      <Typography variant = "h6">Events</Typography>
      <Typography display = 'block' variant = "p">Upon logging in, you will see a list of current and upcoming events. This will be the most direct way for you to register your attendance to an event. Upon clicking the icon of a current event, you can see event information in detail, as well as an option to enter an event specific code provided by your officers to log attendance. Upon logging attendance, your point total is updated, and you will be able to provide feedback after the event. 
      For upcoming events, you can RSVP. This will let your officers know you are planning on attending that event. </Typography>
      <br/>
      <Typography variant = "h6">Profile</Typography>
      <Typography display = 'block' variant = "p">Your profile information will pop up upon clicking your profile picture. There you can check your dues status, attendance points, and edit your information as you see fit. </Typography>
      <br/>
      <Typography variant = "h6">Feedbacks</Typography>
      <Typography display = 'block' variant = "p">Once an event is completed and an attendance is marked for an event a user is able to submit 
      a single feedback review with a rating point that is tallied and calculated to an overall rating per event. </Typography>
      
    </Box>
  ); 
}