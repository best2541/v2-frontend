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

function Add() {
  const [category, setCategory] = useState([])
  const [movieCategories, setMovieCategories] = useState([])
  const [selectedMovieCategories, setSelectedMoiveCategories] = useState([])
  const [input, setInput] = useState({
    id: '', img: '', imgFile: null, engName: '', thName: '', etcName: '', movieYear: 0, ep: '', disc: 0, category: [], serie: '', mainCharater: '', company: '', length: 0,
    pokerCompany: '', pokerName: '', pokerTell: 0, pokerEmail: '', copyrightStart: '', copyrightEnd: '', dubstatus: '', dubteam: '', dubname: '',
    dubfinish: '', story: '', recorder: '', recordStatus: ''
  })
  const [thCheck, setThCheck] = useState(false)
  const [laosCheck, setLaosCheck] = useState(false)
  const [myanmarCheck, setMyanmarCheck] = useState(false)
  const [cambodiaCheck, setCambodiaCheck] = useState(false)
  const [vietnamCheck, setVietnamCheck] = useState(false)

  function inputChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value
      };
    });
  }

  function categoryChange(event) {
    const { value } = event.target
    console.log(value)
    setCategory((prevCategory) => {
      return [
        ...prevCategory,
        value
      ]
    })
  }
  function categoryChange(event) {
    const { id, checked } = event.target
    const numberId = Number(id)
    const updatedArray = new Set([...selectedMovieCategories])
    if (checked === true) {
      updatedArray.add(numberId)
    } else {
      updatedArray.delete(numberId)
    }
    console.log(updatedArray)
    setSelectedMoiveCategories([...updatedArray])
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

  const getCategories = async () => {
    const { data } = await axios.get(`https://movie-search-backend.herokuapp.com/content/categories`)
    setMovieCategories(data)
  }

  useEffect(() => {
    getCategories()
  }, [])
  async function clickSubmit(event) {
    event.preventDefault()
    await axios.post('https://movie-search-backend.herokuapp.com/content/add', {
      id: input.id, imgName: input.imgName, img: input.img, engName: input.engName,
      thName: input.thName, etcName: input.etcName, movieYear: input.movieYear, ep: input.ep,
      disc: input.disc, category: selectedMovieCategories, serie: input.serie, mainCharater: input.mainCharater,
      company: input.company, pokerCompany: input.pokerCompany, pokerName: input.pokerName, pokerTell: input.pokerTell, pokerEmail: input.pokerEmail,
      copyrightStart: input.copyrightStart, copyrightEnd: input.copyrightEnd,
      dubstatus: input.dubstatus, dubteam: input.dubteam, dubname: input.dubname, dubfinish: input.dubfinish,
      recorder: input.recorder, recordStatus: input.recordStatus, story: input.story, length: input.length, thCheck, laosCheck, myanmarCheck, cambodiaCheck, vietnamCheck
    }, {
      timeout: 20000
    })
      .then((res) => {
        alert(res.data.message)
      })
  }

  let thisYear = (new Date()).getFullYear();
  let allYears = [];
  for (let x = 1900; x <= thisYear; x++) {
    allYears.push(x)
  }
  const yearList = allYears.map((x) => { return (<option key={x}>{x}</option>) });

  return (
    <>
      <div className="content">
        <Form onSubmit={clickSubmit}>
          <Row>
            <Col md="4">
              <Card className="">
                <div className="image">
                  <img
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
                      <Col className="md-2">
                        <label>ผู้บันทึก</label>
                        <Input type='text' name='recorder' onChange={(event) => inputChange(event)} />
                      </Col>
                      <Col className='md-2'>
                        <label>สถานะ</label>
                        <Input type='text' name='recordStatus' onChange={(event) => inputChange(event)} />
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Broker</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <label>
                        บริษัทผู้ขาย
                      </label>
                      <Input type='text' name='pokerCompany' onChange={(event) => inputChange(event)} />
                    </Col>
                    <Col>
                      <label>
                        ชื่อผู้ติดต่อ
                      </label>
                      <Input type='text' name='pokerName' onChange={(event) => inputChange(event)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>
                        เบอร์โทร
                      </label>
                      <Input type='tel' name='pokerTell' onChange={(event) => inputChange(event)} />
                    </Col>
                    <Col>
                      <label>
                        อีเมล
                      </label>
                      <Input type='email' name='pokerEmail' onChange={(event) => inputChange(event)} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag='h5'>
                    Copyright(ลิขสิทธิ์)
                  </CardTitle>
                  <CardBody>
                    <Row className='content'>
                      <Col>
                        <input type="checkbox" id="thCheck" name="country" onChange={(e) => setThCheck(e.target.checked)} />
                        <label className='pr-1 pl-1' for="thCheck">  ไทย</label>
                        <input type="checkbox" id="laosCheck" name="country" onChange={(e) => setLaosCheck(e.target.checked)} />
                        <label className='pr-1 pl-1' for="laosCheck">  ลาว</label>
                        <input type="checkbox" id="myanmarCheck" name="country" onChange={(e) => setMyanmarCheck(e.target.checked)} />
                        <label className='pr-1 pl-1' for="myanmarCheck">  พม่า</label>
                        <input type="checkbox" id="cambodiaCheck" name="country" onChange={(e) => setCambodiaCheck(e.target.checked)} />
                        <label className='pr-1 pl-1' for="cambodiaCheck">  กัมพูชา</label>
                        <input type="checkbox" id="vietnamCheck" name="country" onChange={(e) => setVietnamCheck(e.target.checked)} />
                        <label className='pr-1 pl-1' for="vietnamCheck">  เวียดนาม</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='md-2'>
                        <label>ตั้งแต่</label>
                        <Input type='date' name="copyrightStart" onChange={(event) => {
                          event.value = new Date(event).toLocaleDateString()
                          console.log(event)
                          inputChange(event)
                        }} />
                      </Col>
                      <Col className='md-2'>
                        <label>ถึง</label>
                        <Input type='date' name="copyrightEnd" onChange={(event) => {
                          event.value = new Date(event).toLocaleDateString()
                          inputChange(event)
                        }} />
                      </Col>
                    </Row>
                  </CardBody>
                </CardHeader>
              </Card>
              <div className="update ml-auto mr-auto">
                <Button
                  className="btn-round"
                  color="primary"
                  type="submit"
                >
                  Update Profile
                </Button>
              </div>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Profile</CardTitle>
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
                          onChange={(event) => inputChange(event)}
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
                          required
                          onChange={(event) => inputChange(event)}
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
                          onChange={(event) => inputChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>ปีของหนัง(ค.ส.)</label>
                        <Input type="select" name="movieYear" onChange={(event) => inputChange(event)}>
                          {yearList}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>จำนวนตอน</label>
                        <Input
                          type="number" name="ep" id="exampleSelect" defaultValue='0' min='0' max='999'
                          onChange={(event) => inputChange(event)}>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>จำนวนแผ่น</label>
                        <Input type="number" name="disc" id="exampleSelect" defaultValue='0' min='0' max='999'
                          onChange={(event) => inputChange(event)}>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='mb-12'>
                      <Row>
                        <Col md='7'>
                          <Label>ประเภท</Label>
                          <br />
                          <input type="checkbox" id="2" name="category" value='2' onChange={categoryChange} />
                          <label className='px-1' for="Action">Action</label>
                          <input type="checkbox" id="1" name="category" value='1' onChange={categoryChange} />
                          <label className='px-1' for="Adventure">Adventure</label>
                          <input type="checkbox" id="10" name="category" value='10' onChange={categoryChange} />
                          <label className='px-1' for="Animation">Animation</label>
                          <input type="checkbox" id="11" name="category" value='11' onChange={categoryChange} />
                          <label className='px-1' for="Comedy">Comedy</label>
                          <input type="checkbox" id="8" name="category" value='8' onChange={categoryChange} />
                          <label className='px-1' for="Crime">Crime</label>
                          <input type="checkbox" id="9" name="category" value='9' onChange={categoryChange} />
                          <label className='px-1' for="Documentaries">Documentaries</label>
                          <input type="checkbox" id="4" name="category" value='4' onChange={categoryChange} />
                          <label className='px-1' for="Drama">Drama</label>
                          <br />
                          <input type="checkbox" id="12" name="category" value='12' onChange={categoryChange} />
                          <label className='px-1' for="Erotic">Erotic</label>
                          <input type="checkbox" id="6" name="category" value='6' onChange={categoryChange} />
                          <label className='px-1' for="Family">Family</label>
                          <input type="checkbox" id="13" name="category" value='13' onChange={categoryChange} />
                          <label className='px-1' for="Fantasy">Fantasy</label>
                          <input type="checkbox" id="14" name="category" value='14' onChange={categoryChange} />
                          <label className='px-1' for="Musicals Movies">Musicals</label>
                          <input type="checkbox" id="15" name="category" value='15' onChange={categoryChange} />
                          <label className='px-1' for="Romance">Romance</label>
                          <input type="checkbox" id="5" name="category" value='5' onChange={categoryChange} />
                          <label className='px-1' for="Sci-fi">Sci-fi</label>
                          <input type="checkbox" id="7" name="category" value='7' onChange={categoryChange} />
                          <label className='px-1' for="Thriller">Thriller</label>
                          <input type="checkbox" id="3" name="categoy" value='3' onChange={categoryChange} />
                          <label className='px-1' for="War">War</label>
                          <input type="checkbox" id="16" name="category" value='16' onChange={categoryChange} />
                          <label className='px-1' for="Western">Western</label>
                        </Col>
                        <Col md='2'>
                          <label>หมวด</label>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="serie" value='ซีรี่ย์' onChange={(event) => inputChange(event)} />
                              ซีรี่ย์
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="serie" value='ม้วนเดียว' onChange={(event) => inputChange(event)} />
                              ม้วนเดียว
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>ตัวละครหลัก</label>
                        <Input
                          name='mainCharater'
                          placeholder="Main character"
                          type="text"
                          onChange={(event) => inputChange(event)}
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
                          onChange={(event) => inputChange(event)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>ความยาวนาที</label>
                        <Input type="number"
                          name='length'
                          min='0' max='999'
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
                          onChange={(event) => inputChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag='h5'>Dub </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Row>
                    <Col md='2' className='pr-2'>
                      <label>สถานะการพากย์</label>
                      <Input
                        type='text'
                        name='dubstatus'
                        onChange={(event) => inputChange(event)}
                      />
                    </Col>
                    <Col md='4' className='px-2'>
                      <label>ทีมพากย์</label>
                      <Input
                        type='text'
                        name='dubteam'
                        onChange={(event) => inputChange(event)}
                      />
                    </Col>
                    <Col md='4' className='px-2'>
                      <label>ชื่อนักพากย์</label>
                      <Input
                        type='text'
                        name='dubname'
                        onChange={(event) => inputChange(event)}
                      />
                    </Col>
                    <Col md='2' className='pl-2'>
                      <label>ลงบิลวันที่</label>
                      <Input
                        type='date'
                        name='dubDate'
                        onChange={(event) => inputChange(event)}
                      />
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default Add;
