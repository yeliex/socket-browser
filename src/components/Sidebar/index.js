import React, { Component, cloneElement } from 'react';
import { Col, Menu, Icon } from 'antd';
import { connect } from 'react-redux';

@connect()
export default class Sidebar extends Component {
  renderList = () => {

  };

  render() {
    return [
      <aside key="aside">
        side
      </aside>,
      (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).map((child, index) => {
        return cloneElement(child, { key: index });
      })
    ];
  }
}
