import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    const { userNamePage } = this.props;
    return (
      <div
        data-testid="page-profile-edit"
      >
        <Header userName={ userNamePage } />
        ProfileEdit
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  userNamePage: PropTypes.string.isRequired,
};

export default ProfileEdit;
