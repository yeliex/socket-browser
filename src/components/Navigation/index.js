import React, { Component } from 'react';
import { Row } from 'antd';
import Icon from '../../components/Icon';
import Style from './index.less';

export default class Navigation extends Component {
  render() {
    return [
      <nav className={Style.nav} key="nav">
        <span className={Style.title} onClick={() => window.router.go('/')}>Socket-browser</span>

        <div className={Style.right}>
          <Icon type="github" />
        </div>
      </nav>,
      <Row key="main">
        {this.props.children}
      </Row>
    ];
  }
}
