import React from 'react';
import { Link } from 'react-router';
import AlbumsIndexContainer from './AlbumsIndexContainer';

class UserAlbumsFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    }
  }

  componentDidMount() {
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
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
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
        user={user}
      />
    )
  }
}

export default UserAlbumsFetch;
