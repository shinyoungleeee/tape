import React from 'react';
import { Link } from 'react-router';

class SongTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    let links = this.props.links.map(link => {
      return(
        <a href={link.url}><img className="song-url-logos" src={link.service + ".png"} alt={link.service + " logo"} /></a>
      )
    })
    return(
      <div className="row">
        <div className="media-object">
          <div className="media-object-section">
            <div className="thumbnail">
              <img className="song-album-cover" src={this.props.album.image_url} />
            </div>
          </div>
          <div className="media-object-section">
            <h4>{this.props.name}</h4>
            <h6>{this.props.album.name} (Disc {this.props.disc}, Track {this.props.track})</h6>
            {links}
          </div>
        </div>
      </div>
    )
  }
}

export default SongTile;
