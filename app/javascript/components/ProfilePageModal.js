import React from "react";
import { DialogContent, IconButton, Typography, TextField, Box, Button, Dialog, Avatar } from "@material-ui/core";
import { DeleteOutlined, EditOutlined, Check, Close } from "@material-ui/icons";
import './stylesheets/Profile.css';

class ProfilePageModal extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            member_info: this.props.member, 
            is_owner: this.props.is_owner, 
            show: false,
            member_edit: {},
            editable: false, 
            formValid: true, 
            error: ""
        };
    }

    handleOpen = e => {
        e.preventDefault();
        this.setState({show: true})
    }
    
    handleClose = () => {
        this.setState({show: false})
    }

    setEditMemberInfo = (member) => {
        this.setState({member_edit: member});
        console.log(member);
    }
    
    getMemberJSON = () => {
        if (this.state.is_owner) {
            fetch(`/api/v1/members/${this.state.member_info.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
            }). 
            then((response) => response.json()). 
            then((member) => this.setEditMemberInfo({...member}));
        } 
    }
    
    componentDidMount() {
        this.getMemberJSON();
        this.render();
    }
    
    handleEdit = () => {
        if (this.state.editable) {
            this.updatePostRequest();
        } 

        this.setState({editable: !this.state.editable});
    }

    handleEditCancel = () => {
        this.setState({editable: !this.state.editable});
        this.setState({member_edit: this.state.member_info});
    }
    
    returnDuesStatement = (paid_dues) => {
        if (paid_dues) {
            return (
                <Typography id="profile-page-text">
                    Your dues are paid!
                </Typography>
            );
        } else {
            return (
                <Typography id="profile-page-text">
                    Your dues are NOT paid!
                </Typography>
            );
        }
    }
    
    handleInputChange = (event) => {
        var member_change = {...this.state.member_edit};
        var dictName = [event.target.name];
        
        if (dictName == "first_name") {
            member_change.first_name = event.target.value;
        } else if (dictName == "last_name") {
            member_change.last_name = event.target.value;
        } else if (dictName == "description") {
            member_change.description = event.target.value;
        }

        this.setState({member_edit: member_change});
    }
    
    handleDelete = () => {
        var deleteConfirm = confirm("Are you sure you would like to delete your account?"); 
        if (deleteConfirm) {
            const token = document.querySelector('[name=csrf-token]').content; 
            fetch(`/api/v1/members/${this.state.member_info.id}`, {
            method: 'DELETE', 
            headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
            }).then((response) => {
            alert("Your profile has been deleted.")
            });
            window.location.reload(false);
        }
    }
    
    handleValidation = () => {
        if(this.state.member_edit.first_name == "") {
            this.setState({formValid: false})
            this.setState({error: "First name cannot be empty"});
            return;
        }

        if(this.state.member_edit.last_name == "") {
            this.setState({formValid: false})
            this.setState({error: "Last name cannot be empty"});
            return;
        }

        this.setState({formValid: true})
        this.setState({error: ""});
    }

    updatePostRequest = () => {
        this.handleValidation();
    
        if (this.state.formValid) {
          const token = document.querySelector('[name=csrf-token]').content;
          fetch(`/api/v1/members/${this.state.member_info.id}`, {
          method: 'PUT', 
          body: JSON.stringify(this.state.member_edit),
          headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token}
          }).then((response) => {
            if (response.ok) {
              this.setState({member_info: this.state.member_edit});
              return response;
            }
    
            throw new Error('Something is wrong');
          }).then((json) => {
          }).catch((error) => {console.error(error)});
        } else {
          alert(this.state.error);
        }
      }

    renderProfilePage = (style) => {
        const paid_dues = this.state.member_info.paid_dues;
        var first_name = this.state.member_edit.first_name;
        var last_name = this.state.member_edit.last_name;
        var description = this.state.member_edit.description;
        
        return (
            <>
            <Box sx={style}>
                <div className='name-icons-header'>
                    <div className='name'>
                        {this.state.editable ? 
                        <>
                        <TextField id="outlined" label="First Name" name="first_name" value={first_name} onChange={this.handleInputChange}/>
                        <TextField id="outlined" label="Last Name" name="last_name" value={last_name} onChange={this.handleInputChange}/>
                        </>
                        : 
                        <div className="avatar-first-last" style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Avatar style={{ width: 70, height: 70 }} src={this.state.member_info.img_url}/>
                            <Typography style={{paddingLeft:'12px', margin:'auto'}} id="profile-page-label" variant="h3" component="h3" >
                                {this.state.member_info.first_name} {this.state.member_info.last_name}
                            </Typography>
                        </div>
                        }
                    </div>
                    <div className='delete-close'>
                        {this.state.is_owner && this.state.editable ? "" : <IconButton size="medium" onClick={this.handleDelete} aria-label="Delete Profile"> <DeleteOutlined/> </IconButton>}
                        <IconButton size="medium" onClick={this.handleClose} aria-label="Close Menu"> <Close/> </IconButton>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="email">
                <Typography id="profile-page-label" variant="overline" component="h2">
                    Email:
                </Typography>
                <Typography id="profile-page-text" sx={{ mt: 2 }}>
                    {this.state.member_info.email}
                </Typography>
                </div>
                <div className="description">
                <Typography id="profile-page-label" variant="overline" component="h2">
                    About Me:
                </Typography> 
                {this.state.editable ? <TextField id="outlined" name="description" aria-label="About me:" multiline fullWidth value={description} onChange={this.handleInputChange}/>
                :
                <><Typography id="profile-page-text" sx={{ mt: 2 }}>{this.state.member_info.description}</Typography></>
                }
                </div>
                <div className="attendance-points">
                    {this.state.is_owner ? 
                    <Typography id="profile-page-label" variant="overline"> 
                    Attendance Points 
                    </Typography> : ""}
                    {this.state.is_owner ? 
                    <Typography id="profile-page-text"> 
                    {this.state.member_info.total_attendance}
                    </Typography> : ""}
                </div>
                <div className='paid-dues-icon-footer'>
                    <div className="paid-dues" style={{
                        width:'50%'
                    }}>
                        {this.state.is_owner ?
                        <Typography id="profile-page-label" variant="overline"> 
                            Paid Dues? 
                        </Typography> : ""}
                        {this.state.is_owner ? 
                        this.returnDuesStatement(paid_dues) : ""}
                    </div>
                    <div className="edit submit" style={{
                        position:'absolute', 
                        bottom:'0px',
                        right:'0px'
                    }}>
                        {this.state.is_owner && 
                        this.state.editable ? 
                        <div display="inline-block">  
                            <IconButton onClick={this.handleEdit} aria-label="Submit Changes" size="medium" variant="contained"><Check/></IconButton>
                            <Button onClick={this.handleEditCancel} aria-labelledby="Cancel Changes" startIcon={<Close/>} variant="contained" style={{
                                paddingLeft:'5px'
                            }}>Cancel</Button>
                        </div>
                        : <Button onClick={this.handleEdit} startIcon={<EditOutlined/>} aria-labelledby="Edit Information" size="medium" variant="contained">Edit</Button>
                        }
                    </div>
                </div>
            </Box></>
        );
    }

    render() {
        const style = {
            position: 'fixed',
            top: '25%', 
            left: '50%', 
            transform: 'translate(-50%,0)', 
            width: '90%',
            bgcolor: 'background.paper',  
            boxShadow: 24, 
            p: 4
        }
        return (
            <>
                <Button onClick={this.handleOpen}> <Avatar src={this.state.member_info.img_url}/> </Button>
                <Dialog
                open={this.state.show}
                onClose={this.handleClose}
                aria-labelledby="profile-page-label"
                aria-describedby="profile-page-text"
                >
                    <DialogContent>
                        {this.renderProfilePage(style)}
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

export default ProfilePageModal;