import React from 'react';
import { Link } from 'react-router';
import AlbumsIndexContainer from './AlbumsIndexContainer';

class UserAlbumsFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    }

    this.getAlbumData = this.getAlbumData.bind(this)
    this.sortByLikeCount = this.sortByLikeCount.bind(this)
    this.like = this.like.bind(this)
  }

  getAlbumData() {
    fetch(`/api/v1/users/${this.props.params.id}/albums.json`, { credentials: 'same-origin' })
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
    this.getAlbumData()
  }

  render() {
    let user;
    if (this.state.albums.length > 0) {
      let like = this.state.albums[0].album_likes.find((album_like) => {
        return album_like.user_id == this.props.params.id
      })
      user = `${like.user_handle}'s`
    }
    return(
      <AlbumsIndexContainer
        albums={this.state.albums}
        scope={user}
        like={this.like}
      />
    )
  }
}

export default UserAlbumsFetch;
