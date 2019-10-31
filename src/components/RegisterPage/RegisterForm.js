import React, { Component } from 'react';
import { FromStyled, FormErrorStyled } from '../LoginPage/LoginStyled';
import Button from '../Button/Button';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import validateEmailField from '../EmailInput/EmailHelper';
import { validateRegisterPassword } from '../PasswordInput/PasswordHelper';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      },
      generalError: '',
      showPassword: false
    };
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  validateEmail = () => {
    const { email, errors } = this.state;
    const message = validateEmailField(email);
    this.setState(() => ({
      errors: {
        ...errors,
        email: message
      }
    }));
  };

  validatePassword = () => {
    const { password, errors } = this.state;
    const message = validateRegisterPassword(password);
    this.setState(() => ({
      errors: {
        ...errors,
        password: message
      }
    }));
  };

  validateFields = () => {
    const { email, password } = this.state;
    const errorFields = {
      email: validateEmailField(email),
      password: validateRegisterPassword(password)
    };
    this.setState({ errors: errorFields });
    return !Object.keys(errorFields).find(key => errorFields[key] !== '');
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateFields()) {
      this.register();
    }
  };

  register = async () => {
    // TODO: register logic after pass validation
    // if not successful register
    // this.setState({
    //   generalError: 'Wrong data'
    // });
  };

  render() {
    const { email, password, errors, generalError, showPassword } = this.state;
    return (
      <FromStyled onSubmit={this.handleSubmit} noValidate>
        <FormErrorStyled>{generalError}</FormErrorStyled>
        <EmailInput
          value={email}
          onChange={e => this.setState({ email: e })}
          onBlur={this.validateEmail}
          error={errors.email}
        />
        <PasswordInput
          value={password}
          onChange={e => this.setState({ password: e })}
          onBlur={this.validatePassword}
          error={errors.password}
          showVisibilityIcon
          showPassword={showPassword}
          handleClickShowPassword={this.handleClickShowPassword}
        />
        <Button type="submit">Register</Button>
      </FromStyled>
    );
  }
}

export default RegisterForm;