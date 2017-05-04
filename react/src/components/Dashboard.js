import React from 'react';
import { Link } from 'react-router';

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <div className="flex-container align-justify">
          <div className="dashboard-title flex-container align-right align-bottom">
            <div>
              <h1><Link to={'/'}>t a p e</Link></h1>
            </div>
            <div>
              <ul className="menu">
                <li><Link to={'/albums'}>My Albums</Link></li>
                <li><Link to={'/songs'}>My Songs</Link></li>
                <li><Link to={'/artists'}>My Artists</Link></li>
                <li><Link to={'/playlists'}>My Playlists/DJs</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <a href="/users/auth/facebook">Sign in with Facebook</a>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Dashboard;
