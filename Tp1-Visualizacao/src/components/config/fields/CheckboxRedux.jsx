import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import {
  FormControlLabel, Checkbox
} from '@material-ui/core';

class Campo extends React.Component {
  render() {
    const {
      input,
      meta: { touched, error },
      ...custom
    } = this.props;
    return (
      <Checkbox
        error={touched && error}
        {...input}
        {...custom}
      />
    );
  }
}

class CheckboxRedux extends React.Component {
  render() {
    const { name, label, style, value, color } = this.props;
    return (
      <FormControlLabel
        control={
          <Field
            {...this.props}
            name={name}
            component={Campo}
            label={label}
            // labelPosition={labelPosition || "right"}
            style={style}
            value={value}
            color={color || "primary"}
          />
        }
        label={label}
      />
    );
  }
}

CheckboxRedux.propTypes = {
  // labelPosition: PropTypes.oneOf(['right', 'left']),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CheckboxRedux;
