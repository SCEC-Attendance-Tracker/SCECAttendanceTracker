import React from "react";
import {Button} from "@material-ui/core";
import {Modal} from "@material-ui/core";
import ProfilePage from "./ProfilePage";
import DialogContent from '@material-ui/core/DialogContent';
import ProfilePageForm from "./ProfilePageForm";

/**
 * ProfilePageModal 
 * Written By: Noah Miner
 * 
 * Renders a button that when clicked renders a modal
 * consisting of the ProfilePage component.
 */

class ProfilePageModal extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            member_info: this.props.member, 
            is_owner: this.props.is_owner, 
            show: false
        };
    }

    componentDidMount() {
        this.render(); 
    }

    handleOpen = e => {
        e.preventDefault();
        this.setState({show: true})
    }
    
    handleClose = () => {
        this.setState({show: false})
    }

    render() {
        const style = {
            position: 'absolute', 
            top: '25%', 
            left: '50%', 
            transform: 'translate(-50%, 0%)', 
            width: 400, 
            color: 'white',
            bgcolor: 'background.paper',  
            boxShadow: 24, 
            p: 4
        }
        return (
            <>
                <Button onClick={this.handleOpen}> My Profile </Button>
                <Modal
                open={this.state.show}
                onClose={this.handleClose}
                aria-labelledby="profile-page-label"
                aria-describedby="profile-page-text"
                >
                    <DialogContent>
                        <ProfilePage {...this.props}/>
                    </DialogContent>
                </Modal>
            </>
        );
    }
}

export default ProfilePageModal;