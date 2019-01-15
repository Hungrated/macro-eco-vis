import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from '../styles/OverviewPage.less';

import OverviewChart from '../components/overview/OverviewChart';
import CitiesGDPChart from '../components/overview/CitiesGDPChart';
import PersonalGDPChart from '../components/overview/PersonalGDPChart';

const mapStateToProps = ({overview}) => ({
  overview
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    overview: {
      fetch: payload => dispatch({type: 'overview/fetch', payload})
    }
  }
});

class FinancePage extends PureComponent {

  componentDidMount () {
    this.props.dispatcher.overview.fetch();
  }

  render () {
    const {overview: {data}} = this.props;
    return (
      JSON.stringify(data) !== '{}' &&
      <div className={styles['g-main']}>
        <div className={styles['g-left']}>
          <OverviewChart data={data}/>
        </div>
        <div className={styles['g-right']}>
          <CitiesGDPChart data={data}/>
          <PersonalGDPChart data={data}/>
        </div>
      </div>
    );
  }
}

FinancePage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinancePage);
