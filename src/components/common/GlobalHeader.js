import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';
import 'antd/lib/menu/style';
import styles from '../../styles/GlobalHeader.less';

const mapStateToProps = ({header}) => ({
  header
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    header: {
      redirect: payload => dispatch({type: 'header/redirect', payload})
    }
  }
});

const navItems = [
  {
    key: 'overview',
    tlt: 'GDP总览',
    link: '/overview'
  },
  {
    key: 'finance',
    tlt: '财 政',
    link: '/finance'
  },
  {
    key: 'local',
    tlt: '地 方',
    link: '/local'
  }
];

class GlobalHeader extends PureComponent {

  state = {
    current: window.location.pathname.substring(1) || 'overview'
  };

  togglePageRedirect = (key, link) => {
    this.setState({
      current: key
    });
    this.props.dispatcher.header.redirect({
      link: link,
      params: {}
    });
  };

  handleClick = (e) => {
    const link = e.item.props.link;
    if ((/^(http|https):\/\//).test(link)) {
      window.open(link);
    } else {
      this.togglePageRedirect(e.key, link);
    }
  };

  render () {
    return (
      <div className={styles['g-header']}>
        <div className={styles['m-logo']}>
          <img className={styles['inner']}
               src={require('../../assets/macro-eco-vis-logo.png')}
               alt={'logo'}/>
        </div>
        <div className={styles['m-nav']}>
          <Menu onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                theme={'dark'}
                mode={'horizontal'}
          >
            {
              navItems.map(({key, tlt, link}) => (
                <Menu.Item key={key} link={link}>
                  <strong>{tlt}</strong>
                </Menu.Item>
              ))
            }
          </Menu>
        </div>
      </div>
    );
  }
}

GlobalHeader.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);

