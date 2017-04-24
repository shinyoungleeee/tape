import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import SongsIndexContainer from './containers/SongsIndexContainer'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <Router history={browserHistory}>
        <Route path='songs' name='songs' component={SongsIndexContainer}></Route>
      </Router>
    )
  }
}

export default App;
