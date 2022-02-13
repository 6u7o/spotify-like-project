import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
    };
  }

  async componentDidMount() {
    const arr = await getFavoriteSongs();
    this.setState({
      songs: arr,
      loading: false,
    });
  }

  checkboxFunc = async ({ target }) => {
    this.setState({
      loading: true,
    });
    console.log(target);
    const { name, checked } = target;
    const { songs } = this.state;
    const filteredSong = songs.find((item) => item.trackName === name);
    if (checked) {
      this.setState((prevState) => ({
        songs: [...prevState.songs, filteredSong],
      }));
      const response = await addSong(filteredSong);
      if (response === 'OK') {
        return this.setState({
          loading: false,
        });
      }
    } else {
      const newArr = songs.filter((it) => it.trackId !== filteredSong.trackId);
      const response2 = await removeSong(filteredSong);
      this.setState({
        songs: newArr,
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

  render() {
    const { songs, loading } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <>
            <div data-testid="page-favorites">Favorites</div>
            <div>
              {songs.map((item) => (
                <MusicCard
                  key={ item.trackId }
                  musicName={ item.trackName }
                  preview={ item.previewUrl }
                  songId={ item.trackId }
                  checkFunc={ this.checkboxFunc }
                  isChecked={ songs
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
