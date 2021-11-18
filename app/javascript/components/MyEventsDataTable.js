import * as React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import { DataGrid, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarExport} from '@mui/x-data-grid'
import DataTable from './DataTable'
import EventList from './EventList'

import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'

import { createTheme, makeStyles, createStyles } from '@material-ui/core'

function getData(props) {
  
  console.log(props);
  
  var member = props.props.members[0];
  var events = props.props.events;
  var attendances = props.props.attendances;
  var isHome = props.props.page ? (props.props.page == "Home" ? true : false) : false;
  var a = attendances != undefined;
  var showCode = member ? (member.admin ? false : true) : false;
  
  const columns = [
    {
      headerClassName: 'theme-header',
      field: 'id',
      headerName: 'ID',
      hide: true
    },
    {
      headerClassName: 'theme-header', 
      field: 'event_id', 
      headerName: 'Event ID',
      width: 100,
      hide: true
    },
    {
      headerClassName: 'theme-header', 
      field: 'code', 
      headerName: 'Code',
      width: 120,
      hide: showCode
    },
    {
      headerClassName: 'theme-header',
      field: 'title',
      headerName: 'Event',
      minWidth: 150,
      flex: 1
    },
    {
      headerClassName: 'theme-header',
      field: 'start_date',
      headerName: 'Date',
      width: 120,
    },
    {
      headerClassName: 'theme-header',
      field: 'end_date',
      headerName: 'Date',
      width: 120,
      hide: true
    },
    {
      headerClassName: 'theme-header',
      field: 'start_time',
      headerName: 'From',
      width: 120,
    },
    {
      headerClassName: 'theme-header',
      field: 'end_time',
      headerName: 'To',
      width: 120,
    },
    {
      headerClassName: 'theme-header',
      field: 'description',
      headerName: 'Description',
      width: 150,
    },
    {
      headerClassName: 'theme-header',
      field: 'location',
      headerName: 'Location',
      width: 150,
    },
    {
      headerClassName: 'theme-header',
      field: 'rsvp',
      headerName: 'RSVP',
      width: 160,
      editable: true,
      type: 'boolean'
    },
    {
      headerClassName: 'theme-header',
      field: 'attended',
      headerName: 'Mark Attendance',
      width: 160,
      editable: true,
      type: 'boolean'
    },
  ];
  
  var rows = [];
  console.log(events)
  
  var myEvents = [];
  for (var i in attendances) {
    if (attendances[i].member_id == member.id) {
      var e = events.find(x => x.id == attendances[i].event_id);
      myEvents.push(e);
    }
  }
  console.log(myEvents);
  
  if (isHome) {
    myEvents = events;
  }
  
  for (var i in myEvents) {
    if (myEvents[i]) {
      var entry = {
        id: i,
        event_id: myEvents[i].id,
        code: myEvents[i].code,
        title: myEvents[i].title,
        start_date: new Date(myEvents[i].start_date).toLocaleDateString(),
        end_date: new Date(myEvents[i].end_date).toLocaleDateString(),
        start_time: new Date(myEvents[i].start_date).toLocaleTimeString(),
        end_time: new Date(myEvents[i].end_date).toLocaleTimeString(),
        description: myEvents[i].description,
        location: myEvents[i].location,
        rsvp: (attendances ? 
                (attendances.find(e => (e.event_id == myEvents[i].id) && (e.member_id == member.id)) ? 
                  ((attendances.find(e => (e.event_id == myEvents[i].id) && (e.member_id == member.id)).rsvp) ? true : false ) 
                : false) 
              : false),
        attended: (attendances ? 
                    (attendances.find(e => (e.event_id == myEvents[i].id) && (e.member_id == member.id)) ? 
                      (attendances.find(e => (e.event_id == myEvents[i].id) && (e.member_id == member.id)).attended ? true : false ) 
                    : false)
                  : false)
      }
      rows.push(entry)
    }
  }
  
  var data = {columns: columns, rows: rows}
  return data;
  //return rows;
}

var data;

export default function MyEventsDataTable(props) {
  
  console.log(props);
  
  if ((props.props.members.length > 0) || (props.props.page == "Home")) {
  
    if (data == undefined) {
      data = getData(props);
    }
    console.log(data.rows);
    var attendances = props.props.attendances;
    var member = props.props.members[0];
    
    return (
      EventList({events: data.rows, attendances: attendances, member: member})
      //DataTable(data)
    );
  }
  return (<></>);
}