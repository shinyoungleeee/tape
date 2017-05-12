import React from 'react';
import { Link } from 'react-router';
import AlbumsIndexContainer from './AlbumsIndexContainer';

class GroupAlbumsFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      group: null
    }

    this.getGroupData = this.getGroupData.bind(this)
    this.getAlbumData = this.getAlbumData.bind(this)
    this.like = this.like.bind(this)
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
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  like(albumId) {
    fetch(`/api/v1/albums/${albumId}/like.json`, {
      credentials: 'same-origin'
    })
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

  componentDidMount() {
    this.getGroupData()
    this.getAlbumData()
  }

  render() {
    let group;
    if (this.state.group) {
      let group_name = this.state.group.name
      if (group_name.substr(group_name.length - 1 === 's')) {
        group = `${this.state.group.name}' Group`
      } else {
        group = `${this.state.group.name}'s Group`
      }
    }
    return(
      <AlbumsIndexContainer
        albums={this.state.albums}
        scope={group}
        like={this.like}
      />
    )
  }
}

export default GroupAlbumsFetch;
