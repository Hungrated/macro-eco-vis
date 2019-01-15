import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import 'antd/lib/button/style';
import styles from '../styles/FinancePage.less';

import ApplyChart from '../components/finance/ApplyChart';

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
            }}>申请量</Button><br/>
            <Button className={styles['m-button']}
                    type="primary" onClick={() => {
              this.changeChart(1);
            }}>申请密度</Button><br/>
            <Button className={styles['m-button']}
                    type="primary" onClick={() => {
              this.changeChart(2);
            }}>省 份</Button><br/>
            <Button className={styles['m-button']}
                    type="primary" onClick={() => {
              this.changeChart(3);
            }}>研发人</Button>
          </div>
          {
            this.state.chartNum === 0
              ? (<ApplyChart data={data}/>)
              : (this.state.chartNum === 1
                ? (<div>0</div>)
                : (this.state.chartNum === 2
                  ? (<div>0</div>)
                  : (<div>0</div>))
              )
          }
        </div>
      )
    );
  }
}

FinancePage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinancePage);
