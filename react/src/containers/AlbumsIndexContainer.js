import React from 'react';
import { Link } from 'react-router';
import AlbumTile from '../components/AlbumTile';

class AlbumsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let albums = this.props.albums.map(album => {
      let likeButton = "unliked"
      let user_liked = album.album_likes.some(like => {
        return like.is_current_user && like.like === "liked"
      })
      if (user_liked) {
        likeButton = "liked"
      }
      let clickLikeHandler = () => {
        this.props.like(album.id)
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
          likeCount={album.like_count}
          clickLikeHandler={clickLikeHandler}
        />
      )
    })
    return(
      <div id="albums">
        <div className="row align-center">
          <h3>{this.props.scope} Albums</h3>
        </div>
        <hr width="25%" /><br/>
        <div className="row small-up-2 medium-up-3 large-up-4">
          {albums}
        </div>
      </div>
    )
  }
}

export default AlbumsIndexContainer;
