import React from 'react';
import { Link } from 'react-router';
import AlbumTile from '../components/AlbumTile';

class AlbumsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/albums.json', { credentials: 'same-origin' })
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
    let albums = this.state.albums.map(album => {
      return(
        <AlbumTile
          key={album.id}
          id={album.id}
          name={album.name}
          art={album.image_url}
          year={album.year}
          kind={album.kind}
          links={album.album_urls}
        />
      )
    })
    return(
      <div className="albums">
        <div className="row">
          <h2>My Albums</h2>
        </div>
        <div className="row small-up-2 medium-up-3 large-up-4">
          {albums}
        </div>
      </div>
    )
  }
}

export default AlbumsIndexContainer;
