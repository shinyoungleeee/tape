import React from 'react';
import { Link } from 'react-router';

class AlbumTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    let links = this.props.links.map(link => {
      return(
        <a href={link.url}><img className="album-url-logos" src={"/" + link.service + ".png"} alt={link.service + " Logo"} /></a>
      )
    })

    let artists = this.props.artists.map(artist => {
      return(
        <h6>{artist.name}</h6>
      )
    })
    return(
      <div className="column column-block">
        <div className="album-container">
          <img src={this.props.art} className="thumbnail album-art" alt={this.props.name + " Album Art"} />
          <div className="album-overlay">
            <div className="album-text">
              <h5>{this.props.name}</h5>
              <hr width="50%" />
              {artists}
            </div>
            <img className={"like-button " + this.props.likeButton} src={"/" + this.props.likeButton + ".png"} alt={this.props.likeButton + " button"} onClick={this.props.clickLikeHandler} />
          </div>
        </div>
        <div className="text-center">
          {links}
        </div>
      </div>
    )
  }
}

export default AlbumTile;
