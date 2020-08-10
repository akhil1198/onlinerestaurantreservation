import React, { useEffect, useContext, useState } from 'react';
import {
    makeStyles,
    ThemeProvider,
    createMuiTheme,
    withStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import AccountDropdown from './AccountDropdown';
import { AuthContext } from '../auth/AuthContext'
import clsx from 'clsx';
import Home from './Home';
import Reservation from './Reservation'
import { Firebase, firedb } from '../firebase'


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, 
    },
    toolbarIcon: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        backgroundColor: 'white',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color: 'black',
    },
    menuButtonHidden: {
        display: 'none',
        color: 'black',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        color: 'black',
        backgroundColor: 'white',
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(5),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const StyledListItem = withStyles({
    root: {
        color: '#828282',
        height: 48,
        '&.Mui-selected': {
            backgroundColor: '#FFE8E9',
            color: 'black',
            borderLeft: '3px solid #F72A14',
            fontWeight: 'bolder',
            '&:hover': {
                backgroundColor: '#FFE8E9',
                color: 'black',
            },
        },
        fontWeight: 'bolder',
    },
    label: {
        textTransform: 'capitalize',
    },
    // selected: {
    //   borderLeft: 10,
    //   color: "red",
    //   "&:hover": {
    //     color: "black",
    //     backgroundColor: orange[100],
    //   },
    //   height: 55,
    //   fontSize: 25,
    //   fontWeight: "bold",
    // },
})(ListItem);

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ffffff',
            main: '#ffffff',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#0066ff',
            main: '#9B282A',
            contrastText: '#ffffff',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});


export default function Sidebar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = React.useState('Home');
    const admin = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    console.log(admin)

    useEffect(() => {
        firedb
            .collection("users")
            .where("email", '==', `${admin.admin.email}`)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    setUsername(doc.data().username)
                    setPhone(doc.data().ph_number)
                    setEmail(doc.data().email)
                })
            })
    })


    const mainListItems = (
        <ThemeProvider theme={theme}>
            <div>
                <StyledListItem
                    button
                    onClick={() => {
                        setTitle('Home');
                    }}
                    selected={title === 'Home'}
                >
                    <Tooltip title='Home' placement='right-start' arrow>
                        <ListItemIcon>
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary='Home' />
                </StyledListItem>
                <StyledListItem
                    button
                    style={{ marginTop: "3%" }}
                    onClick={() => {
                        setTitle('Make a reservation');
                    }}
                    selected={title === 'Make a reservation'}
                >
                    <Tooltip title='Add Student' placement='right-start' arrow>
                        <ListItemIcon>

                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary='Make a reservation' />
                </StyledListItem>
            </div>
        </ThemeProvider>
    );

    const handleLogoutDropDown = () => {
        setTitle('Logout');
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='absolute'
                    className={clsx(classes.appBar, open && classes.appBarShift)}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge='start'
                            color='#000000'
                            aria-label='open drawer'
                            onClick={handleDrawerOpen}
                            className={clsx(
                                classes.menuButton,
                                open && classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component='h1'
                            variant='h6'
                            color='black'
                            noWrap
                            className={classes.title}
                        >
                            <b style={{ color: "black" }}>{title}</b>
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AccountDropdown
                                name={username}
                                handleLogout={handleLogoutDropDown}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <ThemeProvider theme={theme}>
                    <Drawer
                        variant='permanent'
                        classes={{
                            paper: clsx(
                                classes.drawerPaper,
                                !open && classes.drawerPaperClose
                            ),
                        }}
                        open={open}
                    >
                        <List style={{ marginTop: "15%" }}>{mainListItems}</List>
                    </Drawer>
                </ThemeProvider>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth='lg' className={classes.container}>
                        <RenderComponent component={title} />
                    </Container>
                </main>
            </div>
        </div>
    );
}

function RenderComponent(props) {
    const componentMap = {
        "Home": <Home />,
        "Make a reservation": <Reservation />,
    };
    return <div>{componentMap[props.component]}</div>;
}
