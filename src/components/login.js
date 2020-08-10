import React, { useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Firebase } from "../firebase";
import { AuthContext } from "../auth/AuthContext";

import { Form, Button, Container, Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap'

var email
var password

const Login = ({ history }) => {
    const currentUser = useContext(AuthContext);
    console.log(currentUser)


    const handleLogin = useCallback(
        async event => {
            event.preventDefault();

            try {
                await Firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(response => {

                        console.log(response)
                        console.log("ook")
                        
                        window.location.href = "/home"
                    })
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );


    return (
        <div>
            <Form.Group controlId="formBasicEmail" style={{ marginTop: "13%" }}>
                <Form.Label style={{ fontSize: "25px"}}>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => {
                    email = event.target.value
                }} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label style={{ fontSize: "25px"}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => {
                    password = event.target.value
                }} />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg" onClick={handleLogin} block style={{ backgroundColor: "#F72A1F"}}>
                Login
            </Button>


        </div>
    );
};

export default withRouter(Login);