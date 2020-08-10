import React, { useContext, useEffect, useState } from 'react';
import { Firebase, firedb } from '../firebase'
import { AuthContext } from '../auth/AuthContext'
import EditReservations from '../components/EditReservations'

//material-ui imports
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Divider } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardMedia: {
        paddingTop: "56.25%",
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    redDot: {
        height: 20,
        width: 20,
        backgroundColor: "red",
        borderRadius: "50%",
        display: "inline-block",
    },
    yellowDot: {
        height: 20,
        width: 20,
        backgroundColor: "yellow",
        borderRadius: "50%",
        display: "inline-block",
    },
    greenDot: {
        height: 20,
        width: 20,
        backgroundColor: "green",
        borderRadius: "50%",
        display: "inline-block",
    },
}));

var temp = [];

function Home(props) {
    const classes = useStyles();
    const admin = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [Hotel, setHotel] = useState('')
    const [numberofpeople, setNumberofpeople] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [email, setEmail] = useState('')
    const [reservations, setReservations] = useState([])
    const [id, setId] = useState()
    const [edit, setEdit] = useState(false)

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

        firedb
            .collection("reservations")
            .where("email", '==', `${admin.admin.email}`)
            .get()
            .then((snapshot) => {
                const newData = []
                snapshot.forEach(doc => {
                    newData.push(({ ...doc.data(), id: doc.id }));
                    console.log(newData)
                })
                setReservations(newData)
            })
    }, [])
    console.log(temp)
    console.log(reservations)

    const handleDelete = (id) => {
        firedb
            .collection("reservations")
            .doc(id)
            .delete()
            .then(res => {
                console.log("deleted")
                alert("Reservation Deleted!")
                window.location.href = "/home"
            })
    }

    if (edit) {
        return (
            <EditReservations name={username} email={email} hotel={Hotel} numberofpeople={numberofpeople} date={date} time={time} id={id} />
        )
    }

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <center>
                    <h1 style={{ margin: "3%", marginBottom: "-2%" }}>Welcome, {username}</h1>
                    <h1 style={{ margin: "3%", marginBottom: "-2%" }}>Find all your reservations here</h1>
                </center>
                <main>
                    <Container className={classes.cardGrid} maxwidth="md">
                        <Grid container spacing={4} className="w3-animate-bottom">
                            {reservations.map((car) => (
                                <Card className={classes.card} key={car.id} style={{ margin: "3%" }}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {car.name}
                                        </Typography>
                                        <Divider />
                                        <Typography variant="overline" style={{ color: "grey" }}>
                                            {car.email}
                                        </Typography>
                                        <br></br>
                                        <Typography variant="overline" style={{ color: "grey" }}>
                                            {car.Numberofpeople}
                                        </Typography>
                                        <br></br>
                                        <Typography variant="overline" style={{ color: "grey" }}>
                                            {car.Hotel}
                                        </Typography>
                                        <br></br>
                                        <Typography variant="overline" style={{ color: "grey" }}>
                                            {car.Time}
                                        </Typography>
                                        <br></br>
                                        <Typography variant="overline" style={{ color: "grey" }}>
                                            {car.Date}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => {
                                                setEdit(true)
                                                setId(car.id)
                                                setTime(car.Time)
                                                setUsername(car.name)
                                                setEmail(car.email)
                                                setNumberofpeople(car.Numberofpeople)
                                                setDate(car.Date)
                                                setHotel(car.Hotel)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => { handleDelete(car.id) }}
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Grid>
                    </Container>
                </main>
            </React.Fragment>
        </div>
    );
}

export default Home;