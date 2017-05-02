import React from 'react';
import { Link } from 'react-router';

class LandingPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <div className="landing-page">
        <div className="landing-page-title" data-equalizer>
          <div className="float-left middle">
            <div className="landing-page-nav media-object" data-toggle="landing-page-nav-dropdown">
              <div className="media-object-section middle" data-equalizer-watch>
                <p>(+) Navigation</p>
              </div>
              <div className="dropdown-pane" id="landing-page-nav-dropdown" data-dropdown>
                <ul className="menu vertical">
                  <li><a href="#albums">Albums</a></li>
                  <li><a href="#songs">Songs</a></li>
                  <li><a href="#artists">Artists</a></li>
                  <li><a href="#playlists">Playlists/DJs</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="float-right">
            <div className="landing-page-user media-object" data-toggle="landing-page-user-dropdown">
              <div className="media-object-section middle" data-equalizer-watch>
                <p>username</p>
              </div>
              <div className="media-object-section">
                <img className="landing-page-avatar" src="./tape-icon.png" alt="" />
              </div>
              <div className="dropdown-pane" id="landing-page-user-dropdown" data-dropdown>
                <ul className="menu vertical">
                  <li><Link to={'/albums'}>My Albums</Link></li>
                  <li><Link to={'/songs'}>My Songs</Link></li>
                  <li><Link to={'/artists'}>My Artists</Link></li>
                  <li><Link to={'/playlists'}>My Playlists/DJs</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <h1>t a p e</h1>
        </div>
        <div>
          <br/><hr/><br/>
          <div id="albums" className="row">
            <h1>Albums</h1>
          </div>
          <br/><hr/><br/>
          <div id="songs" className="row">
            <h1>Songs</h1>
          </div>
          <br/><hr/><br/>
          <div id="artists" className="row">
            <h1>Artists</h1>
          </div>
          <br/><hr/><br/>
          <div id="playlists" className="row">
            <h1>Playlists/DJs</h1>
          </div>
          <br/><hr/><br/>
        </div>
      </div>
    )
  }
}

export default LandingPage;
