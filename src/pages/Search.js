import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
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
  }

  render() {
    const { userNamePage } = this.props;
    const { btnDisabled } = this.state;
    return (
      <>
        <Header userName={ userNamePage } />
        <div
          data-testid="page-search"
        >
          search
        </div>
        <form>
          <input
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            disabled={ btnDisabled }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </>
    );
  }
}

Search.propTypes = {
  userNamePage: PropTypes.string.isRequired,
};

export default Search;
