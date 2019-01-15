import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import 'antd/lib/button/style';
import styles from '../styles/FinancePage.less';

import FinanceChart from '../components/finance/FinanceChart';
import FinanceComparisonChart
  from '../components/finance/FinanceComparisonChart';

const mapStateToProps = ({finance}) => ({
  finance
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    finance: {
      fetch: payload => dispatch({type: 'finance/fetch', payload})
    }
  }
});

class FinancePage extends PureComponent {

  constructor (props, context) {
    super(props, context);
    this.state = {
      chartNum: 0
    };
  }

  componentDidMount () {
    this.props.dispatcher.finance.fetch();
  }

  changeChart (num) {
    this.setState({
      chartNum: num
    });
  };

  render () {

    const {finance: {data}} = this.props;

    return (
      JSON.stringify(data) !== '{}' &&
      (
        <div className={styles['g-main']}>
          <div className={styles['m-buttons']}>
            <Button className={styles['m-button']}
                    type="primary" onClick={() => {
              this.changeChart(0);
            }}>财政趋势</Button><br/>
            <Button className={styles['m-button']}
                    type="primary" onClick={() => {
              this.changeChart(1);
            }}>预算收支</Button>
          </div>
          {
            this.state.chartNum === 0
              ? (<FinanceChart data={data}/>)
              : (<FinanceComparisonChart data={data}/>)
          }
        </div>
      )
    );
  }
}

FinancePage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinancePage);
