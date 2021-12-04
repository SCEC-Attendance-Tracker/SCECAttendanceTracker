import * as React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { DataGrid, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarExport, GridActionsCellItem} from '@mui/x-data-grid';
import DataTable from "./DataTable";

import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';

import { createTheme, makeStyles, createStyles, Button } from "@material-ui/core"

function getData(props) {
  
  var events = props.props.events;
  var feedbacks = props.props.feedbacks;
  
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
      hide: true
    },
    { 
      headerClassName: 'theme-header',
      field: 'title', 
      headerName: 'Event Title',
      minWidth: 150,
      flex: 1
    },
    { 
      headerClassName: 'theme-header',
      field: 'event_rating_score', 
      headerName: 'Event Rating',
      minWidth: 50,
      flex: 1
    },
    {
      headerClassName: 'theme-header',
      field: 'event_review',
      headerName: 'Event Review',
      minWidth: 250,
      flex: 1
    }
  ];
  
  var rows = [];
  for (var i in feedbacks) {
    console.log(feedbacks[i])
    var entry = {
      id: i,
      event_id: feedbacks[i].event_id,
      title: events.find(e => e.id == feedbacks[i].event_id).title,
      event_rating_score: feedbacks[i].event_rating_score,
      event_review: feedbacks[i].event_review
    }
    rows.push(entry)
  }
  
  var data = {columns: columns, rows: rows}
  return data;
}

var data;

export default function FeedbackDataTable(props) {
  if (data == undefined) {
    data = getData(props);
  }
  console.log(data);
  return (
    <DataTable data = {data} member = {props.props.member[0]}/>
  );
}