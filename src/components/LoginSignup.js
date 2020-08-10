import React, { Component, useCallback } from 'react';
import Login from './login'
import Signup from './signup'

//bootstrap imports
import { Form, Button, Container, Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap'

const radios = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
];

class LoginSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            newvisitor: 'No'
        }
        console.log(this.state.newvisitor)
    }

    render() {
        console.log(this.state.newvisitor)
        return (
            <div>
                <Container fluid="xl">
                    <Row>
                        <Col>
                            <div>
                                <Form>
                                    <Form.Label>New here?</Form.Label>
                                    <br />
                                    <ButtonGroup toggle>
                                        {radios.map((radio, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                type="radio"
                                                variant="outline-dark"
                                                name="radio"
                                                value={radio.value}
                                                checked={this.state.newvisitor === radio.value}
                                                onChange={(e) => this.setState({ newvisitor: e.currentTarget.value })}
                                            >
                                                {radio.name}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup>

                                    {this.state.newvisitor === "No" ?

                                        <Login />

                                        :

                                        <Signup />
                                    }
                                    
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LoginSignup;