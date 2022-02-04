import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <header
        data-testid="header-component"
      >
        Header
        <Link
          data-testid="link-to-search"
          to="/search"
        >
          Search
        </Link>
        <Link
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Favorites
        </Link>
        <Link
          data-testid="link-to-profile"
          to="/profile"
        >
          Profile
        </Link>
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
