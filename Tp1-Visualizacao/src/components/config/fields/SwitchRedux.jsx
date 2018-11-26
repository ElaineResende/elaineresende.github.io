import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import {
  Switch, FormControlLabel,
} from '@material-ui/core';

class SwitchRedux extends React.Component {
  render() {
    const { name, label, style, labelPosition, value, color } = this.props;
    return (
      <FormControlLabel
        control={
          <Field
            {...this.props}
            name={name}
            component={Switch}
            label={label}
            labelPosition={labelPosition || "right"}
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

SwitchRedux.propTypes = {
  labelPosition: PropTypes.oneOf(['right', 'left']),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default SwitchRedux;
