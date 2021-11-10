import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {}
  })
);

const handleClick = (event, cellValues) => {
  console.log(cellValues.row);
};

const handleCellClick = (param, event) => {
  event.stopPropagation();
};

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
    hide: true
  },
  {
    headerClassName: 'theme-header',
    field: 'url',
    headerName: 'URL',
    minWidth: 150,
    flex: 1,
    renderCell: (cellValues) => {
      return <Link href={cellValues.row.url}>{cellValues.row.name}</Link>;
    }
  },
  { 
    headerClassName: 'theme-header',
    field: 'description', 
    headerName: 'Description',
    minWidth: 150,
    flex: 1
  }
];


export default function LinkDataTable(props) {
  var member;	
  if (props.props.member != undefined) {
    member = props.props.member[0]
  }
  var rows = props.props.links;
  const classes = useStyles();
  { (member != undefined) && (member.admin) &&
    columns.push(
      { 
        headerClassName: 'theme-header',
        field: 'edit', 
        headerName: 'Edit',
        minWidth: 50,
        maxWidth: 100,
        flex: 1, 
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              Edit
            </Button>
          );
        }
      },
      { 
        headerClassName: 'theme-header',
        field: 'delete', 
        headerName: 'Delete',
        minWidth: 50,
        maxWidth: 100,
        flex: 1, 
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              Delete
            </Button>
          );
        }
      }
    )
  }

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rowHeight={120}
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={5}
        onCellClick={handleCellClick}
      />
    </div>
  );
}
