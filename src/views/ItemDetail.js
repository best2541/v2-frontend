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
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
// reactstrap components
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Input, Row, Col, Label } from "reactstrap";
import { useParams } from "react-router";
import TagsInput from '../components/TagsInput';
import '../assets/scss/App.scss';
import TagsInput2 from "components/TagsInput2";

function ItemDetail() {
    require('dotenv').config()
    const { id } = useParams()
    const userAccessToken = window.localStorage.getItem('userAccessToken')
    const [movie, setMovie] = useState({})
    const [movieCategories, setMovieCategories] = useState([])
    const [movieCountries, setMovieCountries] = useState([])
    const [selectedMovieCountry, setSelectedMovieCountry] = useState([])
    const [selectedMovieCategories, setSelectedMoiveCategories] = useState([])
    const [loading, setLoading] = useState(<CircularProgress />)
    const [input, setInput] = useState({
        id: '', img: '', imgFile: null, engName: '', thName: '', etcName: '', movieYear: 0, ep: '', disc: 0, category: [], serie: '', mainCharater: '', company: '', length: 0,
        pokerCompany: '', pokerName: '', pokerTell: 0, pokerEmail: '', copyrightStart: '', copyrightEnd: '', dubstatus: '', dubteam: '', dubname: '',
        dubfinish: '', story: '', recorder: '', recordStatus: ''
    })
    let dubDate = new Date(movie.dubfinish).toLocaleDateString()
    let copyStart = new Date(movie.copyrightStart).toLocaleDateString()
    let copyEnd = new Date(movie.copyrightEnd).toLocaleDateString()

    function categoryChange(event) {
        const { id, checked } = event.target
        const numberId = Number(id)
        const updatedArray = new Set([...selectedMovieCategories])
        if (checked === true) {
            updatedArray.add(numberId)
        } else {
            updatedArray.delete(numberId)
        }
        setSelectedMoiveCategories([...updatedArray])
    }

    function countryChange(event) {
        const { id, checked } = event.target
        const numberId = Number(id)
        const updatedArray = new Set([...selectedMovieCountry])
        if (checked === true) {
            updatedArray.add(numberId)
        } else {
            updatedArray.delete(numberId)
        }
        // console.log(updatedArray)
        setSelectedMovieCountry([...updatedArray])
    }

    function inputChange(event) {
        const { name, value } = event.target;
        setInput((prevInput) => {
            return {
                ...prevInput,
                [name]: value
            };
        });
    }

    // tags------------------------------------------------------------

    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState({});

    const changeHandler = (name, value) => {
        if (name === 'tags') {
            setTags(value);
            if (value.length > 0 && errors.tags) {
                setErrors(prev => {
                    const prevErrors = { ...prev };
                    delete prevErrors.tags;
                    return prevErrors;
                });
            }
        }
    }

    // end tags-------------------------------------------------------  ------------------------


    const getContentDetailById = async (id) => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/content/detail/${id}`)
        return data
    }

    const getCategories = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/content/categories`)
        return data
    }

    const getCountries = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/content/countries`)
        return data
    }
    const getActors = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/content/actor/detail/${id}`)
        return data
    }

    const getData = async () => {
        const [contentDetail, categories, countries, actors] = await Promise.all([
            getContentDetailById(id),
            getCategories(),
            getCountries(),
            getActors()
        ])
        setTags(actors)
        setMovie(contentDetail[0])
        setMovieCategories(categories)
        setMovieCountries(countries)
        setSelectedMoiveCategories(contentDetail[0].categories.map(category => category.id))
        setSelectedMovieCountry(contentDetail[0].country.map(country => country.id))
    }
    useEffect(() => {
        getData()
    }, [])
    async function getBase64(file) {
        return new Promise(resolve => {
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

    const a = setTimeout(() => {
        setLoading(<h3>Not Found</h3>)
    }, [5000])

    //dropdown
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for (let x = 1900; x <= thisYear; x++) {
        allYears.push(x)
    }

    const yearList = allYears.map((x) => { return (<option key={x}>{x}</option>) });


    async function clickSubmit(event) {
        event.preventDefault()
        await axios.put(`${process.env.REACT_APP_API}/content/edit/${id}`, {
            id: input.id, img: input.img, imgFile: input.imgFile, engName: input.engName,
            thName: input.thName, etcName: input.etcName, movieYear: input.movieYear, ep: input.ep,
            disc: input.disc, category: selectedMovieCategories, serie: input.serie, mainCharater: tags,
            company: input.company, pokerCompany: input.pokerCompany, pokerName: input.pokerName, pokerTell: input.pokerTell,
            pokerEmail: input.pokerEmail, copyrightStart: input.copyrightStart, copyrightEnd: input.copyrightEnd, dubstatus: input.dubstatus,
            dubteam: input.dubteam, dubname: input.dubname, dubfinish: input.dubfinish, recorder: input.recorder, recordStatus: input.recordStatus,
            story: input.story, length: input.length, country: selectedMovieCountry, location: input.location
        }, {
            timeout: 9000
        })
        return window.location.href = `/admin/category/item/${id}`
    }


    if (Object.keys(movie).length > 0 && userAccessToken) {
        const renderCategory = movie.categories.map(category => {
            return category.name
        })
        const renderMovieCategories = movieCategories.map(category => {
            const isActive = movie.categories.find(element => element.id === category.id)
            return (
                <>
                    <input type="checkbox" id={category.id} name="category" value={category.id} key={category.id} defaultChecked={isActive} onChange={categoryChange} />
                    <label className='px-1' for={category.name}>{category.name}</label>
                </>
            )
        })
        const renderMovieCountry = movieCountries.map(country => {
            const isActive = movie.country.find(element => element.id === country.id)
            return (
                <>
                    <input type="checkbox" id={country.id} name={country.name} defaultChecked={isActive} onChange={countryChange} />
                    <label className='pr-1 pl-1' for={country.name}>{country.name}</label>
                </>
            )
        })
        const clickDelete = async () => {
            const sure = window.confirm('DELETE ?')
            if (sure === true) {
                await axios.delete(`${process.env.REACT_APP_API}/content/delete/${id}`
                    , {
                        timeout: 9000
                    })
                alert('DELETED!!')
                return window.location.href = `/admin/category`
            }
        }

        function renderButton() {
            if (userAccessToken) {
                return (
                    <>
                        <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                        >
                            Update Profile
                        </Button>
                        <Button className="btn-round" color="danger" onClick={clickDelete}>Delete</Button>
                    </>
                )
            }
        }

        //serie
        function isSerieIsSerie() {
            if (movie.serie == 'ซีรี่ย์')
                return true
        }
        function isSerieIsMovie() {
            if (movie.serie == 'ม้วนเดียว') {
                return true
            }
        }

        function renderbox1() {
            if (userAccessToken) {
                return (
                    <Card className="">
                        <div className="image">
                            <a href={movie.imgUrl} target='_blank'>
                                <img
                                    alt="Have no upload image"
                                    src={movie.imgUrl || require("assets/img/damir-bosnjak.jpg").default}
                                />
                            </a>
                        </div>
                        <CardBody>
                            <Input type="file" name="file" id="exampleFile" onChange={imgChange} />
                        </CardBody>
                        <CardFooter>
                            <div className="button-container">
                                <Row>
                                    <Col className="md-2">
                                        <label>ผู้บันทึก</label>
                                        <Input type='text' name='recorder' defaultValue={movie.recorder} onChange={inputChange} />
                                    </Col>
                                    <Col className='md-2'>
                                        <label>สถานะ</label>
                                        <Input type='text' name='recordStatus' defaultValue={movie.recordStatus} onChange={inputChange} />
                                    </Col>
                                </Row>
                            </div>
                        </CardFooter>
                    </Card>
                )
            }
        }

        function renderbox2() {
            if (userAccessToken) {
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle><h5 className='bold'>Broker</h5></CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    <label>
                                        บริษัทผู้ขาย
                                    </label>
                                    <Input type='text' name='pokerCompany' defaultValue={movie.pokerCompany} onChange={inputChange} />
                                </Col>
                                <Col>
                                    <label>
                                        ชื่อผู้ติดต่อ
                                    </label>
                                    <Input type='text' name='pokerName' defaultValue={movie.pokerName} onChange={inputChange} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>
                                        เบอร์โทร
                                    </label>
                                    <Input type='tel' name='pokerTell' defaultValue={movie.pokerTell} onChange={inputChange} />
                                </Col>
                                <Col>
                                    <label>
                                        อีเมล
                                    </label>
                                    <Input type='email' name='pokerEmail' defaultValue={movie.pokerEmail} onChange={inputChange} />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                )
            }
        }

        function renderbox3() {
            if (userAccessToken) {
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h5 className='bold'>Copyright</h5>
                            </CardTitle>
                            <CardBody>
                                <Row className='content'>
                                    <Col>
                                        {renderMovieCountry}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='md-2'>
                                        <label>ตั้งแต่:{copyStart}</label>
                                        <Input type='date' name="copyrightStart" defaultValue={copyStart} onChange={(event) => {
                                            event.value = new Date(event).toLocaleDateString()
                                            inputChange(event)
                                        }} />
                                    </Col>
                                    <Col className='md-2'>
                                        <label>ถึง:{copyEnd}</label>
                                        <Input type='date' name="copyrightEnd" onChange={(event) => {
                                            event.value = new Date(event).toLocalString()
                                            inputChange(event)
                                        }} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </CardHeader>
                    </Card>
                )
            }
        }

        function renderbox4() {
            if (userAccessToken) {
                return (
                    <Card className="card-user">
                        <CardHeader>
                            <CardTitle><h5 className='bold'>Edit Profile</h5></CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <FormGroup>
                                        <label>รหัส</label>
                                        <Input
                                            name='id'
                                            placeholder="Code"
                                            type="text"
                                            defaultValue={movie.id}
                                            onChange={inputChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="6">
                                    <FormGroup>
                                        <label>*ชื่ออังกฤษ</label>
                                        <Input
                                            name='engName'
                                            placeholder="*Eng Name"
                                            type="text"
                                            defaultValue={movie.engName}
                                            required
                                            onChange={inputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <FormGroup>
                                        <label>
                                            ชื่อไทย
                                        </label>
                                        <Input
                                            name='thName'
                                            placeholder="Th Name"
                                            type="text"
                                            defaultValue={movie.thName}
                                            onChange={(event) => inputChange(event)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="6">
                                    <FormGroup>
                                        <label>
                                            ชื่ออื่นๆ
                                        </label>
                                        <Input
                                            name='etcName'
                                            placeholder="Etc Name"
                                            type="text"
                                            defaultValue={movie.etcName}
                                            onChange={(event) => inputChange(event)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="4">
                                    <FormGroup>
                                        <label>ปีของหนัง(ค.ส.)</label>
                                        <Input type="select" name="movieYear" defaultValue={movie.movieYear} onChange={inputChange}>
                                            {yearList}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col className="px-1" md="4">
                                    <FormGroup>
                                        <label>จำนวนตอน</label>
                                        <Input
                                            type="number" name="ep" id="exampleSelect" defaultValue={movie.ep} min='0' max='999'
                                            onChange={inputChange}>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="4">
                                    <FormGroup>
                                        <label>จำนวนแผ่น</label>
                                        <Input type="number" name="disc" id="exampleSelect" defaultValue={movie.disc} min='0' max='999'
                                            onChange={inputChange}>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="12">
                                    <FormGroup>
                                        <label>
                                            ที่จัดเก็บ
                                        </label>
                                        <Input
                                            name='location'
                                            placeholder="Location"
                                            type="text"
                                            defaultValue={movie.location}
                                            onChange={(event) => inputChange(event)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='mb-12'>
                                    <Row>
                                        <Col md='7'>
                                            <Label>ประเภท</Label>
                                            <br />
                                            {renderMovieCategories}
                                        </Col>
                                        <Col md='2'>
                                            <label>หมวด</label>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="serie" value='ซีรี่ย์' defaultChecked={isSerieIsSerie()} onChange={(event) => inputChange(event)} />
                                                    ซีรี่ย์
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="serie" value='ม้วนเดียว' defaultChecked={isSerieIsMovie()} onChange={(event) => inputChange(event)} />
                                                    ม้วนเดียว
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="7">
                                    <FormGroup>
                                        <TagsInput
                                            label="ตัวละครหลัก"
                                            id="tags"
                                            name="tags"
                                            placeholder="ENTER"
                                            onChange={changeHandler}
                                            error={errors.tags}
                                            defaultTags={tags}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="px-1" md="3">
                                    <FormGroup>
                                        <label>บริษัทผู้สร้าง</label>
                                        <Input
                                            name='company'
                                            placeholder="Agent"
                                            type="text"
                                            defaultValue={movie.company}
                                            onChange={(event) => inputChange(event)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="2">
                                    <FormGroup>
                                        <label>ความยาวนาที</label>
                                        <Input type="number"
                                            name='length'
                                            min='0' max='999'
                                            defaultValue={movie.length}
                                            onChange={(event) => inputChange(event)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label>เนื้อเรื่อง</label>
                                        <Input
                                            type="textarea"
                                            name='story'
                                            defaultValue={movie.story}
                                            onChange={(event) => inputChange(event)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                )
            }
        }

        function renderbox5() {
            if (userAccessToken) {
                return (
                    <Card className="card-user">
                        <CardHeader>
                            <CardTitle><h5 className='bold'>Dub</h5></CardTitle>
                        </CardHeader>
                        <CardFooter>
                            <Row>
                                <Col md='2' className='pr-2'>
                                    <label>สถานะการพากย์</label>
                                    <Input
                                        type='text'
                                        name='dubstatus'
                                        defaultValue={movie.dubstatus}
                                        onChange={(event) => inputChange(event)}
                                    />
                                </Col>
                                <Col md='4' className='px-2'>
                                    <label>ทีมพากย์</label>
                                    <Input
                                        type='text'
                                        name='dubteam'
                                        defaultValue={movie.dubteam}
                                        onChange={(event) => inputChange(event)}
                                    />
                                </Col>
                                <Col md='4' className='px-2'>
                                    <label>ชื่อนักพากย์</label>
                                    <Input
                                        type='text'
                                        name='dubname'
                                        defaultValue={movie.dubname}
                                        onChange={(event) => inputChange(event)}
                                    />
                                </Col>
                                <Col md='2' className='pl-2'>
                                    <label>ลงบิลวันที่:{dubDate}</label>
                                    <Input
                                        type='date'
                                        name='dubDate'
                                        onChange={(event) => inputChange(event)}
                                    />
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                )
            }
        }
        return (
            <>
                <div className="content">
                    <Form onSubmit={clickSubmit}>
                        <Row>
                            <Col md="4">
                                {renderbox1()}
                                {renderbox2()}
                                {renderbox3()}
                                <div className="update ml-auto mr-auto">
                                    {renderButton()}
                                </div>
                            </Col>
                            <Col md="8">
                                {renderbox4()}
                                {renderbox5()}
                            </Col>
                        </Row>
                    </Form>
                </div>
            </>
        )
    }//render
    else if (Object.keys(movie).length > 0) {
        const renderCategory = movie.categories.map(category => {
            return category.name
        })
        const renderCountry = movie.country.map(country => {
            return country.name
        })

        return (
            <>
                <div className="content">
                    <Form onSubmit={clickSubmit}>
                        <Row>
                            <Col md="4">
                                <Card className="">
                                    <div className="image">
                                        <a href={movie.imgUrl} target='_blank'>
                                            <img
                                                alt="Have no upload image"
                                                src={movie.imgUrl || require("assets/img/damir-bosnjak.jpg").default}
                                            />
                                        </a>
                                    </div>
                                    <CardBody>
                                        <Input type="file" name="file" id="exampleFile" onChange={imgChange} />
                                    </CardBody>
                                    <CardFooter>
                                        <div className="button-container">
                                            <Row>
                                                <Col className="md-2">
                                                    <label>ผู้บันทึก</label>
                                                    <Input type='text' name='recorder' value={movie.recorder} />
                                                </Col>
                                                <Col className='md-2'>
                                                    <label>สถานะ</label>
                                                    <Input type='text' name='recordStatus' value={movie.recordStatus} />
                                                </Col>
                                            </Row>
                                        </div>
                                    </CardFooter>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle><h5 className='bold'>Broker</h5></CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <label>
                                                    บริษัทผู้ขาย
                                                </label>
                                                <Input type='text' name='pokerCompany' value={movie.pokerCompany} />
                                            </Col>
                                            <Col>
                                                <label>
                                                    ชื่อผู้ติดต่อ
                                                </label>
                                                <Input type='text' name='pokerName' value={movie.pokerName} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <label>
                                                    เบอร์โทร
                                                </label>
                                                <Input type='tel' name='pokerTell' value={movie.pokerTell} />
                                            </Col>
                                            <Col>
                                                <label>
                                                    อีเมล
                                                </label>
                                                <Input type='email' name='pokerEmail' value={movie.pokerEmail} />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            <h5 className='bold'>Copyright</h5>
                                        </CardTitle>
                                        <CardBody>
                                            <Row className='content'>
                                                <Col>
                                                    <label>countries</label>
                                                    <Input className='longInput' type="text" value={renderCountry}></Input>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className='md-2'>
                                                    <label>ตั้งแต่</label>
                                                    <Input type='text' name="copyrightStart" defaultValue={copyStart}
                                                        value={copyStart}
                                                    />
                                                </Col>
                                                <Col className='md-2'>
                                                    <label>ถึง</label>
                                                    <Input type='text' name="copyrightEnd"
                                                        value={copyEnd}
                                                    />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </CardHeader>
                                </Card>
                            </Col>
                            <Col md="8">
                                <Card className="card-user">
                                    <CardHeader>
                                        <CardTitle><h5 className='bold'>Edit Profile</h5></CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label>รหัส</label>
                                                    <Input
                                                        name='id'
                                                        placeholder="Code"
                                                        type="text"
                                                        defaultValue={movie.id}
                                                        value={inputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <FormGroup>
                                                    <label>*ชื่ออังกฤษ</label>
                                                    <Input
                                                        name='engName'
                                                        placeholder="*Eng Name"
                                                        type="text"
                                                        value={movie.engName}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label>
                                                        ชื่อไทย
                                                    </label>
                                                    <Input
                                                        name='thName'
                                                        placeholder="Th Name"
                                                        type="text"
                                                        value={movie.thName}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <FormGroup>
                                                    <label>
                                                        ชื่ออื่นๆ
                                                    </label>
                                                    <Input
                                                        name='etcName'
                                                        placeholder="Etc Name"
                                                        type="text"
                                                        value={movie.etcName}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <FormGroup>
                                                    <label>ปีของหนัง(ค.ส.)</label>
                                                    <Input type="text" name="movieYear" value={movie.movieYear}>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <FormGroup>
                                                    <label>จำนวนตอน</label>
                                                    <Input
                                                        type="number" name="ep" id="exampleSelect" value={movie.ep} min='0' max='999'>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <FormGroup>
                                                    <label>จำนวนแผ่น</label>
                                                    <Input type="number" name="disc" id="exampleSelect" value={movie.disc} min='0' max='999'>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="12">
                                                <FormGroup>
                                                    <label>
                                                        ที่จัดเก็บ
                                                    </label>
                                                    <Input
                                                        name='location'
                                                        value={movie.location}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mb-12'>
                                                <Row>
                                                    <Col md='7'>
                                                        <Label>ประเภท</Label>
                                                        <br />
                                                        <Input className='longInput' type="text" value={renderCategory}></Input>
                                                    </Col>
                                                    <Col className='pl-1' md='5'>
                                                        <label>หมวด</label>
                                                        <FormGroup check>
                                                            <Input type='text' name='series' value={movie.serie} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <FormGroup>
                                                    <TagsInput2
                                                        label="ตัวละครหลัก"
                                                        id="tags"
                                                        name="tags"
                                                        onChange={changeHandler}
                                                        error={errors.tags}
                                                        defaultTags={tags}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <FormGroup>
                                                    <label>บริษัทผู้สร้าง</label>
                                                    <Input
                                                        name='company'
                                                        placeholder="Agent"
                                                        type="text"
                                                        value={movie.company}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <FormGroup>
                                                    <label>ความยาวนาที</label>
                                                    <Input type="number"
                                                        name='length'
                                                        min='0' max='999'
                                                        value={movie.length}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>เนื้อเรื่อง</label>
                                                    <Input
                                                        type="textarea"
                                                        name='story'
                                                        value={movie.story}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="card-user">
                                    <CardHeader>
                                        <CardTitle><h5 className='bold'>Dub</h5></CardTitle>
                                    </CardHeader>
                                    <CardFooter>
                                        <Row>
                                            <Col md='2' className='pr-2'>
                                                <label>สถานะการพากย์</label>
                                                <Input
                                                    type='text'
                                                    name='dubstatus'
                                                    defaultValue={movie.dubstatus}
                                                    value={movie.dubstatus}
                                                />
                                            </Col>
                                            <Col md='4' className='px-2'>
                                                <label>ทีมพากย์</label>
                                                <Input
                                                    type='text'
                                                    name='dubteam'
                                                    defaultValue={movie.dubteam}
                                                    value={movie.dubteam}
                                                />
                                            </Col>
                                            <Col md='4' className='px-2'>
                                                <label>ชื่อนักพากย์</label>
                                                <Input
                                                    type='text'
                                                    name='dubname'
                                                    defaultValue={movie.dubname}
                                                    value={movie.dubname}
                                                />
                                            </Col>
                                            <Col md='2' className='pl-2'>
                                                <label>ลงบิลวันที่</label>
                                                <Input
                                                    type='text'
                                                    name='dubfinish'
                                                    value={dubDate} />
                                            </Col>
                                        </Row>
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

export default ItemDetail;
