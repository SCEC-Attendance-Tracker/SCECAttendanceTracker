import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import {Dialog} from "@material-ui/core";
import {DialogContent} from '@material-ui/core';
import {Typography} from "@material-ui/core";

import { createTheme, makeStyles, createStyles } from "@material-ui/core"
//import markAttendance from './EventsDataTable'
//import { RsvpIcon, EmojiPeopleIcon} from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create';
import RsvpIcon from '@mui/icons-material/Rsvp';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CheckIcon from '@mui/icons-material/Check';

import FeedBackForm from './FeedBackForm';
import EventCodeEntry from './EventCodeEntry';

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
      },
      attendedIcon: {
        color: '#00BB66',
        padding: '10px',
      }
    }),
  { newTheme },
);

export default function EventList({events, attendances = null, member = null, page = ""}) {
  const onHome = (page == "Home") ? true : false;
  const onEvents = !onHome;
  
  const classes = useStyles();
  var today = new Date();
  
  const [open, setOpen] = React.useState(false);
  const [element, setElement] = React.useState(false);
  const handleClose = () => {
      setOpen(false);
      setElement(null);
  };
  const handleItemClick = (e) => {
      setElement(e)
      setOpen(true)
  }

  const withinEventTime = (d) => {
      d = new Date(Date.parse(d));
      d.setMinutes(d.getMinutes() - 10);
      return new Date() >= d;
  }
  
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
            if (onHome) {
              e.attended = attendances.find(att => att.event_id == e.id).attended;
              e.rsvp = attendances.find(att => att.event_id == e.id).rsvp;
            }
              return (
                  <ListItem className={classes.listCardItem}>
                      <ListItemText 
                          primary = {`${e.title}`}
                          secondary = {`${e.start_date}`}/>
                      
                      {/* Home Page: Mark Attendance */}
                      {(`${e.attended}` != 'true') && onHome && ((new Date(`${e.start_date}`)) <= today) && ((new Date(`${e.end_date}`)) >= today) &&
                      <div className={classes.listActions}>
                          <ListItemText className={classes.listActionText}
                          primary = {'Mark Attendance'}/>
                          <ListItemButton className={classes.listCardButton} onClick={() => {handleItemClick(e)}}>
                              <ListItemIcon className={classes.icon}>
                                  <EmojiPeopleIcon />
                              </ListItemIcon>
                          </ListItemButton>
                      </div>
                      }
                      
                      {(`${e.attended}` == 'true') && onHome && ((new Date(`${e.start_date}`)) <= today) && ((new Date(`${e.end_date}`)) >= today) &&
                      <div className={classes.listActions}>
                          <ListItemText className={classes.listActionText}
                          primary = {'Attended'}/>
                          <CheckIcon className={classes.attendedIcon}/>
                      </div>
                      }
                      
                      {/* Events Page: Mark Attendance */}
                      {(`${e.attended}` != 'true') && ((new Date(`${e.start_date + ' ' + e.start_time}`)) <= today) && ((new Date(`${e.start_date + ' ' + e.end_time}`)) >= today) && onEvents &&
                      <div className={classes.listActions}>
                          <ListItemText className={classes.listActionText}
                          primary = {'Mark Attendance'}/>
                          
                          <ListItemButton className={classes.listCardButton} onClick={() => {handleItemClick(e)}}>
                              <ListItemIcon className={classes.icon}>
                                  <EmojiPeopleIcon />
                              </ListItemIcon>
                          </ListItemButton>
                      </div>
                      }
                      {(`${e.attended}` == 'true') && ((new Date(`${e.start_date + ' ' + e.start_time}`)) <= today) && ((new Date(`${e.start_date + ' ' + e.end_time}`)) >= today) && onEvents &&
                      <div className={classes.listActions}>
                          <ListItemText className={classes.listActionText}
                          primary = {'Attended'}/>
                          
                          <CheckIcon className={classes.attendedIcon}/>
                      </div>
                      }
                      
                      {/* Events Page: Feedback */}
                      {(`${e.attended}` == 'true') && onEvents &&
                      <div className={classes.listActions}>
                          <ListItemText className={classes.listActionText}
                          primary = {'Feedback'}/>
                          
                          <FeedBackForm event = {e} />
                      </div>
                      }
                      
                      {/* Events Page: RSVP */}
                      {(`${e.attended}` != 'true') && (`${e.rsvp}` == 'true') && ((new Date(`${e.start_date + ' ' + e.start_time}`)) > today) && onEvents &&
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
          {
            open && 
            <Dialog
                open = {open}
                onClose = {handleClose}
                fullWidth = {true}
                maxWidth = 'sm'
            >
                <DialogContent>
                    <Typography variant = 'h4' component = 'h4'>
                        {element.title}
                    </Typography>
                    <Typography variant = 'h6' component = 'h6'>
                        Start Date:
                    </Typography>
                    <Typography variant = 'subtitle1'>
                        {new Date(element.start_date).toLocaleString()}
                    </Typography>
                    <Typography variant = 'h6' component = 'h6'>
                        End Date:
                    </Typography>
                    <Typography variant = 'subtitle1'>
                        {new Date(element.end_date).toLocaleString()}
                    </Typography>
                    <Typography variant = 'h6' component = 'h6'>
                        Location:
                    </Typography>
                    <Typography variant = 'subtitle1'>
                        {element.location}
                    </Typography>
                    <Typography variant = 'h6' component = 'h6'>
                        Description:
                    </Typography>
                    <Typography variant = 'subtitle1'>
                        {element.description}
                    </Typography>
                    { withinEventTime(element.start_date) ?
                    <div style={{
                        flexDirection:'column', 
                        justifyContent:'center'
                    }}>
                        <EventCodeEntry event_id={element.id} member_id={member.id} event_code={element.code}/>
                    </div>
                    : 
                    <>
                    </>
                    }
                </DialogContent>
            </Dialog>
          }
          {!events &&
              <ListItem>
                  <ListItemText 
                      primary = {'No events in this category!'}/>
              </ListItem>}
      </List>
  );
}
