import React from 'react';
import { Link } from 'react-router';

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: null
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
        this.setState({ currentUser: body });
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
    let userLinks = () => {
      return(
        <ul className="menu invisible">
          <li className="menu-text">: </li>
          <li><Link to={`/groups`}>My Groups</Link></li>
          <li><Link to={`/albums`}>My Albums</Link></li>
        </ul>
      )
    }
    if (this.state.currentUser) {
      userDiv = () => {
        return(
          <div className="dashboard-user flex-container align-middle">
            <div className="text-right">
              <p>{this.state.currentUser.handle}</p>
              <a rel="nofollow" data-method="delete" href="/users/sign_out">Sign out</a>
            </div>
            <div>
              <img className="dashboard-avatar" src={this.state.currentUser.image + "/picture?type=large"} alt="" />
            </div>
          </div>
        )
      }
      userLinks = () => {
        return(
          <ul className="menu">
            <li className="menu-text">{this.state.currentUser.handle}: </li>
            <li><Link to={`/users/${this.state.currentUser.id}/groups`}>My Groups</Link></li>
            <li><Link to={`/users/${this.state.currentUser.id}/albums`}>My Albums</Link></li>
          </ul>
        )
      }
    }
    return(
      <div>
        <div className="dashboard">
          <div className="dashboard-title flex-container align-justify align-bottom">
            <div>
              <h1><Link to={'/'}>t a p e</Link></h1>
            </div>
            {userDiv()}
          </div>
          <div>
            <ul className="menu">
              <li className="menu-text">Global: </li>
              <li><Link to={'/'}>Search</Link></li>
              <li><Link to={'/groups'}>Groups</Link></li>
              <li><Link to={'/albums'}>Albums</Link></li>
            </ul>
            {userLinks()}
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Dashboard;
