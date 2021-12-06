import React from "react";
import {Button} from "@material-ui/core";
import {Box} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import FeedBackForm from "./FeedBackForm";
/**
 * Profile Page Component 
 * Written by Noah Miner
 * 
 * Renders a Box consisting of Member information. 
 * If current session member is looking at their own profile, 
 * it renders information like attendance points and due payment. 
 * 
 * Handles show, edit and delete.
 */

class ProfilePage extends React.Component {

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

    this.handleEdit = this.handleEdit.bind(this);
    this.setEditMemberInfo = this.setEditMemberInfo.bind(this);
    this.getMemberJSON = this.getMemberJSON.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  setEditMemberInfo(member) {
    this.setState({member_edit: member})
  }

  getMemberJSON() {
    if (this.state.is_owner) {
      fetch(`/api/v1/members/${this.state.member_info.id}`, {
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

  async handleEdit() {
    if (this.state.editable) {
      await this.updatePostRequest();
    } 

    this.setState({editable: !this.state.editable})
  }

  returnDuesStatement(paid_dues) {
    if (paid_dues) {
      return (
        <Typography id="">
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

  handleValidation() {
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

  // CURRENTLY THROWS A 302, BUT IT WORKS
  updatePostRequest() {
    this.handleValidation();

    if (this.state.formValid) {
      const token = document.querySelector('[name=csrf-token]').content;
      console.log(this.state.member_edit);
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
        console.log(json);
      }).catch((error) => {console.error(error)});
    } else {
      alert(this.state.error);
    }
  }
   
  /*getRSVPs = () => {
    const url = "api/v1/events/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => message.error("Error: " + err));
  };*/
  
  /*
  getAttendances = () => {
    fetch(`/api/v1/attendances/`, {
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then(data => {
      var member = this.state.member_edit;
      console.log(data);
      
      for (var e in data) {
        var row = data[e];
        console.log(row);
        
        
        if ((member.id  == row.member_id) && row.rsvp) {
          //arr.push(row.event_id);
        }
        
      }
    })
  }
  
  getRSVPs = () => {
    fetch(`/api/v1/events/`, {
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then(data => {
      var member = this.state.member_edit;
      var eventsRSVPd = [];
      
      console.log(data);
      this.getAttendances();
      
      console.log(eventsRSVPd);
      
      for (var e in data) {
        var row = data[e];
        
        console.log(row);
        
      }
    })
  }
  */
  
  render() {
    const paid_dues = false;//this.state.member_info.paid_dues;
    var first_name = this.state.member_edit.first_name;
    var last_name = this.state.member_edit.last_name;
    var description = this.state.member_edit.description;
    
    const style = {
      position: 'absolute', 
      top: '25%', 
      left: '50%', 
      transform: 'translate(-50%, 0%)', 
      width: 600, 
      bgcolor: 'background.paper',  
      boxShadow: 24, 
      p: 4
    }
    return (
      <>
      <Box sx={style}>
        <div className="icon-name-edit">
          <div className="name" style={{width:'60%'}}>
            {this.state.editable ? 
            <>
            <TextField id="outlined" label="First Name" name="first_name" value={first_name} onChange={this.handleInputChange}/>
            <TextField id="outlined" label="Last Name" name="last_name" value={last_name} onChange={this.handleInputChange}/>
            </>
            : 
            <Typography id="profile-page-label" variant="h3" component="h2" >
              {this.state.member_info.first_name} {this.state.member_info.last_name}
            </Typography>
            }
          </div>
          
        </div>
        
        <div className="email">
          <Typography id="profile-page-label" variant="overline" component="h2">
            Email:
          </Typography>
          <Typography id="profile-page-text" sx={{ mt: 2 }}>
            {this.state.member_info.email}
          </Typography>
        </div>
        
        <div className="description">
          {this.state.editable ? 
          <TextField id="outlined" label="Description" name="description" size='medium' value={description} onChange={this.handleInputChange}/>
          :
          <>
          <Typography id="profile-page-label" variant="overline" component="h2">
            About Me:
          </Typography>
          <Typography id="" sx={{ mt: 2 }}>
            {this.state.member_info.description}
          </Typography>
          </>
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
        
        <div className="paid-dues">
          {this.state.is_owner ?
            <Typography id="profile-page-label" variant="overline"> 
              Paid Dues? 
            </Typography> : ""}
          {this.state.is_owner ? 
            this.returnDuesStatement(paid_dues) : ""}
        </div>
        
        
        
        {this.state.is_owner &&
          <div className="edit" style={{width:'40%'}} display="inline-block">
            <Button onClick={this.handleEdit}> {this.state.editable ? "Submit" : "Edit"} </Button>
            {this.state.editable ? "" : <Button onClick={this.handleDelete}>Delete Profile</Button>}
          </div>
        }
      </Box></>
    );
  }
}

export default ProfilePage
