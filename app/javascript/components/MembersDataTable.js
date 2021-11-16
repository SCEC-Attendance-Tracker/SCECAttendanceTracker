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
      headerClassName: 'theme-header',
      field: 'first_name', 
      headerName: 'First Name',
      minWidth: 150,
      flex: 2
    },
    { 
      headerClassName: 'theme-header',
      field: 'last_name', 
      headerName: 'Last Name',
      minWidth: 150,
      flex: 2
    },
    {
      headerClassName: 'theme-header',
      field: 'dues',
      headerName: 'Paid Dues?',
      width: 160,
      flex: 1,
      editable: true,
      type: 'boolean',
    },
    {
      headerClassName: 'theme-header',
      field: 'total',
      headerName: 'Total Points',
      width: 120,
      flex: 1,
    },
  ];
  
  var rows = [];
  
  for (var i in members) {
    //console.log(members[i])
    
    var entry = {
      id: i,
      member_id: members[i].id,
      first_name: members[i].first_name,
      last_name: members[i].last_name,
      dues: ((members[i].paid_dues) ? true : false),
      total: members[i].total_attendance
    }
    rows.push(entry)
  }
  
  var data = {columns: columns, rows: rows}
  return data;
}


var data;


export default function MemberDataTable(props) {
  if (data == undefined) {
  data = getData(props);
  }
  return (
    <DataTable data = {data}/>
  );
}
