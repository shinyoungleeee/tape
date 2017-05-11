import React from 'react';
import { Link } from 'react-router';
import AlbumTile from '../components/AlbumTile';

class AlbumsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let albums = this.props.albums.map(album => {
      return(
        <AlbumTile
          key={album.id}
          id={album.id}
          name={album.name}
          art={album.image_url}
          year={album.year}
          kind={album.kind}
          artists={album.artists}
          links={album.album_urls}
        />
      )
    })
    return(
      <div className="albums">
        <div className="row align-center">
          <h3>{this.props.user} Albums</h3>
        </div>
        <hr width="25%" /><br/>
        <div className="row small-up-2 medium-up-3 large-up-4">
          {albums}
        </div>
      </div>
    )
  }
}

export default AlbumsIndexContainer;
