import React from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField'

class CampoTexto extends React.Component {
  render() {
    const {
      id,
      input,
      label,
      meta: { touched, error },
      ...custom
    } = this.props;
    return (
      <TextField
        placeholder={label}
        id={id}
        label={label}
        error={touched && error}
        {...input}
        {...custom}
      />
    );
  }
}

export class TextFieldRedux extends React.Component {
  render() {
    const { name, label, style } = this.props;
    return (
      <Field
        name={name}
        label={label}
        style={style}
        component={CampoTexto}
      />
    );
  }
}
