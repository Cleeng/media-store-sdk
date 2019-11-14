import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import EmailInput from '../EmailInput/EmailInput';
import LoginForm from './LoginForm';
import PasswordInput from '../PasswordInput/PasswordInput';

jest.mock('axios', () => ({
  get: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: { required: false } }))
}));
const mockInputValue = 'MOCK_INPUT_VALUE';
const mockEmailValue = 'mockmail@mock.com';
const mockNotValidEmail = 'mock';
const onSubmitMock = jest.fn().mockImplementation(
  () =>
    new Promise(resolve => {
      resolve(false);
    })
);
jest.spyOn(window.localStorage.__proto__, 'setItem'); // eslint-disable-line
const jwtMock =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNjkwNjI0MjU1IiwicHVibGlzaGVySWQiOjEyMDM1NTU1OX0.EvaMwJ1ZtGR4TNujmROVxiXhiHxzTOp0vgCJPoScXW2bBSroAGsm8kLe-ivnqQ9xoiHJWtDRYZGLKSGASFVuo0bqJT2ZzVEohvCPRwMke0R87p_eaTztWvAUjhbUP0Dk9xo8_AeDvEIDmGln_NXJvTTn6EqU_Xk2Zq3W29_WtbEOjfPplCp49gerR_VpnWA36yTUhfF2sWA1ir0F2HymsDvoQ_6dc8t7nENdslJY08kW-_mSQgj4SbOf4uXgiKAlPU8x3LWzUbO9uFF-eAND7hrJGM-FIWcJreW92DRXmuUMBfe_ws9KXzv-F5gKVcuz7qOpyykkJtZSBvFQJtKMaw';

