import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { kebabCase } from 'lodash';
import './index.less';

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
    style: PropTypes.object,
    hovering: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  static defaultProps = {
    source: 'fa',
    mode: 'regular',
    className: undefined,
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    };
  }

  handleMouseEnter = () => {
    this.setState({ hovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ hovering: false });
  };

  renderClass = (props = this.props) => {
    return classnames(
      props.source,
      FAModes[props.mode] || props.mode,
      kebabCase(`fa-${props.type}`),
      props.className,
      { 'fa--hoverable': props.hovering }
    );
  };

  render() {
    let { props } = this;

    if (this.state.hovering) {
      props = typeof this.props.hovering === 'string' ? {
        type: this.props.hovering
      } : this.props.hovering;
    }

    const mouseProps = this.props.hovering ? {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    } : {};

    return (
      <i {...mouseProps} className={this.renderClass(props)} style={this.props.style} />
    );
  }
}
