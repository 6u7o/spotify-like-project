import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      arrSongs: [],
      artistName: '',
      albumName: '',
      once: 0,
    };
  }

  // componentDidMount() {
  //   // this.albumSongsRequest();
  //   console.log('montei');
  // }

  // componentDidUpdate() {
  //   console.log('atualizei');
  // }

  // componentWillUnmount() {
  //   // this.albumSongsRequest();
  //   console.log('vou desmontar');
  // }

  albumSongsRequest = async (albumId) => {
    // const { arrSongs } = this.state;
    const response = await getMusics(albumId);

    // console.log('response original', response);
    // response.shift();
    const artist = response[0].artistName;
    const album = response[0].collectionName;
    this.setState({
      artistName: artist,
      albumName: album,
      once: 1,
      arrSongs: response,
    });
    // response.shift();
    // console.log('response cortado', response);
    // this.setState((item));
    // console.log(this.state.arrSongs);
  }

  addSongs = () => {
    const { arrSongs } = this.state;
    // console.log(arrSongs);
    return arrSongs.filter((item) => item.trackName !== undefined).map((item) => (
      <MusicCard
        key={ item.trackId }
        musicName={ item.trackName }
        preview={ item.previewUrl }
      />
    ));
  }

  // logOnLoad = (string) => {
  //   console.log(string);
  // }

  render() {
    const { userNamePage, match } = this.props;

    const { id } = match.params;
    // console.log(id);
    // console.log(getMusics(id));

    const {
      artistName,
      albumName,
      once,
    } = this.state;

    if (once === 0) {
      this.albumSongsRequest(id);
    }

    return (
      <>
        <Header userName={ userNamePage } />
        <div
          data-testid="page-album"
          // onLoad={ this.albumSongsRequest(id) }
        >
          Album
          {<p data-testid="artist-name">{artistName}</p>}
          {<p data-testid="album-name">{albumName}</p>}
        </div>
        <div>
          {this.addSongs()}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  userNamePage: PropTypes.string.isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: { id: PropTypes.string },
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Album;
