import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      info: { name: null },
      isDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    const minInput = 3;
    if (value.length >= minInput) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
    this.setState({
      info: { name: value },
    });
  }

  onClick = async () => {
    console.log('bruh');
    this.setState({
      loading: true,
    });
    const { info } = this.state;
    const response = await createUser(info);
    if (response === 'OK') {
      this.setState({
        loading: false,
        redirect: true,
      });
    }
  }

  render() {
    const {
      // name,
      isDisabled,
      loading, /*  vou usar quandi por o Header */
      redirect, /*  vou usar pra quando tiver que mandar pro search */
    } = this.state;

    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div
            data-testid="page-login"
          >
            <label htmlFor="nameInput">
              <input
                id="nameInput"
                data-testid="login-name-input"
                onChange={ this.onInputChange }
              // value={ name }
              />
            </label>
            <button
              id="btnForm"
              type="button"
              aria-label="button"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.onClick }
            >
              Entrar
            </button>
          </div>
        )}
      </>
    );
  }
}
