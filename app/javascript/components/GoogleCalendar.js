import React from "react"
import FullCalendar from '@fullcalendar/react'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import dayGridPlugin from '@fullcalendar/daygrid'

class GoogleCalendar extends React.Component {
  constructor() {
    super()
    this.state = {data: []}
  }
  componentDidMount() {
   fetch(`/api/v1/calendar/is_subscribed`, {
    method: 'GET', 
    headers: { 'ACCEPT': 'application/json'}
    }).then(response => response.json()
    ).then(data => {
      console.log(data)
      this.setState({data: data})
    });
  }
  render () {
    const token = document.querySelector('[name=csrf-token]').content;
    let customButtons, headerToolbar;
    if(this.state.data.is_subscribed == null){
      customButtons = {}
      headerToolbar = {
        start: 'title',
        end: 'today prev,next'
      }
    }
    else if(this.state.data.is_subscribed) {
       customButtons = {
        unsubscribe: {
          text: 'Unsubscribe',
          click: function() {
            fetch(`/api/v1/calendar/subscribe`, {
              method: 'PUT', 
               headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
              }).then(response => response.json()
              ).then(location.reload());
          }
        }
      }
      
      headerToolbar = {
        start: 'title',
        end: 'unsubscribe today prev,next'
      }
    }
    else {
      customButtons = {
        subscribe: {
          text: 'Subscribe',
          click: function() {
            fetch(`/api/v1/calendar/subscribe`, {
              method: 'PUT', 
              headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
              }).then(response => response.json()
              ).then(location.reload());
          }
        }
      }

      headerToolbar = {
        start: 'title',
        end: 'subscribe today prev,next'
      }
    }

    return (
            <FullCalendar 
            plugins = {[ googleCalendarPlugin, dayGridPlugin ]}
            initialView = 'dayGridMonth'
            googleCalendarApiKey = 'AIzaSyCR2x14NDYQHh94VS3ag0j-uPk96U-7Z1I'
            contentHeight = "auto"
            expandRows = {true}
            customButtons = {customButtons}
            headerToolbar = {headerToolbar}
            events = {{
              googleCalendarId: 'scecattendancetracker@gmail.com'
            }}
          />
    );
  }
}

export default GoogleCalendar
