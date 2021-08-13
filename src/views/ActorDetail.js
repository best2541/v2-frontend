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
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Input, Row, Col, Label } from "reactstrap";
import { useParams } from "react-router";
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

function ActorDetail() {
    require('dotenv').config()
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(<CircularProgress />)
    const userAccessToken = window.localStorage.getItem('userAccessToken')
    const [input, setInput] = useState({
        gender: 'male'
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
                    imgFile: result,
                    img: file.name
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

        await axios.post(`${process.env.REACT_APP_API}/content/actor/${id}`, {
            firstname: input.firstname, familyname: input.familyname, nationality: input.nationality, gender: input.gender, born: input.born
            , img: input.img, imgFile: input.imgFile
        }, {
            timeout: 20000
        })
            .then(
                window.location.reload()
            )
    }

    const getContentDetailById = async (id) => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/content/actor/${id}`)
        return data
    }

    const getData = async () => {
        const [contentDetail] = await Promise.all([
            getContentDetailById(id),
        ])
        setMovie(contentDetail[0])
    }
    useEffect(() => {
        getData()
    }, [])

    if (Object.keys(movie).length > 0 && userAccessToken) {

        function deleteUrl(event) {
            event.preventDefault()
            const sure = window.confirm('ต้องการลบ ?')
            if (sure === true) {
                axios.delete(`${process.env.REACT_APP_API}/content/actordelete/${movie.pointer}`).then((response) => {
                    alert('ลบเรียบร้อย!!')
                    return window.location.href = '/admin/actor'
                })
            }
        }

        function renderDeleteButton() {

            if (userAccessToken) {
                return (
                    <>
                        <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                        >
                            Edit Profile
                        </Button>
                        <Button className="btn-round" color="danger" onClick={deleteUrl}>Delete</Button>
                    </>
                )
            }
        }
        return (
            <>
                <div className="content">
                    <Form onSubmit={clickSubmit}>
                        <Row>
                            <Col md="12">
                                <Card className="">
                                    <Col className='container' md='6'>
                                        <div className="image">
                                            <img
                                                className='image2'
                                                alt="Have no Image"
                                                src={movie.imgUrl || require("assets/img/damir-bosnjak.jpg").default}
                                            />
                                        </div>
                                    </Col>
                                    <CardBody>
                                        <Input type="file" name="file" id="exampleFile" onChange={(event) => imgChange(event)} />
                                    </CardBody>
                                    <CardFooter>
                                        <div className="button-container">
                                            <Row>
                                                <Col className="md-12">
                                                    <FormGroup>
                                                        <label>ชื่อ</label>
                                                        <Input type='text' name='firstname' defaultValue={movie.firstname} onChange={(event) => inputChange(event)} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="md-6">
                                                    <FormGroup>
                                                        <label>สัญชาติ</label>
                                                        <Input type='text' name='nationality' defaultValue={movie.nationality} onChange={(event) => inputChange(event)} />
                                                    </FormGroup>
                                                </Col>
                                                <Col className='md-4'>
                                                    <FormGroup>
                                                        <label>เพศ</label>
                                                        <Input type="select" name="gender" defaultValue={movie.gender} onChange={inputChange}>
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
                                                    defaultValue={movie.born}
                                                    onChange={(event) => inputChange(event)}
                                                />
                                            </FormGroup>
                                        </div>
                                    </CardFooter>
                                </Card>
                                <div className="update ml-auto mr-auto">
                                    {renderDeleteButton()}
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </>
        );
    } else if (Object.keys(movie).length > 0) {
        return (
            <>
                <div className="content">
                    <Form onSubmit={clickSubmit}>
                        <Row>
                            <Col md="12">
                                <Card>
                                    <div className="image">
                                        <img
                                            className='image2'
                                            alt="Have no Image"
                                            src={movie.imgUrl || require("assets/img/damir-bosnjak.jpg").default}
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
                                                        <Input type='text' name='firstname' value={movie.firstname || ''} onChange={(event) => inputChange(event)} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="md-6">
                                                    <FormGroup>
                                                        <label>สัญชาติ</label>
                                                        <Input type='text' name='nationality' value={movie.nationality || ''} onChange={(event) => inputChange(event)} />
                                                    </FormGroup>
                                                </Col>
                                                <Col className='md-4'>
                                                    <FormGroup>
                                                        <label>เพศ</label>
                                                        <Input type="select" name="gender" value={movie.gender || ''} onChange={inputChange}>
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
                                                    value={movie.born || ''}
                                                    onChange={(event) => inputChange(event)}
                                                />
                                            </FormGroup>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='content'>
                    <div className="loading">
                        {loading}
                    </div>
                </div>
            </>
        )
    }
}

export default ActorDetail;
