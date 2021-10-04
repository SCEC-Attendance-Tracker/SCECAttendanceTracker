import React from "react"
import FullCalendar from '@fullcalendar/react'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import dayGridPlugin from '@fullcalendar/daygrid'
class GoogleCalendar extends React.Component {
  render () {
    return (
        <FullCalendar 
          plugins = {[ googleCalendarPlugin, dayGridPlugin ]}
          initialView = "dayGridMonth"
          googleCalendarApiKey = 'AIzaSyAc2Ls0mbsox4ZX6xCX2ZoybF6YFLtot34'
          events = {{
            googleCalendarId: 'scecattendancetracker@gmail.com'
          }}
        />
    );
  }
}

export default GoogleCalendar
