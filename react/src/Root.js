import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import LandingPage from './components/LandingPage';
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
        <Route path='albums' name='albums' component={AlbumsIndexContainer}>
          
        </Route>
      </Router>
    )
  }
}

export default Root;
