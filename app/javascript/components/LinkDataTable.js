import LinkTable from "./LinkTable";
import Link from "@material-ui/core/Link";

function getData(props) {
  
  var links = props.props.links;
  
  const columns = [
    {
      headerClassName: 'theme-header',
      field: 'id',
      headerName: 'ID',
      hide: true
    },
    { 
      headerClassName: 'theme-header',
      field: 'name', 
      headerName: 'Name',
      minWidth: 150,
      flex: 1
    },
    { 
      headerClassName: 'theme-header',
      field: 'url', 
      headerName: 'URL',
      minWidth: 150,
      flex: 1,
    },
    { 
      headerClassName: 'theme-header',
      field: 'description', 
      headerName: 'Description',
      minWidth: 150,
      flex: 1
    }
  ];
  
  var test_rows = [
    {
      id: 1,
      name: 'Google',
      url: 'https://www.google.com/',
      description: 'Google Homepage'
    }
  ];
  
  var rows = [];
  
  for (var i in links) {
    console.log(links[i])
    
    var entry = {
      id: i,
      name: links[i].name,
      url: links[i].url,
      description: links[i].description
    }
    rows.push(entry)
  }
  
  var data = {columns: columns, rows: rows}
  return data;
}

var data;

export default function LinkDataTable(props) {
  data = getData(props);
  return (
    LinkTable(data)
  );
}