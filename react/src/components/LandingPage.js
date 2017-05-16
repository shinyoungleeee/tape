import React from 'react';
import { Link } from 'react-router';

import Dashboard from './Dashboard';
import AlbumTile from './AlbumTile';

class LandingPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: null,
      search: {},
      albums: [],
      streamSearchShow: "hide",
      newAlbums: []
    }

    this.getUserData = this.getUserData.bind(this)
    this.search = this.search.bind(this)
    this.albumSearch = this.albumSearch.bind(this)
    this.handleStreamSearch = this.handleStreamSearch.bind(this)
    this.streamSearch = this.streamSearch.bind(this)
    this.newAlbum = this.newAlbum.bind(this)
    this.like = this.like.bind(this)
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
    $('html, body').animate({ scrollTop: $(document).height() }, 2000)
    $('html, body').bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e) {
      if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
        $('html, body').stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
      }
    });
  }

  search(event) {
    if (event.target.value == "") {
      this.setState({
        albums: [],
        newAlbums: [],
        streamSearchShow: "hide"
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

  handleStreamSearch(event) {
    event.preventDefault();
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

  newAlbum(album) {
    fetch(`/api/v1/albums.json`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ album: album })
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
      .then(() => {
        this.albumSearch({ search: this.state.search })
        this.streamSearch({ search: this.state.search })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  like(albumId) {
    fetch(`/api/v1/albums/${albumId}/like.json`, {
      credentials: 'same-origin'
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
      .then(() => {
        this.albumSearch({ search: this.state.search })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getUserData();
    let tStart = 0
      , tEnd = 500
      , cStart = [27, 27, 27]
      , cEnd = [255, 255, 255]
      , cDiff = [cEnd[0] - cStart[0], cEnd[1] - cStart[1], cEnd[2] - cStart[2]];
    $(() => {
      $(document).foundation();
      $(document).scroll(function() {
        let p = ($(this).scrollTop() - tStart) / (tEnd - tStart);
        p = Math.min(1, Math.max(0, p));
        let cBg = [Math.round(cStart[0] + cDiff[0] * p), Math.round(cStart[1] + cDiff[1] * p), Math.round(cStart[2] + cDiff[2] * p)];
        $("#landing-page").css('background-color', 'rgb(' + cBg.join(',') +')');
        $('#search').css({ 'marginTop' : `${380 * p}px` });
        $('#fade').css({ 'opacity' : p });
      });
    });
  }

  render() {
    let userDiv = () => {
      return(
        <div className="media-object">
          <div className="media-object-section">
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
            <div className="media-object-section text-right middle">
              <p>{this.state.currentUser.handle}</p>
              <a rel="nofollow" data-method="delete" href="/users/sign_out">Sign out</a>
            </div>
            <div className="media-object-section">
              <img className="landing-page-avatar" src={this.state.currentUser.image + "/picture?type=large"} alt="User Avatar" />
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
        return like.is_current_user && like.like === "liked"
      })
      if (user_liked) {
        likeButton = "liked"
      }
      let clickLikeHandler = () => {
        this.like(album.id)
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
          clickLikeHandler={clickLikeHandler}
        />
      )
    })
    let albumShow = "hide"
    if (this.state.albums.length !== 0) {
      albumShow = ""
    }

    let newAlbumSearch = this.state.newAlbums.map((album, index) => {
      let likeButton = "unliked"
      let user_liked = album.album_likes.some(like => {
        return like.is_current_user && like.like === "liked"
      })
      if (user_liked) {
        likeButton = "liked"
      }
      let clickLikeHandler = () => {
        this.newAlbum(album)
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
          clickLikeHandler={clickLikeHandler}
        />
      )
    })
    let newAlbumShow = "hide"
    if (this.state.newAlbums.length !== 0) {
      newAlbumShow = ""
    }

    return(
      <div id="landing-page">
        <div id="landing-page-title">
          <div className="landing-page-nav flex-container align-justify">
            <div className="media-object">
              <div className="media-object-section">
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
          <div className="row landing-page-search">
            <form id="search" onSubmit={this.handleStreamSearch}>
              <div className="input-group">
                <span className="input-group-label">Search for Albums:</span>
                <input className="input-group-field" type="text" placeholder="Search by Album Title or Artist Name" onChange={this.search} onClick={this.clickSearch} />
                <div className={"input-group-button " + this.state.streamSearchShow}>
                  <input type="submit" className="button" value="Search Streaming Services" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div id="landing-page-search-results">
          <div id="fade">
            <Dashboard />
          </div>
          <div className="row">
            <br/><br/>
          </div>
          <div id="albums-results">
            <div className={albumShow}>
              <div className="row">
                <div className="small-2 columns">
                  <h3>Current Tapes:</h3>
                </div>
                <div className="small-10 columns">
                  <div className="album-search">
                    {albumSearch}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="new-albums-results">
            <div className={newAlbumShow}>
              <div className="row">
                <div className="small-2 columns">
                  <h3>New Tapes:</h3>
                </div>
                <div className="small-10 columns">
                  <div className="album-search">
                    {newAlbumSearch}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;
