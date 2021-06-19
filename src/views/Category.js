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
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

function Category() {
  const [movieCategories, setMovieCategories] = useState([])

  const getCategories = async () => {
    const { data } = await axios.get(`https://movie-search-backend.herokuapp.com/content/categories`)
    setMovieCategories(data)
  }
  const renderMovieCategories = movieCategories.map(category => {
    return (
      <Col md="3">
        <Link to={`/content/category/${category.id}?page=1`}>
          <Button
            block
            color="primary"
          //onClick={() => notify("tl")}
          >
            {category.name}
          </Button>
        </Link>
      </Col>
    )
  })
  useEffect(() => {
    getCategories()
    // showData()
  }, [])

  return (
    <>
      <div className='content'>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <div className="places-buttons">
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        {renderMovieCategories}
                      </Row>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Category;
