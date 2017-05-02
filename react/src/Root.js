import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AlbumsIndexContainer from './containers/AlbumsIndexContainer';

class Root extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <Router history={browserHistory}>
        <Route path='/' component={LandingPage}/>
        <Route path='albums' name='albums' component={Dashboard}>
          <IndexRoute component={AlbumsIndexContainer} />
        </Route>
      </Router>
    )
  }
}

export default Root;
