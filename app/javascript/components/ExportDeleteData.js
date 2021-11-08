import React from 'react';
import { Button, Typography } from '@material-ui/core';

/** 
 * Functional component for downloading data from server 
 * Returns rails html embed to create data.csv in public folder
 * If download, just downloads
 * If delete, downloads and deletes on confirmation 
 */

class ExportDeleteData extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.render();
    }

    createCSV = () => {
        this.downloadCSV();
    }

    deleteDatabase = () => {
        var burnItDown = confirm("Are you sure you want to delete all data?");
        if (burnItDown) {
            alert("Exporting data and emptying database...");
            this.downloadCSV();
            return (
                '<%= wipe_database %>'
            );
        } 
    }

    // Fetch ./data.csv
    downloadCSV = () => {
        fetch('/SCECData.csv', {
            method: 'GET',
            headers: {'Content-Type': 'application/csv]'}
        })
        .then((response) => response.blob())
        .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(
            new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `SCECData.csv`,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        });
    }

    render = () => {        
        return (
            <div style={{
                display: 'flex', 
                flexDirection: 'column'
            }}> 
                <Typography variant='h2'>Admin Actions</Typography>
                <div>
                    <Typography margin='auto'>Export or Delete Website Data</Typography>
                </div> 
                <div>
                    <Button variant='outlined' margin='auto' onClick={this.createCSV}> Download Data </Button>
                    <Button variant='outlined' margin='auto' onClick={this.deleteDatabase}> Delete All Data </Button>
                </div>
            </div>
        );
    }
}

export default ExportDeleteData;