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
import React, { useEffect, useState } from "react";
import axios from 'axios'
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Label
} from "reactstrap";

function AddActor() {
    require('dotenv').config()
    const [input, setInput] = useState({
        imgFile: null, gender: 'male'
    })

    function inputChange(event) {
        const { name, value } = event.target;
        setInput((prevInput) => {
            return {
                ...prevInput,
                [name]: value
            };
        });
    }


    function imgChange(event) {
        const file = event.target.files[0];
        getBase64(file)
            .then(result => {
                setInput({
                    ...input,
                    img: result,
                    imgName: file.name
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    async function getBase64(file) {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    }

    async function clickSubmit(event) {
        event.preventDefault()
        console.log('input', input)
        await axios.post(`${process.env.REACT_APP_API}/content/insertactor`, {
            firstname: input.firstname, nationality: input.nationality, gender: input.gender, born: input.born
            , imgName: input.imgName, img: input.img
        }, {
            timeout: 20000
        })
            .then((res) => {
                alert(res.data.message)
            })
    }

    return (
        <>
            <div className="content">
                <Form onSubmit={clickSubmit}>
                    <Row>
                        <Col md="12">
                            <Card>
                                <div className='image'>
                                    <img
                                        className="image2"
                                        alt="..."
                                        src={input.img || require("assets/img/damir-bosnjak.jpg").default}
                                    />
                                </div>
                                <CardBody>
                                    <Input type="file" name="file" id="exampleFile" onChange={(event) => imgChange(event)} />
                                </CardBody>
                                <CardFooter>
                                    <div className="button-container">
                                        <Row>
                                            <Col className="md-12">
                                                <FormGroup>
                                                    <label>ชื่อ</label>
                                                    <Input type='text' name='firstname' placeholder='Name' onChange={(event) => inputChange(event)} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="md-6">
                                                <FormGroup>
                                                    <label>สัญชาติ</label>
                                                    <Input type='text' name='nationality' placeholder='Nationality' onChange={(event) => inputChange(event)} />
                                                </FormGroup>
                                            </Col>
                                            <Col className='md-4'>
                                                <FormGroup>
                                                    <label>เพศ</label>
                                                    <Input type="select" name="gender" placeholder='Gender' onChange={inputChange}>
                                                        <option>male</option>
                                                        <option>female</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <label>เกิดที่</label>
                                            <Input
                                                type="text"
                                                name='born'
                                                onChange={(event) => inputChange(event)}
                                            />
                                        </FormGroup>
                                    </div>
                                </CardFooter>
                            </Card>
                            <div className="update ml-auto mr-auto">
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    type="submit"
                                >
                                    New Profile
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}

export default AddActor;
