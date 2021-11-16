import DataTableAlt from "./DataTableAlt";

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

export default function AttendanceDataTable(props) {
  data = getData(props);
  return (
    <DataTableAlt data = {data} />
  );
}