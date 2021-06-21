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
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams, Link } from "react-router-dom";
import qs from 'query-string'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function CategoryDetail(props) {

  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const queryParams = qs.parse(location.search);
  // const [loading, setLoading] = useState(<CircularProgress />)
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

  function renderEditButton() {
    if (token) {
      return (
        <form>
          <button className="btn" variant="success">Edit</button>
        </form>
      )
    }
  }

  function renderDeleteButton() {
    if (token) {
      return (
        <form>
          <button className="btn" variant="danger" type='submit'>Delete</button>
        </form>
      )
    }
  }

  const getData = async () => {
    const { data } = await axios.get(`https://movie-search-backend.herokuapp.com/content/category/${id}?page=${page}`)
    setMovies(data.result)
    if (data.next) {
      setNext(data.next.page)
    }
    if (data.previous) {
      setPrev(data.previous.page)
    }
  }

  const a = setTimeout(() => {
    // setLoading(<h3>Not Found</h3>)
  }, [5000])

  useEffect(() => {
    getData()
  }, [page])

  const renderMovies = movies.map((movie, movieIndex) => {

    function detailUrl() {
      return `/content/detail/${movie.pointer}`
    }
    function deleteUrl(event) {
      event.preventDefault()
      const sure = window.confirm('ต้องการลบ ?')
      if (sure === true) {
        axios.delete(`https://movie-search-backend.herokuapp.com/content/delete/${movie.pointer}`).then((response) => {
          alert('ลบเรียบร้อย!!')
          return window.location.href = `/content/category/${id}?page=${page}`
        })
      }
    }
    return (
      <section className="card-item" key={movieIndex}>
        <Link to={detailUrl}><img className='img_table' src={movie.imgUrl}></img></Link>
        <Link to={detailUrl}> <a className='item' href=''><h5>{movie.engName}</h5></a></Link>
        <Link to={detailUrl}><span className='item'>{renderEditButton()}</span></Link>
        <span className='item' onClick={deleteUrl}>{renderDeleteButton()}</span>
      </section>
    )
  })


  return (
    <>
      <div className="content">
        <Col md='12'>
          <Row>
            <Card>
              <CardHeader>
                <CardTitle tag='h5'>
                  {id}
                </CardTitle>
                <Link to={detailUrl}><img className='img_table' src={movie.imgUrl}></img></Link>

              </CardHeader>
            </Card>
          </Row>
        </Col>

      </div>
    </>
  );
}

export default CategoryDetail;
