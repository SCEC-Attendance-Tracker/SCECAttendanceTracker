import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {Dialog} from "@material-ui/core";
import {DialogContent} from '@material-ui/core';
import {Typography} from "@material-ui/core";
import EventCodeEntry from './EventCodeEntry';

export default function EventList({events, member_id}) {
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

    return (
        <div>
            <List
                sx = {{
                    position: 'relative'
                }}>
                {events && events.map((e) => {
                    var s_date = new Date(e.start_date).toLocaleString();
                    return (
                        <ListItem>
                            <ListItemButton
                                onClick = {(event) => handleItemClick(e)}
                            >
                            <ListItemText 
                                key = {e.id}
                                primary = {`${e.title}`}
                                secondary = {`Start Date: ${s_date}`}
                                 />
                            </ListItemButton>
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
                                <EventCodeEntry event_id={element.id} member_id={member_id} event_code={element.code}/>
                            </div>
                            : 
                            <>
                            </>
                            }
                        </DialogContent>
                    </Dialog>
                }
            </List>
        </div>
      );
}