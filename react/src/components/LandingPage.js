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
          <h1>t a p e</h1>
        </div>
        <div>
          <div id="albums" className="row">
            <h1>Albums</h1>
          </div>
          <div id="songs" className="row">
            <h1>Songs</h1>
          </div>
          <div id="artists" className="row">
            <h1>Artists</h1>
          </div>
          <div id="playlists" className="row">
            <h1>Playlists/DJs</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;
