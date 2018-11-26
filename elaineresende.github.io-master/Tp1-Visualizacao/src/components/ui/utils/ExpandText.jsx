import React from 'react';
import PropTypes from 'prop-types';

/**
 * [createClass description]
 */
export default class ExpandText extends React.Component {
  state = {
    expandText: false,
  };

  seeMore = () => {
    this.setState({ expandText: !this.state.expandText });
  }
  render() {
    const { children } = this.props;
    let text = children;
    const size = this.props.size ? this.props.size : 40;
    if (text.length > size) {
      text = this.state.expandText ? children : `${children.slice(0, size)}...`;
      return (
        <div>
          {text}
          <a onClick={this.seeMore}>{this.state.expandText ? 'Ver Menos' : 'Ver mais'}</a>
        </div>
      );
    }
    return (
      <div>
        {text}
      </div>
    );
  }
}

ExpandText.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.number,
};
