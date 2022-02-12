import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      arrSongs: [],
      artistName: '',
      albumName: '',
      once: 0,
      loading: false,
      allCheckboxes: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const response2 = await getFavoriteSongs();
    const response = await getMusics(id);

    const artist = response[0].artistName;
    const album = response[0].collectionName;
    this.setState({
      artistName: artist,
      albumName: album,
      arrSongs: response,
      allCheckboxes: response2,
    });
  }

  albumSongsRequest = async (albumId) => {
    const response = await getMusics(albumId);

    const artist = response[0].artistName;
    const album = response[0].collectionName;
    this.setState({
      artistName: artist,
      albumName: album,
      arrSongs: response,
    });
    this.setState((prev) => ({
      once: prev.once + 1,
    }));
  }

  checkboxFunc = async ({ target }) => {
    this.setState({
      loading: true,
    });

    const { name, checked } = target;
    const { arrSongs, allCheckboxes } = this.state;
    const filteredSong = arrSongs.find((item) => item.trackName === name);
    if (checked) {
      this.setState((prevState) => ({
        allCheckboxes: [...prevState.allCheckboxes, filteredSong],
      }));
      const response = await addSong(filteredSong);
      if (response === 'OK') {
        return this.setState({
          loading: false,
        });
      }
    } else {
      const newArr = allCheckboxes.filter((it) => it.trackId !== filteredSong.trackId);
      const response2 = await removeSong(filteredSong);
      this.setState({
        allCheckboxes: newArr,
      });
      if (response2 === 'OK') {
        return this.setState({
          loading: false,
        });
      }
    }
    if (response === 'OK') {
      return this.setState({
        loading: false,
      });
    }
  }

  checkForAllSongs = () => {
    const { arrSongs } = this.state;

    const newArr = arrSongs.filter((item) => item.trackName !== undefined);
    this.setState({
      allCheckboxes: newArr.reduce((acc, it) => {
        acc[it.trackName] = false;
        return acc;
      }, {}),
    });
  }

  render() {
    const { userNamePage } = this.props;
    const { arrSongs, allCheckboxes } = this.state;

    const {
      artistName,
      albumName,
      loading,
    } = this.state;
    return (
      <>
        <Header userName={ userNamePage } />
        {loading ? <Loading /> : (
          <>
            <div
              data-testid="page-album"
            >
              Album
              {<p data-testid="artist-name">{artistName}</p>}
              {<p data-testid="album-name">{albumName}</p>}
            </div>
            <div>
              {arrSongs.filter((item) => item.trackName !== undefined).map((item) => (
                <MusicCard
                  key={ item.trackId }
                  musicName={ item.trackName }
                  preview={ item.previewUrl }
                  songId={ item.trackId }
                  checkFunc={ this.checkboxFunc }
                  isChecked={ allCheckboxes
                    .some((it) => it.trackName === item.trackName) }

                />
              ))}
            </div>
          </>
        )}
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
