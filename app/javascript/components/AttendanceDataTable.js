import * as React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { DataGrid, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarExport} from '@mui/x-data-grid';
import DataTable from "./DataTable";

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import { createTheme, makeStyles, createStyles } from "@material-ui/core"

function getData(props) {
  
  var members = props.props.members;
  var events = props.props.events;
  var attendances = props.props.attendances;
  
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true
    },
    { 
      field: 'member_id', 
      headerName: 'Member ID',
      width: 100,
      hide: true
    },
    { field: 'event_id', 
      headerName: 'Event ID',
      width: 100,
      hide: true
    },
    { 
      field: 'first_name', 
      headerName: 'First Name',
      width: 180
    },
    { 
      field: 'last_name', 
      headerName: 'Last Name',
      width: 180
    },
    {
      field: 'title',
      headerName: 'Event',
      width: 250
    },
    {
      field: 'start_date',
      headerName: 'Date',
      width: 180
    },
    {
      field: 'start_time',
      headerName: 'Time',
      width: 180
    },
    {
      field: 'rsvp',
      headerName: 'RSVP?',
      width: 150
    },
    {
      field: 'attended',
      headerName: 'Attended?',
      width: 150,
      editable: true,
      type: 'boolean'
    },
  ];
  
  var test_rows = [
    {
      id: 1,
      member_id: 1,
      event_id: 1,
      first_name: 'First',
      last_name: 'Last',
      title: 'Title',
      start_date: new Date().toLocaleDateString(),
      start_time: new Date().toLocaleTimeString(),
      rsvp: 'Yes',
      attended: 'No' 
    },
    {
      id: 2,
      member_id: 1,
      event_id: 2,
      first_name: 'First',
      last_name: 'Last',
      title: 'Title 2',
      start_date: new Date().toLocaleDateString(),
      start_time: new Date().toLocaleTimeString(),
      rsvp: 'No',
      attended: 'No' 
    },
  ];
  
  var rows = [];
  
  for (var i in attendances) {
    console.log(attendances[i])
    
    var entry = {
      id: i,
      member_id: attendances[i].member_id,
      event_id: attendances[i].event_id,
      first_name: members.find(id => attendances[i].member_id).first_name,
      last_name: members.find(id => attendances[i].member_id).last_name,
      title: events.find(id => attendances[i].event_id).title,
      start_date: new Date(events.find(id => attendances[i].event_id).start_date).toLocaleDateString(),
      start_time: new Date(events.find(id => attendances[i].event_id).start_date).toLocaleTimeString(),
      rsvp: (attendances[i].rsvp ? 'Yes' : 'No'),
      attended: ((new Date(events.find(id => attendances[i].event_id).start_date) < new Date()) ? (attendances[i].attended ? 'Yes' : 'No') : '--')
    }
    rows.push(entry)
  }
  
  var data = {columns: columns, rows: rows}
  return data;
}

var data;

export default function AttendanceDataTable(props) {
  data = getData(props);
  return (
    DataTable(data)
  );
}