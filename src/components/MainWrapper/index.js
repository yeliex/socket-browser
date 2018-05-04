import React, { Component } from 'react';
import { Tabs } from 'antd';

export default class Container extends Component {
  render() {
    return [
      <Tabs type="editable-card" key="tabs">
        <Tabs.TabPane tab="首页" />
      </Tabs>,
      <main key="main">
        {this.props.children}
      </main>
    ];
  }
}
