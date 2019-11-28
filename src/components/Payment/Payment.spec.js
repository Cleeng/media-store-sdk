import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from 'components/Button/Button';
import Adyen from 'components/Adyen';
import Payment from './Payment';

const mockPaymentMethods = {
  responseData: {
    paymentMethods: [
      {
        id: 234,
        methodName: 'card',
        logoUrl:
          'https://cleeng.com/assets/7d823b2183d46cd1fe79a9a32c566e07.png'
      },
      {
        id: 123,
        methodName: 'paypal',
        logoUrl:
          'https://cleeng.com/assets/7d823b2183d46cd1fe79a9a32c566e07.png'
      }
    ]
  },
  errors: []
};
jest.mock('api/createOrder', () =>
  jest.fn().mockImplementation(() => Promise.resolve({ orderId: '123123' }))
);
jest.mock('api/getPaymentMethods', () =>
  jest.fn().mockImplementation(() => Promise.resolve(mockPaymentMethods))
);

describe('Payment', () => {
  it('renders with buttons', () => {
    const wrapper = shallow(<Payment onPaymentComplete={jest.fn()} />);
    wrapper.setState({
      paymentMethods: mockPaymentMethods.responseData.paymentMethods
    });
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Adyen)).toHaveLength(0);
  });

  it('expands on button click', () => {
    const wrapper = mount(<Payment onPaymentComplete={jest.fn()} />);
    wrapper.setState({
      paymentMethods: mockPaymentMethods.responseData.paymentMethods
    });
    wrapper
      .find(Button)
      .first()
      .simulate('click');
    expect(wrapper.find(Adyen)).toHaveLength(1);
  });
});
