import React from 'react';
import { Link } from 'react-router';

import AlbumTile from './AlbumTile';

class LandingPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {},
      signedIn: false,
      albums: []
    }

    this.getUserData = this.getUserData.bind(this)
    this.search = this.search.bind(this)
  }

  getUserData() {
    fetch(`/api/v1/users.json`, {credentials: 'same-origin'})
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
        this.setState({
          currentUser: body.current_user,
          signedIn: body.signed_in
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  search(event) {
    if (event.target.value == "") {
      this.setState({ albums: [] })
    } else {
      let searchPayLoad = {
        search: {
          search_text: event.target.value
        }
      }
      fetch(`/api/v1/search.json`, {
        credentials: 'same-origin',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchPayLoad)
      })
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
          this.setState({
            albums: body
          });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  componentDidMount() {
    this.getUserData();
    $(function(){ $(document).foundation(); });
  }

  render() {
    let userDiv = () => {
      return(
        <div className="media-object">
          <div className="media-object-section" data-equalizer-watch>
            <a href="/users/auth/facebook">Sign in with Facebook</a>
          </div>
        </div>
      )
    }
    if (this.state.signedIn) {
      userDiv = () => {
        return(
          <div className="media-object">
            <div className="media-object-section text-right" data-equalizer-watch>
              <p>{this.state.currentUser.handle}</p>
              <a rel="nofollow" data-method="delete" href="/users/sign_out">Sign out</a>
            </div>
            <div className="media-object-section">
              <img className="landing-page-avatar" src={this.state.currentUser.image} alt="" />
            </div>
          </div>
        )
      }
    }

    let searchResult = this.state.albums.map((album) => {
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
      <div className="landing-page">
        <div className="landing-page-title">
          <div className="landing-page-nav flex-container align-justify" data-equalizer>
            <div className="media-object">
              <div className="media-object-section" data-equalizer-watch>
                <p data-toggle="landing-page-nav-links">(+) Navigation</p>
                  <div className="not-visible" id="landing-page-nav-links" data-toggler="not-visible">
                    <ul className="menu">
                      <li><Link to={'/albums'}>My Albums</Link></li>
                      <li><Link to={'/songs'}>My Songs</Link></li>
                      <li><Link to={'/artists'}>My Artists</Link></li>
                      <li><Link to={'/playlists'}>My Playlists/DJs</Link></li>
                    </ul>
                  </div>
              </div>
            </div>
            <div>
              <h1>t a p e</h1>
            </div>
            {userDiv()}
          </div>
          <div className="row">
            <form className="landing-page-search">
              <div className="input-group">
                <span className="input-group-label">Search for Albums:</span>
                <input className="input-group-field" type="text" onChange={this.search} />
              </div>
            </form>
          </div>
        </div>
        <div>
          <br/><hr/><br/>
          <div id="albums" className="row">
            <h1>Albums</h1>
          </div>
          <div className="row small-up-2 medium-up-3 large-up-4">
            {searchResult}
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
