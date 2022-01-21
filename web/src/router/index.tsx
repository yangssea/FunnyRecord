import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import router from './router';
// function NoMatch(){
//   return <div>404</div>;
// }
import FrontendAuth from "../hoc/Auth";
export default class view extends Component {
  constructor(props: any) {
    super(props);
    console.log(props, 'layoutfer');
  }
  render() {
    return (
      <>
        <Suspense fallback={<></>}>
          <Router>
            <Switch>
              {/*{*/}
              {/*  router.map(e =>*/}
              {/*    (<Route exact path={e.path} key={e.title}   >{e.component}</Route>)*/}
              {/*  )*/}
              {/*}*/}
              <FrontendAuth/>
            </Switch>
          </Router>
        </Suspense>
      </>
    )
  }
}
