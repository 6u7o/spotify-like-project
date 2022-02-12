import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.nameForHeader();
  }

  nameForHeader = async () => {
    this.setState({
      loading: true,
    });
    const response = await getUser();
    const reposName = await response.name;
    this.setState({
      userName: reposName,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
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
        {loading ? <Loading /> : (
          <p data-testid="header-user-name">
            {userName}
          </p>
        ) }
      </header>
    );
  }
}

export default Header;