describe('LoginForm', () => {
  afterEach(() => {
    delete global.__mobxInstanceCount; // eslint-disable-line
  });
  describe('@events', () => {
    it('should update state on input change', () => {
      const wrapper = shallow(<LoginForm offerId="S649095045_PL" />);
      const emailInput = wrapper.find(EmailInput);
      const passwordInput = wrapper.find(PasswordInput);

      emailInput.simulate('change', mockEmailValue);
      passwordInput.simulate('change', mockInputValue);

      expect(wrapper.state().email).toBe(mockEmailValue);
      expect(wrapper.state().password).toBe(mockInputValue);
    });

    it('should set error and not call onSubmit cb when email empty', () => {
      const submitWrapper = mount(
        <LoginForm offerId="S649095045_PL" onSubmit={onSubmitMock} />
      );
      const instance = submitWrapper.instance();

      onSubmitMock.mockClear();
      instance.setState({
        email: '',
        password: mockInputValue
      });
      submitWrapper.simulate('submit');

      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.email).not.toBe('');
    });

    it('should set error and not call onSubmit cb when password empty', () => {
      const submitWrapper = mount(
        <LoginForm offerId="S649095045_PL" onSubmit={onSubmitMock} />
      );
      const instance = submitWrapper.instance();

      onSubmitMock.mockClear();
      instance.setState({
        email: mockEmailValue,
        password: ''
      });
      submitWrapper.simulate('submit');

      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.password).not.toBe('');
    });

    it('should set field error if email not valid', () => {
      const submitWrapper = mount(
        <LoginForm offerId="S649095045_PL" onSubmit={onSubmitMock} />
      );
      const instance = submitWrapper.instance();
      const preventDefaultMock = jest.fn();
      onSubmitMock.mockClear();
      instance.setState({
        email: mockNotValidEmail,
        password: mockNotValidEmail
      });
      submitWrapper.simulate('submit', { preventDefault: preventDefaultMock });

      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.email).not.toBe('');
    });

    it('should validate fields on blur', () => {
      const wrapper = mount(<LoginForm offerId="S649095045_PL" />);
      const instance = wrapper.instance();
      instance.setState({
        email: '',
        password: '',
        captcha: '',
        showCaptcha: true
      });
      instance.validateEmail();
      instance.validatePassword();
      instance.validateFields();
      expect(instance.state.errors.email).not.toBe('');
      expect(instance.state.errors.password).not.toBe('');
      expect(instance.state.errors.captcha).toBe(
        'Please complete the CAPTCHA to complete your login.'
      );
    });

    it('should update state when captcha is changed', () => {
      const wrapper = mount(<LoginForm offerId="S649095045_PL" />);
      const instance = wrapper.instance();
      instance.setState({
        showCaptcha: true
      });
      instance.onCaptchaChange();
      expect(wrapper.state().captcha).not.toBe('');
      expect(wrapper.state().errors.captcha).toBe('');
    });

    it('sholud update state if captcha is required', done => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: { required: true } })
      );
      const wrapper = mount(<LoginForm offerId="S649095045_PL" />);
      setImmediate(() => {
        expect(wrapper.state().showCaptcha).toBe(true);
        done();
      });
    });
  });
  describe('@onSubmit', () => {
    it('should call onSubmit cb when fields valid', done => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: jest
            .fn()
            .mockImplementation(() =>
              Promise.resolve({ responseData: { jwt: jwtMock } })
            )
        })
      );

      onSubmitMock.mockClear();
      const wrapper = shallow(
        <LoginForm offerId="S649095045_PL" onLoginComplete={onSubmitMock} />
      );
      const instance = wrapper.instance();
      const preventDefaultMock = jest.fn();

      instance.setState({
        email: 'john@example.com',
        password: 'testtest123',
        captcha: 'f979c2ff515d921c34af9bd2aee8ef076b719d03'
      });

      expect(onSubmitMock).not.toHaveBeenCalled();
      wrapper.simulate('submit', { preventDefault: preventDefaultMock });

      expect(preventDefaultMock).toHaveBeenCalledTimes(1);
      setImmediate(() => {
        expect(instance.state.errors.email).toBe('');
        expect(instance.state.errors.password).toBe('');
        expect(instance.state.generalError).toBe('');
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'CLEENG_AUTH_TOKEN',
          jwtMock
        );
        expect(onSubmitMock).toHaveBeenCalled();
        done();
      });
    });

    it('should set general error when customer doesnt exist', done => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 422
        })
      );
      onSubmitMock.mockClear();
      const wrapper = shallow(
        <LoginForm offerId="S649095045_PL" onLoginComplete={onSubmitMock} />
      );
      const instance = wrapper.instance();
      const preventDefaultMock = jest.fn();

      instance.setState({
        email: 'john@example.com',
        password: 'testtest123',
        captcha: ''
      });

      expect(onSubmitMock).not.toHaveBeenCalled();
      wrapper.simulate('submit', { preventDefault: preventDefaultMock });

      expect(preventDefaultMock).toHaveBeenCalledTimes(1);
      setImmediate(() => {
        expect(instance.state.errors.email).toBe('');
        expect(instance.state.errors.password).toBe('');
        expect(instance.state.generalError).toBe('Wrong email or password');
        expect(onSubmitMock).not.toHaveBeenCalled();
        done();
      });
    });

    it('should set general error when error occurred', done => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500
        })
      );
      onSubmitMock.mockClear();
      const wrapper = shallow(
        <LoginForm offerId="S649095045_PL" onLoginComplete={onSubmitMock} />
      );
      const instance = wrapper.instance();
      const preventDefaultMock = jest.fn();

      instance.setState({
        email: 'john@example.com',
        password: 'testtest123',
        captcha: 'f979c2ff515d921c34af9bd2aee8ef076b719d03'
      });

      expect(onSubmitMock).not.toHaveBeenCalled();
      wrapper.simulate('submit', { preventDefault: preventDefaultMock });

      expect(preventDefaultMock).toHaveBeenCalledTimes(1);
      setImmediate(() => {
        expect(instance.state.errors.email).toBe('');
        expect(instance.state.errors.password).toBe('');
        expect(instance.state.generalError).toBe('An error occurred.');
        expect(onSubmitMock).not.toHaveBeenCalled();
        global.fetch.mockClear();
        done();
      });
    });
  });
});
