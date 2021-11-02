import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

export default function EventList({events}) {
    console.log(events)
    return (
        <List
            sx = {{
                position: 'relative'
            }}>
            {events && events.map((e) => {
                return (
                    <ListItem>
                        <ListItemText 
                            primary = {`${e.title}`}
                            secondary = {`Start Date: ${e.start_date}`}/>
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