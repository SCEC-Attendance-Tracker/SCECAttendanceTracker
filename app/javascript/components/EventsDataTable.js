import * as React from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Link } from "@material-ui/core";
import DataTable from "./DataTable";

import EventCodeEntry from './EventCodeEntry';
import {Dialog} from "@material-ui/core";
import {DialogContent, DialogTitle, DialogActions} from '@material-ui/core';
import {Typography} from "@material-ui/core";

import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@mui/icons-material/Check';

import { createTheme, makeStyles, createStyles } from "@material-ui/core"
import CreateEventModal from './CreateEventModal'

export default function EventsDataTable(props) {
  
  var data;
  var member = props.props.members[0];
  var events = props.props.events;
  var attendances = props.props.attendances;
  
  if (data == undefined) {
    data = getData(props);
  }
  
  function getData(props) {
    
    console.log(props);
    
    var member = props.props.members[0];
    var events = props.props.events;
    var attendances = props.props.attendances;
    var a = attendances != undefined;
    
    console.log(member);
    var hideCode = member ? (member.admin ? false : true) : true;
    
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
        hide: hideCode
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
        width: 160,
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
        width: 150,
        hide: !member,
        type: 'actions',
        getActions: (params) => [
          <GridActionsCellItem
            icon={ params.row.rsvp ? <CheckIcon /> : <ClearIcon />}
            label="Mark RSVP"
            disabled={(new Date <= new Date(params.row.start_date + ' ' + params.row.start_time)) ? false : true}
            onClick={() => {
              markRsvp(params.row);
            }}
          />
        ],
      },
      {
        headerClassName: 'theme-header',
        field: 'attended',
        headerName: 'Mark Attendance',
        width: 150,
        hide: !member,
        type: 'actions',
        getActions: (params) => [
          <GridActionsCellItem
            icon={ params.row.attended ? <CheckIcon /> : <ClearIcon />}
            label="Mark Attendance"
            disabled={((new Date >= new Date(params.row.start_date + ' ' + params.row.start_time)) && (new Date <= new Date(params.row.end_date + ' ' + params.row.end_time))) ? false : true}
            onClick={() => {
              openAttendanceCheck(params.row)
              //markAttendance(params.row);
            }}
          />
        ],
      },
    ];
    
    const markRsvp = (row) => {
      const token = document.querySelector('[name=csrf-token]').content;
      var att = attendances.find(e => (e.event_id == row.event_id) && (e.member_id == member.id))
      if (!att) {
        att = {
          id: attendances.length + 1,
          member_id: member.id,
          event_id: row.event_id,
          rsvp: true,
          attended: false,
          created_at: new Date(),
          updated_at: new Date()
        }
        
        return (fetch(`/api/v1/attendances`, {
          method: 'POST', 
          body: JSON.stringify(att),
          headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
        })).then(() => {
          location.reload();
        })
      }
      
      att.rsvp = !att.rsvp;
      
      fetch(`/api/v1/attendances/${att.id}`, {
        method: 'PUT', 
        body: JSON.stringify(att),
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
      }).then(() => {
        location.reload();
      });
    }
    
    const markAttendance = (row) => {
      const token = document.querySelector('[name=csrf-token]').content;
      var att = attendances.find(e => (e.event_id == row.event_id) && (e.member_id == member.id))
      var today = new Date();
      var start = new Date(`${row.start_date + ' ' + row.start_time}`);
      var end = new Date(`${row.end_date + ' ' + row.end_time}`);
      
      console.log(start + " " + end)
      if (today < start || today > end) {
        return;
      }
      
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
        
        return (fetch(`/api/v1/attendances`, {
          method: 'POST', 
          body: JSON.stringify(att),
          headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
        })).then(() => {
          location.reload();
        })
      }
      
      att.attended = !att.attended;
      
      fetch(`/api/v1/attendances/${att.id}`, {
        method: 'PUT', 
        body: JSON.stringify(att),
        headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
      }).then(() => {
        location.reload();
      })
    }
    
    var rows = [];
    
    for (var i in events) {
      
      var entry = {
        id: i,
        event_id: events[i].id,
        title: events[i].title,
        code: events[i].code,
        start_date: new Date(events[i].start_date).toLocaleDateString(),
        end_date: new Date(events[i].end_date).toLocaleDateString(),
        start_time: new Date(events[i].start_date).toLocaleTimeString(),
        end_time: new Date(events[i].end_date).toLocaleTimeString(),
        description: events[i].description,
        location: events[i].location,
        rsvp: (attendances && member ? 
          (attendances.find(e => (e.event_id == events[i].id) && (e.member_id == member.id)) ? 
            ((attendances.find(e => (e.event_id == events[i].id) && (e.member_id == member.id)).rsvp) ? true : false ) 
          : false) 
        : false),
        attended: (attendances && member ? 
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
  
  const [open, setOpen] = React.useState(false);
  const [element, setElement] = React.useState(false);
  const handleClose = () => {
      setOpen(false);
      setElement(null);
  };
  const openAttendanceCheck = (e) => {
      setElement(e)
      setOpen(true)
  }

  const withinEventTime = (d) => {
      d = new Date(Date.parse(d));
      d.setMinutes(d.getMinutes() - 10);
      return new Date() >= d;
  }
  
  
  return (
    <>
      <DataTable data = {data} member = {member}/>
      {open && 
        <Dialog
        open = {open}
        onClose = {handleClose}
        fullWidth = {true}
        maxWidth = 'sm'
    >
        <DialogTitle>
            {element.title}
        </DialogTitle>
        <DialogContent>
            <Typography variant = 'body1'>
                {new Date(element.start_date + ' ' + element.start_time).toLocaleString()}
                —
                {new Date(element.end_date + ' ' + element.end_time).toLocaleString()}
            </Typography>
            <Typography variant = 'h6' component = 'h6'>
                Location:
            </Typography>
            <Typography variant = 'body1'>
                {element.location}
            </Typography>
            <Typography variant = 'h6' component = 'h6'>
                Description:
            </Typography>
            <Typography variant = 'body1'>
                {element.description}
            </Typography>
            { (withinEventTime(element.start_date) && !element.attended) ?
            <DialogActions>
                <EventCodeEntry event_id={element.event_id} member_id={member.id} event_code={element.code}/>
            </DialogActions>
            : 
            <>
            <DialogActions/>
            </>
            }
        </DialogContent>
    </Dialog>
      }
    </>
  );
}
