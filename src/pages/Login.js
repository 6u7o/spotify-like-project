import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const {
      isDisabledP,
      handleClick,
      handleChange,
    } = this.props;

    return (
      <div
        data-testid="page-login"
      >
        <label htmlFor="nameInput">
          <input
            id="nameInput"
            data-testid="login-name-input"
            onChange={ handleChange }
          />
        </label>
        <button
          id="btnForm"
          type="button"
          aria-label="button"
          data-testid="login-submit-button"
          disabled={ isDisabledP }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  isDisabledP: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Login;
