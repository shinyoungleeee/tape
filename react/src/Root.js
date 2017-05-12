import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AllAlbumsFetch from './containers/AllAlbumsFetch';
import UserAlbumsFetch from './containers/UserAlbumsFetch';

class Root extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <Router history={browserHistory}>
        <Route path='/' component={LandingPage} />
        <Route path='albums' name='albums' component={Dashboard}>
          <IndexRoute component={AllAlbumsFetch} />
        </Route>
        <Route path='users/:id/albums' name='user albums' component={Dashboard}>
          <IndexRoute component={UserAlbumsFetch} />
        </Route>
      </Router>
    )
  }
}

export default Root;
