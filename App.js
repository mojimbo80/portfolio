import React, {useEffect, useState} from 'react';

import './Sass/styles.scss';
import Nav from "./JS/Components/Nav";
import Main from "./JS/Components/Main";
import Project from "./JS/Components/Project";

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import {fetchData, getClients} from "./JS/Services/portfolio-service";
import ScrollToTop from "./JS/Elements/ScrollToTop";


function App()  {
  const value = "project";
  const [route, setRoute] = useState([]);
  useEffect(() => {
    getClients(value).then(items => {
      setRoute(
          ...route,
        items.items.map(items => {

          return {
            route:  items.fields.route,
            projectId: items.sys.id,
          }
        })
      )
    })
  },[])
  return (
      <>
        <Router>
          <ScrollToTop />
          <Nav />
          <Switch>
            <Route exact path="/">
                <Main />
            </Route>
            {
              route
              && route.length
              && route.map((item, index) =>
              <Route key={index} path={item.route}>
                <Project id={item.projectId} />
              </Route>
              )
            }
          </Switch>
        </Router>
      </>
  );
}

export default App;
