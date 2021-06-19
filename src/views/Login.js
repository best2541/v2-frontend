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
import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button, CardTitle, Form, FormGroup, Label, Input } from "reactstrap";


function Map() {
  return (
    <>
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="5">
            <Card className="card-upgrade">
              <CardHeader className="text-center">
              
                <p className="card-category">

                </p>
              </CardHeader>
              <CardBody>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">ID</Label>
                    <Input type="text" name="username" id="exampleEmail" placeholder="username" />
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">PASSWORD</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password" />
                  </FormGroup>
                  <Button>Submit</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
