import React from 'react';
import { shallow } from 'enzyme';
import Adyen from './Adyen';
import LocalhostWarning from './util/LocalhostWarning';

const mockOnSubmit = jest.fn();

class MockAdyenCheckout {
  constructor(configuration) {
    expect(configuration).toStrictEqual({
      environment: 'test',
      onSubmit: mockOnSubmit,
      originKey: 'foo',
      showPayButton: true
    });
  }

  create = paymentMethod => {
    expect(paymentMethod).toBe('card');
    return {
      mount: componentContainerId =>
        expect(componentContainerId).toBe('#component-container')
    };
  };
}

describe('Adyen', () => {
  it('renders localhost warning', () => {
    const wrapper = shallow(<Adyen onSubmit={mockOnSubmit} />);
    expect(wrapper.find(LocalhostWarning)).toHaveLength(1);
  });

  it('calls Adyen API', () => {
    window.AdyenCheckout = MockAdyenCheckout;
    window.ENVIRONMENT_CONFIGURATION = {
      ADYEN_PUBLIC_KEY: {
        'http://localhost': 'foo'
      }
    };
    shallow(<Adyen onSubmit={mockOnSubmit} />); // assertions are inside the mock class functions
  });
});
