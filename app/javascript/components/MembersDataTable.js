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
      field: 'admin',
      headerName: 'Admin?',
      hide: true
    },
    {
      headerClassName: 'theme-header',
      field: 'img_url',
      headerName: 'ProfileImg',
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
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
        icon={ params.row.dues ? <CheckIcon /> : <ClearIcon />}
        label="Paid Dues"
        onClick={() => {
          markDues(params.row);
        }}
      />
      ]
    },
    {
      headerClassName: 'theme-header',
      field: 'total',
      headerName: 'Total Points',
      width: 120,
      flex: 1,
    },
    {
      headerClassName: 'theme-header',
      field: 'is_member',
      headerName: 'Org Membership?',
      width: 150,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={ params.row.is_member ? <CheckIcon /> : <ClearIcon />}
          label="Change Membership"
          onClick={() => {
            markMembership(params.row);
          }}
        />,
      ],
    },
  ];
  
  const markDues = (row) => {
    const token = document.querySelector('[name=csrf-token]').content;
    
    var mem = {
      id: row.member_id,
      paid_dues: !row.dues
    }
    
    fetch(`/api/v1/members/${row.member_id}`, {
      method: 'PUT', 
      body: JSON.stringify(mem),
      headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
    }).then(() => {
      location.reload();
    });
  }

  const markMembership = (row) => {
    const token = document.querySelector('[name=csrf-token]').content;
    if (row.is_member == false) 
    {
      var mem = {
        id: row.member_id,
        first_name: row.first_name,
        last_name: row.last_name,
        dues: row.dues,
        total: row.total,
        is_member: true
      }
      return fetch(`/api/v1/members/${mem.id}`, {
        method: 'PUT',
        body: JSON.stringify(mem),
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
      }).then(() => {
        location.reload();
      }).catch((error) => { console.error(error) });
    }
    else {
      var mem = {
        id: row.member_id,
        first_name: row.first_name,
        last_name: row.last_name,
        dues: row.dues,
        total: row.total,
        is_member: false
      }
      return fetch(`/api/v1/members/${mem.id}`, {
        method: 'PUT',
        body: JSON.stringify(mem),
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
      }).then(() => {
        location.reload();
        alert("This user is no longer a member")
      }).catch((error) => { console.error(error) });
    }
  }
  var rows = [];
  
  for (var i in members) {
    //console.log(members[i])
    
    var entry = {
      id: i,
      admin: ((members[i].admin) ? true : false),
      img_url: members[i].img_url,
      member_id: members[i].id,
      first_name: members[i].first_name,
      last_name: members[i].last_name,
      dues: ((members[i].paid_dues) ? true : false),
      total: members[i].total_attendance,
      is_member: ((members[i].is_member) ? true : false)
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
  console.log(props)
  return (
    <DataTable data = {data} member = {props.props.member[0]}/>
  );
}
