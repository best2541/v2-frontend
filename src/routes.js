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
import Category from "views/Category";
import Login from "views/Login";
import Add from "views/Add.js"
import AddActor from "views/AddActor"
import ActorList from "views/ActorList"
import Logout from "views/Logout";

const userAccessToken = window.localStorage.getItem('userAccessToken')

var routes = [
  {
    path: "/category",
    name: "Category",
    icon: "nc-icon nc-tile-56",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/actor",
    name: "Actor",
    icon: "nc-icon nc-circle-10",
    component: ActorList,
    layout: "/admin",
  }
]
if (userAccessToken) {
  routes.push({
    pro: true,
    path: "/Logout",
    name: "Log out",
    icon: "nc-icon nc-button-power",
    component: Logout,
    layout: "/admin",
  },
    {
      path: "/add",
      name: "Add",
      icon: "nc-icon nc-simple-add",
      component: Add,
      layout: "/admin",
    },
    {
      path: "/insertActor",
      name: "Add Actor",
      icon: "nc-icon nc-simple-add",
      component: AddActor,
      layout: "/admin",
    }
  )
} else {
  routes.push({
    pro: true,
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-button-power",
    component: Login,
    layout: "/admin",
  })
}
export default routes;
