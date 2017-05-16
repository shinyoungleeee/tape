import React from 'react';
import { Link } from 'react-router';

class UserTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <div className="media-object">
        <div className="media-object-section">
          <img className="thumbnail user-tile-avatar" src={this.props.image} alt="user avatar" />
        </div>
        <div className="media-object-section middle">
          <h6>{this.props.handle}</h6>
        </div>
      </div>
    )
  }
}

export default UserTile;
