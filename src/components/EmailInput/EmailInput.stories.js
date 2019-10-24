import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, select } from '@storybook/addon-knobs';
import EmailInput from './EmailInput';

const ERROR_MESSAGES = {
  noError: '',
  wrongFormat: 'The email address is not properly formatted.',
  fillField: 'Please fill out this field.'
};

storiesOf('EmailInput', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ width: 400, backgroundColor: 'white', paddingBottom: 20 }}>
      {story()}
    </div>
  ))
  .add('All options', () => (
    <EmailInput error={select('Error message', ERROR_MESSAGES)} />
  ));
