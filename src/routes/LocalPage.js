import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from '../styles/LocalPage.less';

const mapStateToProps = ({local}) => ({
  local
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    local: {
      fetch: payload => dispatch({type: 'local/fetch', payload})
    }
  }
});

class LocalPage extends PureComponent {

  componentDidMount () {
    this.props.dispatcher.local.fetch();
  }

  render () {
    const {local: {data}} = this.props;
    return (
      JSON.stringify(data) !== '{}' &&
      <div className={styles['g-main']}>
        <div className={styles['g-left']}>
          <div>0</div>
        </div>
        <div className={styles['g-right']}>
          <div>0</div>
        </div>
      </div>
    );
  }
}

LocalPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(LocalPage);
