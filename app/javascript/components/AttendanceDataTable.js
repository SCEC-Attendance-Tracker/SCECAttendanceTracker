import * as React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { DataGrid, GridToolbarDensitySelector, GridToolbarFilterButton} from '@mui/x-data-grid';

import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import { createTheme, makeStyles, createStyles } from "@material-ui/core"

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      textField: {
        [theme.breakpoints.down('xs')]: {
          width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme },
);

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

function getData(props) {
  
  var members = props.props.members;
  var events = props.props.events;
  var attendances = props.props.attendances;
  
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
  }
  
  var data = {columns: columns, rows: rows}
  return data;
}

var data;

export default function AttendanceDataTable(props) {
  
  if (data == undefined) {
    data = getData(props);
    console.log(data);
  }
  
  const [searchText, setSearchText] = React.useState('');
  const [dataRows, setDataRows] = React.useState(data.rows);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setDataRows(filteredRows);
    console.log(filteredRows);
    
    console.log(dataRows);
  };

  React.useEffect(() => {
    setDataRows(data.rows);
  }, [data.rows]);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
        rows={dataRows}
        columns={data.columns.slice(1).slice(-6)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}