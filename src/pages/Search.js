import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
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
    // console.log(response);
    this.setState({
      inputValue: '',
    });
  }

  render() {
    const { userNamePage } = this.props;

    const {
      btnDisabled,
      inputValue,
      loading,
      responseText,
      arrAlb,
    } = this.state;

    return (
      <>
        {loading ? <Loading /> : (
          <>
            <Header userName={ userNamePage } />
            <div
              data-testid="page-search"
            >
              search
            </div>
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
            {arrAlb.length !== 0 ? responseText : null}
            {arrAlb.length === 0 ? 'Nenhum álbum foi encontrado' : arrAlb.map((it) => (
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
            ))}
          </>
        )}

        {/* <Header userName={ userNamePage } />
        <div
          data-testid="page-search"
        >
          search
        </div>
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
        </form> */}
      </>
    );
  }
}

Search.propTypes = {
  userNamePage: PropTypes.string.isRequired,
};

export default Search;
