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
      field: 'mark',
      headerName: 'Mark Attendance',
      width: 160,
      editable: true,
      type: 'boolean'
    },
  ];
  
  var rows = [];
  console.log(events)
  
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
      rsvp: (a ? (attendances.find(e => e.event_id == events[i].id && e.member_id == member.id).rsvp ? true : false ) : false),
      attended: ((new Date(events[i].start_date) < new Date()) ? (attendances.find(e => (e.event_id == events[i].id) && (e.member_id == member.id).attended ? true : false )) : false)
    }
    rows.push(entry)
  }
  
  var data = {columns: columns, rows: rows}
  return data;
}

var data;

export default function EventsDataTable(props) {
  data = getData(props);
  
  return (
    DataTable(data)
  );
}