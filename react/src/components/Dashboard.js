import React from 'react';
import { Link } from 'react-router';

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {},
      signedIn: false
    }

    this.getUserData = this.getUserData.bind(this)
  }

  getUserData() {
    fetch(`/api/v1/users.json`, {credentials: 'same-origin'})
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          currentUser: body.current_user,
          signedIn: body.signed_in
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getUserData()
    $(function(){ $(document).foundation(); });
  }

  render() {
    let userDiv = () => {
      return(
        <div className="dashboard-user flex-container align-right align-bottom">
          <div>
            <ul className="menu">
              <li><a href="/users/auth/facebook">Sign in with Facebook</a></li>
            </ul>
          </div>
        </div>
      )
    }
    if (this.state.signedIn) {
      userDiv = () => {
        return(
          <div className="dashboard-user flex-container align-bottom">
            <div className="text-right">
              <p>{this.state.currentUser.handle}</p>
              <a rel="nofollow" data-method="delete" href="/users/sign_out">Sign out</a>
            </div>
            <div>
              <img className="dashboard-avatar" src={this.state.currentUser.image} alt="" />
            </div>
          </div>
        )
      }
    }
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
          {userDiv()}
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Dashboard;
