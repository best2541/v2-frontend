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
import CategoryDetail from "views/CategoryDetail";
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
  const { id } = useParams()
  const getCategories = async () => {
    const { data } = await axios.get(`https://movie-search-backend.herokuapp.com/content/categories`)
    setMovieCategories(data)
  }
  const renderMovieCategories = movieCategories.map(category => {
    return (
      <Col md="3">
          <Button
            block
            color="primary"
            onClick={(event)=>{
              const url = `/admin/category/${category.id}?page=1`
              window.location.href= url
            }}
          >
            {category.name}
          </Button>
      </Col>
    )
  })

  const renderSomething = (props) => {
    console.log(id)
    return <p>{id}</p>
  }
  useEffect(() => {
    getCategories()
    // showData()
  }, [])

  return (
    <>
      <div className='content'>
        <Row>
          <Switch>
            <Route path='/admin/category/:id'>
              <CategoryDetail/>
            </Route>
            <Route path='/admin/category' exact>
              <Col md="12">
                <Card>
                  <CardBody>
                    <div className="places-buttons">
                      <Row>
                        <Col className="ml-auto mr-auto" lg="8">
                          <Row>
                            <Router>
                              {renderMovieCategories}
                            </Router>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Route>
          </Switch>
        </Row>
      </div>
    </>
  );
}

export default Category;
