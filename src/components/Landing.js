import React, { Fragment, useState, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext'
import LoginSignup from './LoginSignup'

// Package Imports
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

// Icon & Placeholders Imports
import Reception from '../placeholders/reception.jpg'
import BackIcon from '../placeholders/BackIcon.png';

// Material-UI Imports
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Firebase, firedb } from '../firebase'

import { Tab } from 'semantic-ui-react'

// Styling Landing Page
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        marginTop: theme.spacing(15),
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(10),
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heading: {
        paddingTop: theme.spacing(3),
        // paddingBottom: theme.spacing(5),
    },
    buttons: {
        width: '400px',
    },
    backButton: {
        marginTop: theme.spacing(3),
    },
    submitButton: {
        marginTop: theme.spacing(3),
    },
    textFields: {
        marginBottom: theme.spacing(3),
    },
    icons: {
        color: '#fff',
    },
}));

export const Landing = () => {
    const classes = useStyles();
    return (
        <div>
            <Grid container component='main' className={classes.root}>
                <CssBaseline />
                <Hidden smDown>
                    <Grid
                        md={8}
                    >
                        <img src={Reception} alt='overlay' style={{ maxHeight: "100%", maxWidth: "120%", overflow: "hidden" }} />
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={12} md={4} component={Paper} elevation={6} >
                    <div className={classes.paper} style={{ marginTop: "30%" }}>
                        <Typography variant='h3'>
                            <Box fontWeight={800}>
                                Online Hotel Reservation
                                </Box>
                        </Typography>
                        <div className={classes.buttons}>
                            <Fragment>
                                <Typography
                                    variant='h5'
                                    align='center'
                                    className={classes.heading}
                                    style={{ marginBottom: "12%" }}
                                >
                                    <Box >Enter your details to Log In</Box>
                                </Typography>
                                <Container maxWidth='xl'>
                                    <LoginSignup />
                                </Container>
                            </Fragment>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
