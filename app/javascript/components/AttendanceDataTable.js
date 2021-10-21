import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function AttendanceDataTable(props) {
  
  
  var members = props.props.members;
  var events = props.props.events;
  var attendances = props.props.attendances;
  
  console.log(props);
  console.log(attendances);
  
  
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      visible: false
    },
    { 
      field: 'member_id', 
      headerName: 'Member ID',
      width: 100
    },
    { field: 'event_id', 
      headerName: 'Event ID',
      width: 100
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
      field: 'rsvp',
      headerName: 'RSVP?',
      width: 150
    },
    {
      field: 'attended',
      headerName: 'Attended?',
      width: 150
    },
  ];
  
  var rows = [
    {
      id: 1,
      member_id: 1,
      event_id: 1,
      first_name: 'First',
      last_name: 'Last',
      title: 'Title',
      start_date: new Date(),
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
      start_date: new Date(),
      rsvp: 'No',
      attended: 'No' 
    },
  ];
  
  for (var i in attendances) {
    console.log(attendances[i])
    
    var entry = {
      id: i,
      member_id: attendances[i].member_id,
      event_id: attendances[i].event_id,
      first_name: members.find(id => attendances[i].member_id).first_name,
      last_name: members.find(id => attendances[i].member_id).last_name,
      title: events.find(id => attendances[i].event_id).title,
      start_date: events.find(id => attendances[i].event_id).start_date,
      rsvp: (attendances[i].rsvp ? 'Yes' : 'No'),
      attended: ((events.find(id => attendances[i].event_id).start_date < new Date()) ? (attendances[i].attended ? 'Yes' : 'No') : '--')
    }
    rows.push(entry)
    console.log(entry)
  }
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns.slice(1).slice(-6)}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}