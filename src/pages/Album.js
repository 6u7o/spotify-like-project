import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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
    this.checkForAllSongs();
  }

  checkboxFunc = async ({ target }) => {
    this.setState({
      loading: true,
    });
    // https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
    // usei pra aprender a sintaxe para acumular dentro de um objeto
    this.setState((prevState) => ({
      allCheckboxes: {
        ...prevState.allCheckboxes,
        [target.name]: true,
      },
    }));

    const { id } = target;
    const { arrSongs } = this.state;
    const filteredSong = arrSongs.find((item) => item.trackId === Number(id));
    // addSong(filteredSong);

    const response = await addSong(filteredSong);
    if (response === 'OK') {
      return this.setState({
        loading: false,
        // received: true,
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
    // this.setState({
    //   allCheckboxes: newArr.reduce((acc, it) => {
    //     [...acc, it]
    //     return acc;
    //   }, []),
    // });
  }

  addSongs = () => {
    const { arrSongs, allCheckboxes } = this.state;

    // console.log(once);
    // console.log(arrSongs[2].trackName);
    // console.log(allCheckboxes[arrSongs[2].trackName]);
    // console.log(allCheckboxes);

    return arrSongs.filter((item) => item.trackName !== undefined).map((item) => (
      <MusicCard
        key={ item.trackId }
        musicName={ item.trackName }
        preview={ item.previewUrl }
        songId={ item.trackId }
        checkFunc={ this.checkboxFunc }
        isChecked={ allCheckboxes[item.trackName] }
      />
    ));
  }

  getStorageSongs = async () => {
    // const { allCheckboxes } = this.state;
    const response = await getFavoriteSongs();
    const onlyNames = response.map((item) => item.trackName);
    // console.log(allCheckboxes);
    // console.log(onlyNames);
    // this.setState({
    //   arrSongs: response,
    // });
    onlyNames.forEach((it) => {
      this.setState((prevState) => ({
        allCheckboxes: {
          ...prevState.allCheckboxes,
          [it]: true,
        },
      }));
    });

    // return arrSongs.filter((item) => item.trackName !== undefined).map((item) => (
    //   <MusicCard
    //     key={ item.trackId }
    //     musicName={ item.trackName }
    //     preview={ item.previewUrl }
    //     songId={ item.trackId }
    //     checkFunc={ this.checkboxFunc }
    //     isChecked={ allCheckboxes[item.trackName] }
    //   />
    // ));
  }

  render() {
    const { userNamePage, match } = this.props;

    const { id } = match.params;

    const {
      artistName,
      albumName,
      once,
      loading,
    } = this.state;

    if (once === 0) {
      this.albumSongsRequest(id);
      this.getStorageSongs();
    }

    // let songList;
    // if (once === 2) {
    //   songList = this.addSongs();
    //   // this.getStorageSongs();
    // }

    // if (once === 1) {
    //   this.checkForAllSongs();
    // }

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
              {this.addSongs()}
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
