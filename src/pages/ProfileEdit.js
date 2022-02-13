import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
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
      isDisabled: true,
      clicked: false,
    };
  }

  componentDidMount() {
    this.profileInfo();
    // this.enableBtn();
  }

  enableBtn = () => {
    console.log('entrou');
    const {
      userName,
      userEmail,
      userDesc,
      userImg,
    } = this.state;

    if (userName && userEmail && userDesc && userImg) {
      this.setState({
        isDisabled: false,
      });
    }
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
    this.enableBtn();
  }

  onInputChange = ({ target }) => {
    const { value, id } = target;
    if (id === 'name') {
      this.setState({
        userName: value,
      });
    }
    if (id === 'email') {
      this.setState({
        userEmail: value,
      });
    }
    if (id === 'desc') {
      this.setState({
        userDesc: value,
      });
    }
    if (id === 'img') {
      this.setState({
        userImg: value,
      });
    }
    const {
      userName,
      userEmail,
      userDesc,
      userImg,
    } = this.state;

    if (userName && userEmail && userDesc && userImg) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleClick = async () => {
    this.setState({
      loading: true,
    });
    const {
      userName,
      userEmail,
      userDesc,
      userImg,
    } = this.state;
    const objInfo = {
      name: userName,
      email: userEmail,
      image: userImg,
      description: userDesc,
    };
    await updateUser(objInfo);
    this.setState({
      loading: true,
      clicked: true,
    });
  }

  render() {
    const {
      userName,
      userEmail,
      userDesc,
      userImg,
      loading,
      isDisabled,
      clicked,
    } = this.state;
    if (clicked) return <Redirect to="/profile" />;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">Profile</div>
        {loading ? <Loading /> : (
          <form>
            <input
              data-testid="edit-input-name"
              value={ userName }
              id="name"
              onChange={ this.onInputChange }
            />
            <input
              data-testid="edit-input-email"
              value={ userEmail }
              id="email"
              onChange={ this.onInputChange }
            />
            <input
              data-testid="edit-input-description"
              value={ userDesc }
              id="desc"
              onChange={ this.onInputChange }
            />
            <input
              data-testid="edit-input-image"
              value={ userImg }
              alt={ userName }
              id="img"
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Editar perfil
            </button>
            {/* {clicked && <Redirect to="/profile" />} */}
          </form>
        ) }
      </>
    );
  }
}
