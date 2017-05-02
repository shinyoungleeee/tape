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
        <div className="landing-page-title">
          <div className="landing-page-nav flex-container align-justify" data-equalizer>
            <div className="media-object">
              <div className="media-object-section middle" data-equalizer-watch>
                <p data-toggle="landing-page-nav-links">(+) Navigation</p>
              </div>
              <div className="not-visible" id="landing-page-nav-links" data-toggler="not-visible">
                <ul className="menu">
                  <li><Link to={'/albums'}>My Albums</Link></li>
                  <li><Link to={'/songs'}>My Songs</Link></li>
                  <li><Link to={'/artists'}>My Artists</Link></li>
                  <li><Link to={'/playlists'}>My Playlists/DJs</Link></li>
                </ul>
              </div>
            </div>
            <div>
              <h1>t a p e</h1>
            </div>
            <div className="media-object">
              <div className="media-object-section middle" data-equalizer-watch>
                <p>username</p>
              </div>
              <div className="media-object-section">
                <img className="landing-page-avatar" src="./tape-icon.png" alt="" />
              </div>
            </div>
          </div>
          <div className="row">
            <form className="landing-page-search">
              <div className="input-group">
                <input className="input-group-field" type="url" />
                <div className="input-group-button">
                  <input type="submit" className="button" value="Submit" />
                </div>
              </div>
            </form>
          </div>
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
