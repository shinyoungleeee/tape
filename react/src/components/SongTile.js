import React from 'react';
import { Link } from 'react-router';

class SongTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    // let discAndTrack = ``
    // if (this.props.disc != 0) {
    //   discAndTrack = `D${this.props.disc}T${this.props.track}`
    // } else {
    //   discAndTrack = `T${this.props.track}`
    // }
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
            {links}
          </div>
          <div className="media-object-section">
            <h5>{this.props.name}</h5>
            <p>{this.props.album.name}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SongTile;
