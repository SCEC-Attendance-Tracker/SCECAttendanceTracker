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
      headerClassName: 'theme-header',
      field: 'id',
      headerName: 'ID',
      hide: true
    },
    { 
      headerClassName: 'theme-header',
      field: 'member_id', 
      headerName: 'Member ID',
      width: 100,
      hide: true
    },
    {
      headerClassName: 'theme-header', field: 'event_id', 
      headerName: 'Event ID',
      width: 100,
      hide: true
    },
    { 
      headerClassName: 'theme-header',
      field: 'first_name', 
      headerName: 'First Name',
      minWidth: 150,
      flex: 1
    },
    { 
      headerClassName: 'theme-header',
      field: 'last_name', 
      headerName: 'Last Name',
      minWidth: 150,
      flex: 1
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
      field: 'start_time',
      headerName: 'Time',
      width: 120,
    },
    {
      headerClassName: 'theme-header',
      field: 'rsvp',
      headerName: 'RSVP?',
      width: 150,
      type: 'boolean'
    },
    {
      headerClassName: 'theme-header',
      field: 'attended',
      headerName: 'Attended?',
      width: 160,
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
      first_name: members.find(e => e.id == attendances[i].member_id).first_name,
      last_name: members.find(e => e.id == attendances[i].member_id).last_name,
      title: events.find(e => e.id == attendances[i].event_id).title,
      start_date: new Date(events.find(e => e.id == attendances[i].event_id).start_date).toLocaleDateString(),
      start_time: new Date(events.find(e => e.id == attendances[i].event_id).start_date).toLocaleTimeString(),
      rsvp: (attendances[i].rsvp ? true : false ),
      attended: ((new Date(events.find(e => e.id == attendances[i].event_id).start_date) < new Date()) ? (attendances[i].attended ? true : false) : false)
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