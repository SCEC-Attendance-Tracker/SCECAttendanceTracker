import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'

import { createTheme, makeStyles, createStyles } from "@material-ui/core"
//import markAttendance from './EventsDataTable'
//import { RsvpIcon, EmojiPeopleIcon} from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create';
import RsvpIcon from '@mui/icons-material/Rsvp';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
//import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

import FeedBackForm from './FeedBackForm'

const newTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      listCard: {
        padding: '0px 16px !important',
        borderRadius: '4px',
        border: '1px solid #DDD',
        marginTop: '30px',
        '& .makeStyles-listCardItem-7:last-child': {
          borderBottom: '1px solid transparent !important',
          marginBottom: '0px !important'
        }
      },
      listCardItem: {
        borderBottom: '1px solid #DDD',
        margin: '10px 0px',
        paddingLeft: '0px !important',
        paddingRight: '0px !important',
      },
      listCardButton: {
        borderRadius: '100px !important',
        flexGrow: '0 !important',
        width: '40px !important',
        height: '40px !important',
        justifyContent: 'center !important',
        marginLeft: '20px !important'
      },
      listActions: {
        display: 'flex',
        alignItems: 'center'
      },
      listActionText: {
        '& > *': {
          fontSize: '0.75rem !important',
          color: '#AAA'
        }
      },
      icon: {
        minWidth: '10px !important'
      }
    }),
  { newTheme },
);

export default function EventList({events, attendances = null, member = null}) {
  console.log(events);
  console.log(attendances);
  
  const classes = useStyles();
  var today = new Date();
  
  const markRsvp = (row) => {
    const token = document.querySelector('[name=csrf-token]').content;
    var att = attendances.find(e => (e.event_id == row.event_id) && (e.member_id == member.id))
    if (!att) {
      att = {
        id: attendances.length + 1,
        member_id: member.id,
        event_id: row.event_id,
        rsvp: true,
        attended: false,
        created_at: new Date(),
        updated_at: new Date()
      }
      
      return (fetch(`/api/v1/attendances`, {
        method: 'POST', 
        body: JSON.stringify(att),
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
      })).then(() => {
        location.reload();
      })
    }
    
    att.rsvp = !att.rsvp;
    
    fetch(`/api/v1/attendances/${att.id}`, {
      method: 'PUT', 
      body: JSON.stringify(att),
      headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
    }).then(() => {
      location.reload();
    });
  }
  
  const markAttendance = (row) => {
    const token = document.querySelector('[name=csrf-token]').content;
    var att = attendances.find(e => (e.event_id == row.event_id) && (e.member_id == member.id))
    var today = new Date();
    var start = new Date(`${row.start_date + ' ' + row.start_time}`);
    var end = new Date(`${row.end_date + ' ' + row.end_time}`);
    
    console.log(start + " " + end)
    if (today < start || today > end) {
      return;
    }
    
    if (!att) {
      att = {
        id: attendances.length + 1,
        member_id: member.id,
        event_id: row.event_id,
        rsvp: false,
        attended: true,
        created_at: new Date(),
        updated_at: new Date()
      }
      
      return (fetch(`/api/v1/attendances`, {
        method: 'POST', 
        body: JSON.stringify(att),
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
      })).then(() => {
        location.reload();
      })
    }
    
    att.attended = !att.attended;
    
    fetch(`/api/v1/attendances/${att.id}`, {
      method: 'PUT', 
      body: JSON.stringify(att),
      headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
    }).then(() => {
      location.reload();
    })
  }
  
  return (
      <List className={classes.listCard}
          sx = {{
              position: 'relative'
          }}>
          {events && events.map((e) => {
              return (
                  <ListItem className={classes.listCardItem}>
                      <ListItemText 
                          primary = {`${e.title}`}
                          secondary = {`${e.start_date}`}/>
                      
                      {/* Home Page: Mark Attendance */}
                      {attendances == null && ((new Date(`${e.start_date}`)) <= today) && ((new Date(`${e.end_date}`)) >= today) &&
                      <div className={classes.listActions}>
                          <ListItemText className={classes.listActionText}
                          primary = {'Mark Attendance'}/>
                          
                          <ListItemButton className={classes.listCardButton} onClick={(param) => {console.log(param);}}>
                              <ListItemIcon className={classes.icon}>
                                  <EmojiPeopleIcon />
                              </ListItemIcon>
                          </ListItemButton>
                      </div>
                      }
                      
                      {/* Events Page: Feedback */}
                      {(`${e.attended}` == 'true') &&
                      <div className={classes.listActions}>
                          <ListItemText className={classes.listActionText}
                          primary = {'Feedback'}/>
                          
                          <FeedBackForm event = {e} />
                      </div>
                      }
                      
                      {/* Events Page: Mark Attendance */}
                      {(`${e.attended}` != 'true') && ((new Date(`${e.start_date + ' ' + e.start_time}`)) <= today) && ((new Date(`${e.start_date + ' ' + e.end_time}`)) >= today) &&
                      <div className={classes.listActions}>
                          <ListItemText className={classes.listActionText}
                          primary = {'Mark Attendance'}/>
                          
                          <ListItemButton className={classes.listCardButton} onClick={() => {markAttendance(e)}}>
                              <ListItemIcon className={classes.icon}>
                                  <EmojiPeopleIcon />
                              </ListItemIcon>
                          </ListItemButton>
                      </div>
                    }
                      
                      {/* Events Page: RSVP */}
                      {(`${e.attended}` != 'true') && (`${e.rsvp}` == 'true') && ((new Date(`${e.start_date + ' ' + e.start_time}`)) > today) && 
                      <div className={classes.listActions}>
                          {(`${e.rsvp}` == 'true') &&
                          <ListItemText className={classes.listActionText}
                          primary = {'Cancel RSVP'}/>}
                          
                          {(`${e.rsvp}` != 'true') &&
                          <ListItemText className={classes.listActionText}
                          primary = {'RSVP'}/>}
                          
                          <ListItemButton className={classes.listCardButton} onClick={() => {markRsvp(e)}}>
                              <ListItemIcon className={classes.icon}>
                                  <RsvpIcon />
                              </ListItemIcon>
                          </ListItemButton>
                      </div>
                      }
                      
                  </ListItem>
              );
          })}
          {!events &&
              <ListItem>
                  <ListItemText 
                      primary = {'No events in this category!'}/>
              </ListItem>}
      </List>
  );
}