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
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams, Link, BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import qs from 'query-string'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import '../assets/css/mystyle.css'
import UserContext from '../contexts/UserContext'
import ActorDetail from "./ActorDetail";
import TagActor from "./TagActor";

function ActorList() {
    require('dotenv').config()
    let { id } = useParams()
    const { token, setToken } = useContext(UserContext)
    const userAccessToken = window.localStorage.getItem('userAccessToken')
    const location = useLocation()
    const history = useHistory()
    const queryParams = qs.parse(location.search);
    const [loading, setLoading] = useState(<CircularProgress />)
    const [next, setNext] = useState(queryParams.page || 1)
    const [prev, setPrev] = useState(queryParams.page || 1)
    const [page, setPage] = useState(queryParams.page || 1)
    const [movies, setMovies] = useState([])

    function setQueryString(query = {}) {
        const newQueries = { ...queryParams, ...query };
        history.push({ search: qs.stringify(newQueries) });
    }

    function nextClick() {
        setPage(next)
        setQueryString({ page: next })
    }
    function prevClick() {
        setPage(prev)
        setQueryString({ page: prev })
    }

    const getData = async () => {
        if (!id) id = ''
        const { data } = await axios.get(`${process.env.REACT_APP_API}/content/actor${id}`)
        setMovies(data.result)
        if (data.next) {
            setNext(data.next.page)
        }
        if (data.previous) {
            setPrev(data.previous.page)
        }
    }

    const a = setTimeout(() => {
        setLoading(<h3>Not Found</h3>)
    }, [5000])

    useEffect(() => {
        getData()
    }, [page])

    function renderDeleteButton() {

        if (userAccessToken) {
            return (
                <form>
                    <Button color="danger" type='submit'>Delete</Button>
                </form>
            )
        }
    }

    const renderMovies = movies.map((movie, movieIndex) => {

        function detailUrl() {
            return `/admin/actor/item/${movie.pointer}`
        }
        function deleteUrl(event) {
            event.preventDefault()
            const sure = window.confirm('ต้องการลบ ?')
            if (sure === true) {
                axios.delete(`${process.env.REACT_APP_API}/content/actordelete/${movie.pointer}`).then((response) => {
                    alert('ลบเรียบร้อย!!')
                    return window.location.reload()
                })
            }
        }
        if (!movie.img) movie.imgUrl = null
        return (
            <>
                <Col md="4">
                    <Card>
                        <CardHeader>
                            <Link to={detailUrl}>
                                <div className="">
                                    <img
                                        className='picture'
                                        alt="..."
                                        src={movie.imgUrl || require("assets/img/damir-bosnjak.jpg").default}
                                    />
                                </div>
                            </Link>
                        </CardHeader>
                        <CardFooter>
                            <Link to={detailUrl}> <a className='item' href=''><h5 className='bold'>{movie.firstname}</h5></a></Link>
                            <label className=''>{movie.familyname}</label>
                            <span className='item' onClick={deleteUrl}>{renderDeleteButton()}</span>
                        </CardFooter>
                    </Card>
                </Col>
            </>
        )
    })
    if (movies.length > 0) {
        return (
            <>
                <div className="content">
                    <Switch>
                        <Route path='/admin/actor/item/:id'>
                            <ActorDetail />
                        </Route>
                        <Route path='/admin/actor/tag/:id'>
                            {/* <Row>
                                <Col md='4'>
                                    <button variant='primary' className="prevbtn" onClick={prevClick}>PREVIOUS</button>
                                </Col>
                                <Col md='4' className='btn-center'>
                                    <h5>Page:{page}</h5>
                                </Col>
                                <Col md='4' className='btn-right'>
                                    <button variant='primary' className="nextbtn" onClick={nextClick}>NEXT</button>
                                </Col>
                            </Row> */}
                            <Row>
                                <TagActor />
                            </Row>
                        </Route>
                        <Route path='/admin/actor' exact>
                            <Row>
                                <Col md='4'>
                                    <button variant='primary' className="prevbtn" onClick={prevClick}>PREVIOUS</button>
                                </Col>
                                <Col md='4' className='btn-center'>
                                    <h5>Page:{page}</h5>
                                </Col>
                                <Col md='4' className='btn-right'>
                                    <button variant='primary' className="nextbtn" onClick={nextClick}>NEXT</button>
                                </Col>
                            </Row>
                            <Row>
                                {renderMovies}
                            </Row>
                        </Route>
                    </Switch>
                </div>
            </>
        );
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

export default ActorList;
