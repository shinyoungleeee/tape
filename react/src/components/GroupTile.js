import React from 'react';
import { Link } from 'react-router';

class GroupTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    let imageLimit = 1;
    if (this.props.albums.length >= 9) {
      imageLimit = 9
    } else if (this.props.albums.length >= 4) {
      imageLimit = 4
    } else {
      imageLimit = 1
    }
    let images = []
    for (let i = 0; i < imageLimit; i++) {
      images.push(<img src={this.props.albums[i].image_url} />)
    }
    return(
      <div className="column column-block text-center">
        <Link to={`groups/${this.props.id}/albums`}>
          <h3>{this.props.name}</h3>
          <p><strong>Creator:</strong> {this.props.creator}</p>
          <div className={"thumbnail group-image-container images-" + imageLimit}>
            {images}
          </div>
        </Link>
      </div>
    )
  }
}

export default GroupTile;
