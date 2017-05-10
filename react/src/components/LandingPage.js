import React from 'react';
import { Link } from 'react-router';

import AlbumTile from './AlbumTile';

class LandingPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {},
      signedIn: false,
      search: {},
      albums: [],
      streamSearchShow: "invisible",
      newAlbums: []
    }

    this.getUserData = this.getUserData.bind(this)
    this.search = this.search.bind(this)
    this.albumSearch = this.albumSearch.bind(this)
    this.clickStreamSearch = this.clickStreamSearch.bind(this)
    this.streamSearch = this.streamSearch.bind(this)
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

  clickSearch() {
    $('html, body').animate({
      scrollTop: $("#search").offset().top
    }, 1500);
  }

  search(event) {
    if (event.target.value == "") {
      this.setState({
        albums: [],
        newAlbums: [],
        streamSearchShow: "invisible"
      })
    } else {
      let search = { search_text: event.target.value }
      this.setState({
        search: search,
        streamSearchShow: ""
      })
      this.albumSearch({ search: search })
    }
  }

  albumSearch(searchPayLoad) {
    fetch(`/api/v1/search/albums.json`, {
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
        this.setState({ albums: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  clickStreamSearch(event) {
    this.streamSearch({ search: this.state.search })
  }

  streamSearch(searchPayLoad) {
    fetch(`/api/v1/search/streams.json`, {
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
        this.setState({ newAlbums: body });
      })
      .then(() => {$(function(){ $("#albums").foundation(); });})
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getUserData();
    $(function(){ $(document).foundation(); });
    $(document).ready(function() {
      $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
    });
  }

  render() {
    let userDiv = () => {
      return(
        <div className="media-object">
          <div className="media-object-section" data-equalizer-watch="nav-eq">
            <a href="/users/auth/facebook">Sign in with Facebook</a>
          </div>
        </div>
      )
    }
    if (this.state.signedIn) {
      userDiv = () => {
        return(
          <div className="media-object">
            <div className="media-object-section text-right" data-equalizer-watch="nav-eq">
              <p>{this.state.currentUser.handle}</p>
              <a rel="nofollow" data-method="delete" href="/users/sign_out">Sign out</a>
            </div>
            <div className="media-object-section">
              <img className="landing-page-avatar" src={this.state.currentUser.image} alt="User Avatar" />
            </div>
          </div>
        )
      }
    }

    let albumSearch = this.state.albums.map((album) => {
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
    let albumShow = "invisible"
    if (this.state.albums.length !== 0) {
      albumShow = ""
    }

    let newAlbumSearch = this.state.newAlbums.map((album, index) => {
      return(
        <AlbumTile
          key={index}
          id={index}
          name={album.name}
          art={album.image_url}
          year={album.year}
          kind={album.kind}
          links={album.album_urls}
        />
      )
    })
    let newAlbumShow = "invisible"
    if (this.state.newAlbums.length !== 0) {
      newAlbumShow = ""
    }

    return(
      <div className="landing-page">
        <div className="landing-page-title">
          <div className="landing-page-nav flex-container align-justify" data-equalizer="nav-eq">
            <div className="media-object">
              <div className="media-object-section" data-equalizer-watch="nav-eq">
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
          <div className="row" onClick={this.clickSearch}>
            <form id="search" className="landing-page-search">
              <div className="input-group">
                <span className="input-group-label">Search for Albums:</span>
                <input className="input-group-field" type="text" onChange={this.search} />
              </div>
            </form>
          </div>
        </div>
        <div id="albums" data-equalizer="albums-eq">
          <div className={albumShow}>
            <div className="row">
              <h1>Albums</h1>
            </div>
            <br/>
            <div className="row">
              <div className="album-search">
                {albumSearch}
              </div>
            </div>
            <hr/><br/>
          </div>
          <div className={this.state.streamSearchShow}>
            <div className="row">
              <div className="small-12 columns button" onClick={this.clickStreamSearch}>
                Search Streaming Services
              </div>
            </div>
            <div className="row">
              <br/><br/>
            </div>
          </div>
          <div className={newAlbumShow}>
            <div className="row">
              <h1>New Albums</h1>
            </div>
            <br/>
            <div className="row">
              <div className="album-search">
                {newAlbumSearch}
              </div>
            </div>
            <hr/><br/>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;
