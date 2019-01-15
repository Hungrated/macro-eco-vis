import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from '../styles/LocalPage.less';
import LocalOverviewChart from '../components/local/LocalOverviewChart';
import LocalFinanceChart from '../components/local/LocalFinanceChart';
import { Button } from 'antd';
import 'antd/lib/button/style';

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

  constructor (props, context) {
    super(props, context);
    this.state = {
      chartNum: 0
    };
  }

  componentDidMount () {
    this.props.dispatcher.local.fetch();
  }

  changeChart (num) {
    this.setState({
      chartNum: num
    });
  };

  render () {
    const {local: {data}} = this.props;
    return (
      JSON.stringify(data) !== '{}' &&
      (
        <div className={styles['g-main']}>
          <div className={styles['m-buttons']}>
            <Button className={styles['m-button']}
                    type="primary" onClick={() => {
              this.changeChart(0);
            }}>经济指标</Button><br/>
            <Button className={styles['m-button']}
                    type="primary" onClick={() => {
              this.changeChart(1);
            }}>地方预算</Button>
          </div>
          {
            this.state.chartNum === 0
              ? (<LocalOverviewChart data={data}/>)
              : (<LocalFinanceChart data={data}/>)
          }
        </div>
      )
    );
  }
}

LocalPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(LocalPage);
