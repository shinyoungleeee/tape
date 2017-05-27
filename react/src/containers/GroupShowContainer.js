import React from 'react';
import { Link } from 'react-router';
import UserTile from '../components/UserTile';
import AlbumsIndexContainer from './AlbumsIndexContainer';

class GroupShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      group: null
    }

    this.getGroupData = this.getGroupData.bind(this)
    this.getAlbumData = this.getAlbumData.bind(this)
    this.sortByLikeCount = this.sortByLikeCount.bind(this)
    this.like = this.like.bind(this)
    this.joinGroup = this.joinGroup.bind(this)
  }

  getGroupData() {
    fetch(`/api/v1/groups/${this.props.params.id}.json`, { credentials: 'same-origin' })
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
        this.setState({ group: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getAlbumData() {
    fetch(`/api/v1/groups/${this.props.params.id}/albums.json`, { credentials: 'same-origin' })
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
        this.setState({ albums: body });
        this.sortByLikeCount();
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  sortByLikeCount() {
    let sorted = this.state.albums.sort((a, b) => {
      return b.like_count - a.like_count;
    })
    this.setState({ albums: sorted })
  }

  like(albumId) {
    fetch(`/api/v1/albums/${albumId}/like.json`, { credentials: 'same-origin'})
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(() => {
        this.getAlbumData()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  joinGroup() {
    fetch(`/api/v1/groups/${this.state.group.id}/join.json`, { credentials: 'same-origin' })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(() => {
        this.getGroupData()
        this.getAlbumData()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getGroupData()
    this.getAlbumData()
  }

  render() {
    let group, users, groupName, groupDescription, groupCreator;
    let joinButton = () => {}
    if (this.state.group) {
      groupName = this.state.group.name
      if (groupName.substr(groupName.length - 1 === 's')) {
        group = `${this.state.group.name}' Group`
      } else {
        group = `${this.state.group.name}'s Group`
      }

      groupDescription = this.state.group.description
      if (groupDescription == null) {
        groupDescription = "N/A"
      }

      groupCreator = this.state.group.creator.handle

      if (this.state.group.user_joined) {
        joinButton = () => {
          return(
            <button className="button alert" onClick={this.joinGroup}>Leave</button>
          )
        }
      } else {
        joinButton = () => {
          return(
            <button className="button" onClick={this.joinGroup}>Join</button>
          )
        }
      }

      users = this.state.group.users.map(user => {
        return(
          <UserTile
            handle={user.handle}
            image={user.image}
          />
        )
      })
    }

    return(
      <div>
        <div className="group-show-details">
          <div className="row align-middle">
            <div className="small-8 columns">
              <h1>{groupName}</h1>
              <p><strong>Creator: </strong>{groupCreator}</p>
              <p><strong>Description: </strong><span className="group-show-description">{groupDescription}</span></p>
            </div>
            <div className="small-1 columns">
              <h4>Users: </h4>
            </div>
            <div className="small-2 columns group-show-users">
              {users}
            </div>
            <div className="small-1 columns">
              {joinButton()}
            </div>
          </div>
        </div>
        <AlbumsIndexContainer
          albums={this.state.albums}
          scope={group}
          like={this.like}
        />
      </div>
    )
  }
}

export default GroupShowContainer;
