import React, { useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Firebase, firedb } from "../firebase";
import { AuthContext } from "../auth/AuthContext";
import { Form, Button, Container, Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap'

var name
var number
var email
var password

const SignUp = () => {

    const handleSignUp = (e) => {
        e.preventDefault()
        const details = {
            username: name,
            ph_number: number,
            email: email,
            password: password,
        };
        console.log(details)
        try {
            Firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(response => {

                    console.log(response)
                    console.log("ook")
                    firedb
                        .collection("users")
                        .add(details)
                        .then((doc) => {
                            console.log(doc.id);
                            window.location.href = "/home"
                        })
                        .catch((err) =>
                            console.log("error adding user to firebase: ", err)
                        );

                })
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            <Form.Group controlId="formBasicName" style={{ marginTop: "13%" }}>
                <Form.Label style={{ fontSize: "25px" }}>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(event) => {
                    name = event.target.value
                }} />

            </Form.Group>
            <Form.Group controlId="formBasicNumber">
                <Form.Label style={{ fontSize: "25px" }}>Phone Number</Form.Label>
                <Form.Control type="number" placeholder="Enter number" value={number} onChange={(event) => {
                    number = event.target.value
                }} />

            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ fontSize: "25px" }}>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => {
                    email = event.target.value
                }} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label style={{ fontSize: "25px" }}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => {
                    password = event.target.value
                }} />
                <Form.Text className="text-muted">
                    PASSWORD MUST BE 6 CHARACTERS LONG!
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" size="lg" onClick={(e) => { handleSignUp(e) }} block style={{ backgroundColor: "#F72A1F" }}>
                Sign Up
            </Button>
        </div>
    );
};

export default SignUp;