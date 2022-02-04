import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    const { userNamePage } = this.props;
    return (
      <>
        <Header userName={ userNamePage } />
        <div
          data-testid="page-album"
        >
          Album
        </div>
      </>
    );
  }
}

Album.propTypes = {
  userNamePage: PropTypes.string.isRequired,
};

export default Album;
