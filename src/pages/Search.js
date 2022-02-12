import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      inputValue: '',
      loading: false,
      responseText: '',
      arrAlb: [],
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const minInput = 2;
    if (value.length >= minInput) {
      this.setState({
        btnDisabled: false,
      });
    }
    this.setState({
      inputValue: value,
    });
  }

  clickSearchRequest = async () => {
    const { inputValue } = this.state;
    this.setState({
      loading: true,
    });
    const response = await searchAlbumsAPI(inputValue);
    if (response) {
      this.setState({
        loading: false,
        responseText: `Resultado de álbuns de: ${inputValue}`,
        arrAlb: response,
      });
    }
    this.setState({
      inputValue: '',
    });
  }

  render() {
    const {
      btnDisabled,
      inputValue,
      loading,
      responseText,
      arrAlb,
    } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">Search</div>
        <form>
          <input
            value={ inputValue }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            disabled={ btnDisabled }
            onClick={ this.clickSearchRequest }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
        <p>{responseText}</p>
        {loading ? <Loading /> : (
          <div>
            {arrAlb.length === 0 ? 'Nenhum álbum foi encontrado' : (
              arrAlb.map((it) => (
                <div
                  key={ it.collectionId }
                >
                  <Link
                    data-testid={ `link-to-album-${it.collectionId}` }
                    to={ `/album/${it.collectionId}` }
                  >
                    {it.collectionName}
                  </Link>
                  <img
                    src={ it.artworkUrl100 }
                    alt={ it.collectionName }
                  />
                  <p>
                    {it.artistName}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </>
    );
  }
}
