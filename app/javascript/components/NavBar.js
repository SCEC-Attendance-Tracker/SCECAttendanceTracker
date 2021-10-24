import * as React from 'react'
import { useHistory, MemoryRouter as Router } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core'

import { withStyles } from '@material-ui/core'
import { createTheme, ThemeProvider } from "@material-ui/core"

import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
	
	
const home = "SCEC Portal"

const theme = createTheme({   
	palette: {      
		primary: {         
			main: "#500000" // Maroon
		},      
		secondary: {         
			main: "#ffff33" // Yellow               
		}            
	},fontFamily: 'Roboto Mono'
});

const useStyles = makeStyles({
	title: {
		flex: '1',
		width: '100%'
	},
	button: {
		backgroundColor: '#500000',
		color: '#fff',
		padding: '1em', 
		paddingTop: '0.5em', 
		paddingBottom: '0.5em',
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
		}
	},
	iconButton: {
		backgroundColor: '#500000',
		color: '#fff',
		borderRadius: '100%',
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
		}
	},
})

export default function NavBar(props) {
		
		const classes = useStyles()
		
		var page_name = props.props.page;
		var member;
		
		if (props.props.member != undefined) {
			member = props.props.member[0]
		}
		
		const [auth, setAuth] = React.useState(true);
		const [anchorEl, setAnchorEl] = React.useState(null);
		
		const handleChange = (event) => {
			setAuth(event.target.checked);
		};
		
		const handleMenu = (event) => {
			setAnchorEl(event.currentTarget);
		};
		
		const handleClose = () => {
			setAnchorEl(null);
		};
		
		const history = useHistory();
		
		return (
			<ThemeProvider theme={theme}>
			<AppBar position="static">
				<Toolbar>
				
				{ page_name != home && 
						<IconButton
							color="inherit"
							className={classes.iconButton}
							href="/"
						>
							<ArrowBackIcon />
						</IconButton>
				}
				
				<Typography 
				variant="h6"
				className={classes.title}
				>
					{page_name}
				</Typography>
				
				{/* if logged in, present member info */}
				{ (member != undefined) &&
					<Button href={"/members/"+member.id} color="inherit" className={classes.button}>{member.first_name}</Button>
				}
				{/* if not logged in, present sign in button */}
				{ (member == undefined) &&
					<Button href="/members/auth/google_oauth2" color="inherit" className={classes.button} >Sign In</Button>
				}
				
				<div>
					<Router>
					<IconButton
						color="inherit"
						aria-label="menu"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						className={classes.iconButton}
					>
						<MenuIcon />
					</IconButton>
					
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						{ (member != undefined) && 
							<Link href={"/members/"+member.id}>
								<MenuItem>Profile</MenuItem>
							</Link>
						}
						<Link href={"/events"}>
							<MenuItem>Events</MenuItem>
						</Link>
						
						{ (member != undefined) && (member.admin) &&
							<Link href={"/attendances"}>
								<MenuItem>Attendances</MenuItem>
							</Link>
						}
						{ (member != undefined) && (member.admin) &&
							<Link href={"/members"}>
								<MenuItem>Members</MenuItem>
							</Link>
						}
						{ (member != undefined) &&
							<Link href="/members/sign_out">
								<MenuItem>Sign Out</MenuItem>
							</Link>
						}
						{ (member == undefined) &&
							<Link href="/members/auth/google_oauth2">
								<MenuItem>Sign In</MenuItem>
							</Link>
						}
					</Menu>
					</Router>
				</div>
				
				</Toolbar>
			</AppBar>
			</ThemeProvider>
		);
		
};

//export default NavBar;