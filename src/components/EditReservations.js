// import React from 'react';
import React, { useState, useCallback, useContext } from "react";
import { Firebase, firedb } from "../firebase";
import { Form, Button, Container, Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap'
import Home from './Home'


const EditReservations = (props) => {
    const [name, setName] = useState(props.name)
    const [date, setDate] = useState(props.date)
    const [hotel, setHotel] = useState(props.hotel)
    const [numberofpeople, setNumberofpeople] = useState(props.numberofpeople)
    const [time, setTime] = useState(props.time)
    const [cancel, setCancel] = useState(false)

    console.log(props.id)

    const handleEdit = () => {
        const details = {
            name: name,
            Date: date,
            Time: time,
            email: props.email,
            Numberofpeople: numberofpeople,
            Hotel: hotel
        };
        console.log(details)

        try {
            firedb
                .collection("reservations")
                .doc(props.id)
                .set(details)
                .then(res => {
                    console.log("edited!")
                    setCancel(true)
                })
                
            
        } catch (error) {
            alert(error);
        }
    }

    if(cancel) {
        return (
            <Home />
        )
    }

    return (
        <div style={{ width: "50%", marginLeft: "25%", marginTop: "5%"}}>
            <h1 >Edit your reservation here</h1>
            <Button style={{ backgroundColor: "#F72A1F"}} onClick={() => setCancel(true)}>Cancel</Button>

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

            <Button variant="primary" type="submit" size="lg" onClick={handleEdit} block style={{ backgroundColor: "#F72A1F"}}>
                Edit
            </Button>
        </div>
    );
};

export default EditReservations;