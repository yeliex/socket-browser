import React, { Component, cloneElement } from 'react';
import { Col, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Style from './index.less';

@connect((workspace) => {
  return {
    sidebar: workspace.sidebar
  };
})
export default class Sidebar extends Component {
  renderList = () => {

  };

  render() {
    return [
      <Col span={3} key="side" className="side">
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
        </Menu>
      </Col>,
      <Col span={21} key="main" className={classnames('main', Style.main)}>
        {this.props.children}
      </Col>
    ];
  }
}
