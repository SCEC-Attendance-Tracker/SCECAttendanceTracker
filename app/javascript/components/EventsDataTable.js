import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { DataGrid, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarExport, GridActionsCellItem} from '@mui/x-data-grid';
import DataTable from "./DataTable";

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@mui/icons-material/Check';

import { createTheme, makeStyles, createStyles } from "@material-ui/core"

function getData(props) {
  
  console.log(props);
  
  var member = props.props.members[0];
  var events = props.props.events;
  var attendances = props.props.attendances;
  var a = attendances != undefined;
  
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
      field: 'title',
      headerName: 'Event',
      minWidth: 150,
      flex: 1,
    },
    {
      headerClassName: 'theme-header',
      field: 'start_date',
      headerName: 'Date',
      width: 120,
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
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={ params.row.attended ? <CheckIcon /> : <ClearIcon />}
          label="Mark Attendance"
          onClick={() => {
            console.log(params);
            markAttendance(params.row);
          }}
        />
      ],
    },
  ];
  
  const markAttendance = (row) => {
    const token = document.querySelector('[name=csrf-token]').content;
    var att = attendances.find(e => (e.event_id == row.event_id) && (e.member_id == member.id))
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
      
      attendances.push(att);
      console.log(attendances);
      
      return (fetch(`/api/v1/attendances`, {
        method: 'POST', 
        body: JSON.stringify(att),
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
      })).then(() => {
        location.reload();
      })
    }
    
    att.attended = !att.attended;
    console.log(att);
    
    fetch(`/api/v1/attendances/${att.id}`, {
      method: 'PUT', 
      body: JSON.stringify(att),
      headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
    });
  }
  
  var rows = [];
  
  for (var i in events) {
    
    var entry = {
      id: i,
      event_id: events[i].id,
      title: events[i].title,
      start_date: new Date(events[i].start_date).toLocaleDateString(),
      start_time: new Date(events[i].start_date).toLocaleTimeString(),
      end_time: new Date(events[i].end_date).toLocaleTimeString(),
      description: events[i].description,
      location: events[i].location,
      rsvp: (attendances ? 
        (attendances.find(e => (e.event_id == events[i].id) && (e.member_id == member.id)) ? 
          ((attendances.find(e => (e.event_id == events[i].id) && (e.member_id == member.id)).rsvp) ? true : false ) 
        : false) 
      : false),
      attended: (attendances ? 
      (attendances.find(e => (e.event_id == events[i].id) && (e.member_id == member.id)) ? 
        (attendances.find(e => (e.event_id == events[i].id) && (e.member_id == member.id)).attended ? true : false ) 
      : false)
    : false)
    }
    rows.push(entry)
  }
  
  var data = {columns: columns, rows: rows}
  console.log(data.rows)
  return data;
}

var data;

export default function EventsDataTable(props) {
  if (data == undefined) {
    data = getData(props);
  }
  return (
    DataTable(data)
  );
}