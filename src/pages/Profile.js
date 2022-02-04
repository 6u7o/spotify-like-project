import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    const { userNamePage } = this.props;
    return (
      <>
        <Header userName={ userNamePage } />
        <div
          data-testid="page-profile"
        >
          Profile
        </div>
      </>
    );
  }
}

Profile.propTypes = {
  userNamePage: PropTypes.string.isRequired,
};

export default Profile;
