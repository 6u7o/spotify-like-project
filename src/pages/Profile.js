import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userDesc: '',
      userImg: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.profileInfo();
  }

  profileInfo = async () => {
    this.setState({
      loading: true,
    });
    const response = await getUser();
    this.setState({
      userName: response.name,
      userEmail: response.email,
      userDesc: response.description,
      userImg: response.image,
      loading: false,
    });
  }

  render() {
    const {
      userName,
      userEmail,
      userDesc,
      userImg,
      loading,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">Profile</div>
        {loading ? <Loading /> : (
          <div>
            <p>{ userName }</p>
            <p>{ userEmail }</p>
            <p>{ userDesc }</p>
            <img data-testid="profile-image" src={ userImg } alt={ userName } />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        ) }
      </>
    );
  }
}
