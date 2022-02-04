import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <header
        data-testid="header-component"
      >
        Header
        <p data-testid="header-user-name">
          {userName}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default Header;
