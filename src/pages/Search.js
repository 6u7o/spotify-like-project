import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { userNamePage } = this.props;
    return (
      <>
        <Header userName={ userNamePage } />
        <div
          data-testid="page-search"
        >
          search
        </div>
      </>
    );
  }
}

Search.propTypes = {
  userNamePage: PropTypes.string.isRequired,
};

export default Search;
