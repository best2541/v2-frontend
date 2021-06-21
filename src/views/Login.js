/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import axios from "axios";
import React, { useState } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button, CardTitle, Form, FormGroup, Label, Input, UncontrolledAlert } from "reactstrap";


function Map() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [loginFailStatatus, setLoginFailStatus] = useState(null)

  async function auth(event) {
    event.preventDefault()
    await axios.post('https://movie-search-backend.herokuapp.com/login/auth', {
      username,
      password
    }).then((response) => {
      setToken(response.data.accessToken)
      setLoginFailStatus(null)
    }).catch(error => {
      setLoginFailStatus(error.response.data.massage)
      return false
    })
  }

  const isLoginFail = () => {
    if (loginFailStatatus) {
      return <UncontrolledAlert color="danger" fade={true}>{loginFailStatatus}</UncontrolledAlert>
    }
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="5">
            <Card className="card-upgrade">
              <CardHeader className="text-center">
              </CardHeader>
              <CardBody>
                <Form inline onSubmit={auth}>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">ID</Label>
                    <Input type="text" name="username" id="exampleEmail" placeholder="username" onChange={event => setUsername(event.target.value)} />
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">PASSWORD</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password" onChange={event => setPassword(event.target.value)} />
                  </FormGroup>
                  <Button type='submit'>Submit</Button>
                </Form>
              </CardBody>
            </Card>
            {isLoginFail()}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
