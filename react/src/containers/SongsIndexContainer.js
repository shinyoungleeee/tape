import React from 'react';
import { Link } from 'react-router';
import SongTile from '../components/SongTile'

class SongsIndexContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      songs: []
    }
  }

  componentDidMount() {
    fetch('/api/songs.json')
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
        this.setState({ songs: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let songs = this.state.songs.map(song => {
      return(
        <SongTile
          key={song.id}
          id={song.id}
          name={song.name}
          links={song.song_urls}
        />
      )
    })
    return(
      <div>
        {songs}
      </div>
    )
  }
}

export default SongsIndexContainer;

// let songs = this.state.songs
// let tiles = []
// for (let i = 0; i < songs.length; i += 3) {
//   let id2, name2, id3, name3;
//   let links2 = []
//   let links3 = []
//   if (songs[i + 1]) {
//     id2 = songs[i + 1].id
//     name2 = songs[i + 1].name
//     links2 = songs[i + 1].song_urls
//   }
//   if (songs[i + 2]) {
//     id3 = songs[i + 2].id
//     name3 = songs[i + 2].name
//     links3 = songs[i + 2].song_urls
//   }
//   tiles.push(
//     <div className="row text-center">
//       <SongTile
//         key={songs[i].id}
//         id={songs[i].id}
//         name={songs[i].name}
//         links={songs[i].song_urls}
//       />
//       <SongTile
//         key={id2}
//         id={id2}
//         name={name2}
//         links={links2}
//       />
//       <SongTile
//         key={id3}
//         id={id3}
//         name={name3}
//         links={links3}
//       />
//     </div>
//   )
// }



// let rows = []
// while (songs.length > 0) {
//   rows.push(songs.splice(0, 3))
// }
// rows.map(row => {
//   return(
//     <div className="row text-center">
//       {row}
//     </div>
//   )
// })
