import React, { useState, useCallback, useContext } from "react";
import { Firebase, firedb } from "../firebase";
import { AuthContext } from "../auth/AuthContext";
import { Form, Button, Container, Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap'


const Reservation = (props) => {
    const admin = useContext(AuthContext);
    const [name, setName] = useState()
    const [date, setDate] = useState()
    const [hotel, setHotel] = useState()
    const [numberofpeople, setNumberofpeople] = useState()
    const [time, setTime] = useState()

    console.log(admin.admin.email)

    console.log(props.id)

    const handleAdd = () => {
        const details = {
            name: name,
            Date: date,
            Time: time,
            email: admin.admin.email,
            Numberofpeople: numberofpeople,
            Hotel: hotel
        };
        try {
            firedb
                .collection("reservations")
                .add(details)
                .then(response => {
                    console.log(response.id)
                    alert(`Successfully made a reservation at ${hotel} for ${numberofpeople} people at ${time} on ${date}!`)
                    console.log("added!")
                    window.location.href="/home"
                });

        } catch (error) {
            alert(error);
        }
    }

    return (
        <div style={{ width: "50%", marginLeft: "25%", marginTop: "5%" }}>
            <h1 >Make your reservation here</h1>

            <Form.Group controlId="formBasicName" style={{ marginTop: "7%" }}>
                <Form.Label style={{ fontSize: "25px" }}>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(event) => {
                    setName(event.target.value)
                }} />
            </Form.Group>
           
            <Form.Group controlId="formBasicNumber">
                <Form.Label style={{ fontSize: "25px" }}>Number of people</Form.Label>
                <Form.Control type="number" placeholder="Enter number of people" value={numberofpeople} onChange={(event) => {
                    setNumberofpeople(event.target.value)
                }} />
            </Form.Group>
            <Form.Group controlId="formBasicHotel">
                <Form.Label style={{ fontSize: "25px" }}>Hotel</Form.Label>
                <Form.Control type="text" placeholder="Enter hotel" value={hotel} onChange={(event) => {
                    setHotel(event.target.value)
                }} />
            </Form.Group>
            <Form.Group controlId="formBasicDate">
                <Form.Label style={{ fontSize: "25px" }}>Date</Form.Label>
                <Form.Control type="text" placeholder="Enter date" value={date} onChange={(event) => {
                    setDate(event.target.value)
                }} />
            </Form.Group>
            <Form.Group controlId="formBasicTime">
                <Form.Label style={{ fontSize: "25px" }}>Time</Form.Label>
                <Form.Control type="text" placeholder="Enter time" value={time} onChange={(event) => {
                    setTime(event.target.value)
                }} />
            </Form.Group>

            <Button variant="primary" type="submit" size="lg" onClick={handleAdd} block style={{ backgroundColor: "#F72A1F" }}>
                Make Reservation
            </Button>
        </div>
    );
};

export default Reservation;