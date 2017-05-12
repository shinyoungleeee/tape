import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AllAlbumsFetch from './containers/AllAlbumsFetch';
import UserAlbumsFetch from './containers/UserAlbumsFetch';
import AllGroupsFetch from './containers/AllGroupsFetch';
import UserGroupsFetch from './containers/UserGroupsFetch';
import GroupAlbumsFetch from './containers/GroupAlbumsFetch';

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
        <Route path='groups' name='groups' component={Dashboard}>
          <IndexRoute component={AllGroupsFetch} />
          <Route path=':id/albums' component={GroupAlbumsFetch} />
        </Route>
        <Route path='users/:id' name='users' component={Dashboard}>
          <Route path='albums' component={UserAlbumsFetch} />
          <Route path='groups' component={UserGroupsFetch} />
        </Route>
      </Router>
    )
  }
}

export default Root;
