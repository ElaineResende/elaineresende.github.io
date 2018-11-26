import React from 'react';
import Header from './Header';
import { Footer } from './Footer';
import { Menu } from './Menu';
import './Layout.css';

const rotateScreen = '';//`${basePath}/../novo/img/patterns/rotateScreen.png`;

const isMobile = {
  Android() {
    return global.navigator.userAgent.match(/Android/i);
  },
  BlackBerry() {
    return global.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return global.navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera() {
    return global.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows() {
    return global.navigator.userAgent.match(/IEMobile/i);
  },
  any() {
    if (isMobile.Android() || isMobile.BlackBerry() ||
      isMobile.iOS() || isMobile.Opera() || isMobile.Windows() != null) {
      return true;
    }
    return false;
  },
  models() {
    return (isMobile.Android() || isMobile.BlackBerry() ||
      isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  },
};

class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false, //isMobile.any(),
      drawerOpen: false,
    };
  }

  handleToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  render() {
    return (
      <div>
        <div className={`${this.state.drawerOpen ? 'menu-open-true App' : 'menu-open-false App'}`}>
          <div
            className={
              `${this.state.isMobile ? 'is-mobile mobile-landscape' : 'is-not-mobile mobile-landscape'}`}
          >
            <img
              src={rotateScreen}
              alt="landscape"
            />
          </div>

          <Menu drawerOpen={this.state.drawerOpen} handleToggle={this.handleToggle} />
          <div id="main-content">
            <Header
              {...this.props}
              title={'Trabalho prático'}
              iconLeft
              handleToggle={this.handleToggle}
            />
            <div>
              {this.props.children}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export const Layout = LayoutComponent;
