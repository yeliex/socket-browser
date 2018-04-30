import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { kebabCase } from 'lodash';

const FAModes = {
  regular: 'far',
  light: 'fal',
  brands: 'fab',
  solid: 'fas'
};

export default class Icon extends Component {
  static propTypes = {
    source: PropTypes.oneOf(['fa']),
    type: PropTypes.string.isRequired,
    mode: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    source: 'fa',
    mode: 'brands',
    className: undefined,
    style: {}
  };

  renderClass = () => {
    return classnames(this.props.source, FAModes[this.props.mode] || this.props.mode, kebabCase(`fa-${this.props.type}`), this.props.className);
  };

  render() {
    return (
      <i className={this.renderClass()} style={this.props.style} />
    );
  }
}
