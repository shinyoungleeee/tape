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
        <a href={link.url}>{link.service}</a>
      )
    })
    return(
      <div className="row">
        <div className="media-object">
          <div className="media-object-section">
            <div className="thumbnail">
              <img className="song-album-cover" src="/assets/tape.jpg" />
            </div>
          </div>
          <div className="media-object-section">
            <h4>{this.props.name}</h4>
            {links}
          </div>
        </div>
      </div>
    )
  }
}

export default SongTile;
