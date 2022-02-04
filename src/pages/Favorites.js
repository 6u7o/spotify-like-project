import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    const { userNamePage } = this.props;
    return (
      <>
        <Header userName={ userNamePage } />
        <div
          data-testid="page-favorites"
        >
          Favorites
        </div>
      </>
    );
  }
}

Favorites.propTypes = {
  userNamePage: PropTypes.string.isRequired,
};

export default Favorites;
