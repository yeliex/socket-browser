import { shell } from 'electron';
import React, { Component } from 'react';
import { Row } from 'antd';
import { connect } from 'react-redux';
import Icon from '../../components/Icon';
import Style from './index.less';
import Store from '../../models';

@connect(({ request }) => {
  return {
    requesting: request.running
  };
})
export default class Navigation extends Component {
  handleRequestStart = () => {
    Store.request.start();
  };

  handleRequestStop = () => {
    Store.request.stop();
  };

  renderRequesting() {
    if (this.props.requesting) {
      return (
        <a onClick={this.handleRequestStop}>
          <Icon type="spinner" className="fa-spin" mode="solid" hovering={{ type: 'ban', mode: 'solid' }} />
        </a>
      );
    }
    return (
      <a onClick={this.handleRequestStart}>
        <Icon type="play" mode="solid" />
      </a>
    );
  }

  render() {
    return [
      <nav className={Style.nav} key="nav">
        <span className={Style.title} onClick={() => window.router.go('/')}>Socket-browser</span>

        <div className={Style.right}>
          {this.renderRequesting()}
          <a onClick={() => shell.openExternal('https://github.com/yeliex/socket-browser')}>
            <Icon
              type="github"
              mode="brands"
            />
          </a>
          <a onClick={() => shell.openExternal('https://sb.yeliex.com/share')}>
            <Icon type="share-alt-square" mode="solid" />
          </a>
          <a onClick={() => shell.openExternal('https://sb.yeliex.com')}>
            <Icon type="home" mode="solid" />
          </a>
          <a>
            <Icon type="language" />
          </a>
        </div>
      </nav>,
      <Row key="main" className="main">
        {this.props.children}
      </Row>
    ];
  }
}
