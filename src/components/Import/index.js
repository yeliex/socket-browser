import React, { Component, createElement } from 'react';
import { Spin } from 'antd';

export default function dynamic(loader) {
  return class Import extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        component: null,
        error: null
      };
    }

    componentDidMount() {
      this.handleLoad();
    }

    handleLoad = () => {
      this.setState({ loading: true });
      loader().then((component) => {
        this.setState({
          loading: false,
          component: component.default
        });
      }).catch((e) => {
        this.setState({
          loading: false,
          error: e
        });
      });
    };

    render() {
      if (!this.state.component) {
        return (
          <Spin spinning={this.state.loading} />
        );
      }

      return createElement(this.state.component, this.props);
    }
  };
}
