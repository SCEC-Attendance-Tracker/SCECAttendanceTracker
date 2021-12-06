import * as React from 'react'
import { useHistory, MemoryRouter as Router } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'
import { makeStyles, Avatar } from '@material-ui/core'
import { createTheme, ThemeProvider } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ProfilePageModal from './ProfilePageModal'
import SCECLogo from '../../assets/images/apple-touch-icon.png' 

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
	root: {
		width: '100vw',
		margin: 0,
		marginTop: '-8px',
		marginLeft: '-8px',
	},
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
	menuItem: {
		'&:hover': {
			color: '#200000',
		}
	},
	logo: {
		marginRight: '10px'
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
			<AppBar position="static" className={classes.root}>
				<Toolbar>
				
				{ page_name == home && 
					<Avatar className={classes.logo} src={SCECLogo} variant='rounded' />
				}
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
				variant="h5"
				className={classes.title}
				>
					{page_name}
				</Typography>
				
				{/* if logged in, present member info */}
				{ (member != undefined) &&
					<ProfilePageModal member={member} is_owner={true}/>
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
						<Link href={"/events"}>
							<MenuItem className={classes.menuItem}>Events</MenuItem>
						</Link>
						<Link href={"/links"}>
							<MenuItem className={classes.menuItem}>Links</MenuItem>
						</Link>
						
						{ (member != undefined) && (member.admin) &&
							<Link href={"/attendances"}>
								<MenuItem className={classes.menuItem}>Attendances</MenuItem>
							</Link>
						}
						{ (member != undefined) && (member.admin) &&
							<Link href={"/members"}>
								<MenuItem className={classes.menuItem}>Members</MenuItem>
							</Link>
						}
						{ (member != undefined) && (member.admin) &&
							<Link href={"/feedbacks"}>
								<MenuItem className={classes.menuItem}>Feedback</MenuItem>
							</Link>
						}
						{ (member != undefined) &&
							<Link href="/help">
								<MenuItem className={classes.menuItem}>Help</MenuItem>
							</Link>
						}
						{ (member != undefined) &&
							<Link href="/members/sign_out">
								<MenuItem className={classes.menuItem}>Sign Out</MenuItem>
							</Link>
						}
						{ (member == undefined) &&
							<Link href="/members/auth/google_oauth2">
								<MenuItem className={classes.menuItem}>Sign In</MenuItem>
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