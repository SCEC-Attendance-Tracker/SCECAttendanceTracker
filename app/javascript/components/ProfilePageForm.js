import React from "react";
import {Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {Typography} from "@material-ui/core";

class ProfilePageForm extends React.Component {
    constructor(props) {
        super(props);
        const formValid = true;
        const error = "";
        this.state = {
            id: this.props.id,
            first_name: "",
            last_name: "", 
            description: ""
        }
    }

    componentDidMount() {
        console.log(this.state);
        fetch(`/api/v1/members/${this.state.id}`). 
          then((response) => response.json()). 
          then((member) => this.setState({...member}));
        this.render();
    }

    handleInputChange = (event) => { 
        console.log(this.state.member_test);   
        this.setState({"member_test": { [event.target.name]: event.target.value }});
        console.log(this.state);
    }

    handleValidation() {
        if(!this.state.first_name) {
            this.formValid = false;
            this.error = "First name cannot be empty";
            return;
        }

        if(!this.state.last_name) {
            this.formValid = false;
            this.error = "Last name cannot be empty";
            return;
        }

        this.formValid = true;
        this.error = "";
    }
    
    // CURRENTLY THROWS A 302, BUT IT WORKS
    updatePostRequest = (event) => {
        this.handleValidation();
        if (this.formValid) {
            const token = document.querySelector('[name=csrf-token]').content;
            fetch(`/api/v1/members/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token},
            redirect: 'manual'
            }).then((response) => {
                console.log(response);
            }).catch((error) => {console.error(error)});
            alert("Your profile has been updated.")
        } else {
            alert(this.error);
        }
      }

    render() {
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;
        const description = this.state.description;
        return (
            <>
                <div>
                    <Typography> 
                        Profile Settings: 
                    </Typography>
                    <TextField id="outlined" label="First Name" name="first_name" value={first_name} onChange={this.handleInputChange}/>
                    <TextField id="outlined" label="Last Name" name="last_name" value={last_name} onChange={this.handleInputChange}/>
                </div>
                <div>
                    <TextField id="outlined" label="Description" name="description" size='large' value={description} onChange={this.handleInputChange}/>
                </div>
                <div>
                    <Button onClick={this.updatePostRequest}>
                        Submit
                    </Button>
                </div>
            </>
        );
    }
}

export default ProfilePageForm;