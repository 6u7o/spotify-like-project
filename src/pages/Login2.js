import React from 'react';
// import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      info: '',
      isDisabled: true,
      logged: false,
    };
  }

  // componentWillUnmount() {
  //   loading ...
  // }

  onInputChange = ({ target }) => {
    const { value } = target;
    const minInput = 3;
    if (value.length >= minInput) {
      this.setState({
        isDisabled: false,
      });
    }
    this.setState({
      info: { name: value },
    }/* , () => this.log() */);
  }

  // log = () => {
  //   const { info } = this.state;
  //   console.log(info);
  // }

  onClick = () => {
    const { info } = this.state;
    createUser(info);
    this.setState({
      logged: true,
    });
  }

  isLogged = () => {
    const { logged } = this.state;
    return logged;
  }

  render() {
    const {
      isDisabled,
      // info,
    } = this.state;
    return (
      <div
        data-testid="page-login"
      >
        <label htmlFor="nameInput">
          <input
            id="nameInput"
            data-testid="login-name-input"
            onChange={ this.onInputChange }
          />
        </label>
        <button
          id="btnForm"
          type="button"
          aria-label="button"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ () => this.onClick()/* () => createUser(info) */ }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
