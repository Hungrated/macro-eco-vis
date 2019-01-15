import React from 'react';
import styles from '../../styles/PersonalGDPChart.less';
import ReactEcharts from 'echarts-for-react';

const PersonalGDPChart = ({data}) => {

  const scatterData = data.personalGDP || {};

  const getOption = () => {

    const cities = Object.keys(scatterData || {});
    const years = [
      2017,
      2016,
      2015,
      2014,
      2013,
      2012,
      2011,
      2010,
      2009,
      2008,
      2007,
      2006,
      2005,
      2004,
      2003,
      2002,
      2001,
      2000].reverse();

    let data = [];

    const yearCount = years.length;

    for (let i = 0; i < yearCount; i++) {
      for (let j = 0; j < cities.length; j++) {
        data.push([i, j, scatterData[cities[j]][yearCount - i]]);
      }
    }

    return {
      title: {
        text: '浙江省部分城市人均生产总值总览',
        left: 'center'
      },
      polar: {},
      tooltip: {
        formatter: function (params) {
          return years[params.value[0]] + '年-' + cities[params.value[1]] + '：' +
            params.value[2] + '元';
        },
        position: function (pos, params, dom, rect, size) {
          let obj = {top: 60};
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        }
      },
      angleAxis: {
        type: 'category',
        data: cities,
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            type: 'dashed'
          }
        },
        axisLine: {
          show: false
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      radiusAxis: {
        type: 'category',
        data: years,
        axisLine: {
          show: false
        },
        axisLabel: {
          rotate: 45
        }
      },
      series: [
        {
          name: '人均生产总值',
          type: 'scatter',
          coordinateSystem: 'polar',
          symbolSize: function (val) {
            return val[2] / 5000;
          },
          data: data,
          animationDelay: function (idx) {
            return idx * 5;
          }
        }]
    };
  };

  return (
    <div className={styles['g-inner']}>
      <ReactEcharts
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        style={{
          minWidth: '300px',
          width: '100%',
          height: '95%',
          top: 20
        }}
      />
    </div>
  );
};

PersonalGDPChart.propTypes = {};

export default PersonalGDPChart;
