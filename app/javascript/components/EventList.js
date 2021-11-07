import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'

import { createTheme, makeStyles, createStyles } from "@material-ui/core"

//import { RsvpIcon, EmojiPeopleIcon} from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create';
import RsvpIcon from '@mui/icons-material/Rsvp';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
//import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const newTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      listCard: {
        padding: '0px 16px !important',
        borderRadius: '4px',
        border: '1px solid #DDD',
        marginTop: '30px',
      },
      listCardItem: {
        borderBottom: '1px solid #DDD',
        margin: '10px 0px',
        paddingLeft: '0px !important',
        paddingRight: '0px !important',
        '& :nth-child(1)': {
          marginTop: '0px',
        },
        '& :last-child': {
          marginBottom: '0px',
          borderBottom: '1px solid transparent',
        }
      },
      listCardButton: {
        borderRadius: '100px !important',
        flexGrow: '0 !important',
        width: '40px !important',
        height: '40px !important',
        justifyContent: 'center !important'
      },
      listActions: {
        display: 'flex',
      },
      listActionText: {
        '& > *': {
          fontSize: '0.75rem !important'
        }
      },
      icon: {
        minWidth: '10px'
      }
    }),
  { newTheme },
);

export default function EventList({events}) {
    console.log(events);
    
    const classes = useStyles();
    var today = new Date();
    
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
                        {((new Date(`${e.start_date}`)) <= today) && ((new Date(`${e.end_date}`)) >= today) &&
                        <div className={classes.listActions}>
                            <ListItemText className={classes.listActionText}
                            primary = {'Mark Attendance'}/>
                            
                            <ListItemButton className={classes.listCardButton} onClick={() => {console.log(new Date(`${e.start_date}`));console.log(new Date(`${e.start_date}`) > today)}}>
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
                            
                            <ListItemButton className={classes.listCardButton} onClick={() => {console.log(`${e.attended}`); console.log(`${e.attended}` != 'true'); console.log((new Date(`${e.start_date + ' ' + e.start_time}`)) <= today); console.log((new Date(`${e.start_date + ' ' + e.end_time}`)) >= today); }}>
                                <ListItemIcon className={classes.icon}>
                                    <CreateIcon />
                                </ListItemIcon>
                            </ListItemButton>
                        </div>
                        }
                        
                        {/* Events Page: Mark Attendance */}
                        {(`${e.attended}` != 'true') && ((new Date(`${e.start_date + ' ' + e.start_time}`)) <= today) && ((new Date(`${e.start_date + ' ' + e.end_time}`)) >= today) &&
                        <div className={classes.listActions}>
                            <ListItemText className={classes.listActionText}
                            primary = {'Mark Attendance'}/>
                            
                            <ListItemButton className={classes.listCardButton} onClick={() => {console.log(new Date(`${e.start_date}`));console.log(new Date(`${e.start_date}`) > today)}}>
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
                            
                            <ListItemButton className={classes.listCardButton} onClick={() => {console.log((new Date(`${e.start_date + ' ' + e.start_time}`)));console.log(`${e.rsvp}`);console.log(`${e.rsvp}` == 'true')}}>
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