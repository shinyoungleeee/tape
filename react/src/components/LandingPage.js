import React from 'react';
import { Link } from 'react-router';

import AlbumTile from './AlbumTile';

class LandingPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {},
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
        this.setState({ currentUser: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  clickSearch(event) {
    event.preventDefault();
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
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  like() {
    
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
          <div className="media-object-section" data-equalizer-watch>
            <a href="/users/auth/facebook">Sign in with Facebook</a>
          </div>
        </div>
      )
    }
    let userLinks = () => {
      return(
        <ul className="menu invisible">
          <li className="menu-text">: </li>
          <li><Link to={'/groups'}>My Groups</Link></li>
          <li><Link to={'/albums'}>My Albums</Link></li>
          <li><Link to={'/artists'}>My Artists</Link></li>
        </ul>
      )
    };
    if (this.state.currentUser) {
      userDiv = () => {
        return(
          <div className="media-object">
            <div className="media-object-section text-right" data-equalizer-watch>
              <p>{this.state.currentUser.handle}</p>
              <a rel="nofollow" data-method="delete" href="/users/sign_out">Sign out</a>
            </div>
            <div className="media-object-section">
              <img className="landing-page-avatar" src={this.state.currentUser.image} alt="User Avatar" />
            </div>
          </div>
        )
      }

      userLinks = () => {
        return(
          <ul className="menu">
            <li className="menu-text">{this.state.currentUser.handle}: </li>
            <li><Link to={'/groups'}>My Groups</Link></li>
            <li><Link to={`users/${this.state.currentUser.id}/albums`}>My Albums</Link></li>
            <li><Link to={'/artists'}>My Artists</Link></li>
          </ul>
        )
      }
    }

    let albumSearch = this.state.albums.map((album) => {
      let likeButton = "unliked"
      let user_liked = album.album_likes.some(like => {
        return like.is_current_user
      })
      if (user_liked) {
        likeButton = "liked"
      }
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
          likeButton={likeButton}
        />
      )
    })
    let albumShow = "invisible"
    if (this.state.albums.length !== 0) {
      albumShow = ""
    }

    let newAlbumSearch = this.state.newAlbums.map((album, index) => {
      let likeButton = "unliked"
      let user_liked = album.album_likes.some(like => {
        return like.is_current_user
      })
      if (user_liked) {
        likeButton = "liked"
      }
      return(
        <AlbumTile
          key={index}
          id={index}
          name={album.name}
          art={album.image_url}
          year={album.year}
          kind={album.kind}
          artists={album.artists}
          links={album.album_urls}
          likeButton={likeButton}
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
          <div className="landing-page-nav flex-container align-justify" data-equalizer>
            <div className="media-object">
              <div className="media-object-section" data-equalizer-watch>
                <p data-toggle="landing-page-nav-links">(+) Navigation</p>
                  <div className="not-visible" id="landing-page-nav-links" data-toggler="not-visible">
                    <ul className="menu">
                      <li className="menu-text">Global: </li>
                      <li><a href="#" onClick={this.clickSearch}>Search</a></li>
                      <li><Link to={'/groups'}>Groups</Link></li>
                      <li><Link to={'/albums'}>Albums</Link></li>
                      <li><Link to={'/artists'}>Artists</Link></li>
                    </ul>
                    {userLinks()}
                  </div>
              </div>
            </div>
            <div>
              <h1>t a p e</h1>
            </div>
            {userDiv()}
          </div>
          <div className="row landing-page-search" onClick={this.clickSearch}>
            <form id="search">
              <div className="input-group">
                <span className="input-group-label">Search for Albums:</span>
                <input className="input-group-field" type="text" placeholder="Search by Album Title or Artist Name" onChange={this.search} />
              </div>
            </form>
          </div>
        </div>
        <div id="albums">
          <div className={albumShow}>
            <div className="row">
              <h1>Albums</h1>
            </div>
            <br/>
            <div className="row large-up-4">
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
