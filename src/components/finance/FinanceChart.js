import React from 'react';
import styles from '../../styles/FinanceChart.less';
import ReactEcharts from 'echarts-for-react';

const FinanceChart = ({data}) => {

  const cityFinanceData = data.citiesFinance || {};

  const getOption = () => {

    const cities = Object.keys(cityFinanceData);
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
      2000];

    let dataMat = [];

    cities.forEach(function (city) {
      years.forEach(function (year, index) {
        dataMat.push([
          year + '/12/31',
          cityFinanceData[city][index],
          city
        ]);
      });
    });

    return {
      title: {
        text: '2000年至2017年浙江省部分城市财政总收入比较（亿元）',
        left: 'center',
        top: 10
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(0,0,0,0.2)',
            width: 1,
            type: 'solid'
          }
        }
      },
      legend: {
        data: cities,
        top: 50
      },
      grid: {
        left: '15%',
        right: '15%',
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          height: 30,
          bottom: 30,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'

        }, {
          'type': 'inside',
          'show': true,
          'height': 15,
          'start': 1,
          'end': 35
        }
      ],
      singleAxis: {
        top: 50,
        bottom: 100,
        axisTick: {},
        axisLabel: {},
        type: 'time',
        axisPointer: {
          animation: true,
          label: {
            show: true
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 0.2
          }
        }
      },

      series: [
        {
          type: 'themeRiver',
          itemStyle: {
            emphasis: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
          },
          label: {
            show: false
          },
          data: dataMat
        }
      ]
    };
  };

  return (
    <div className={styles['g-inner']}>
      <ReactEcharts
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        style={{
          width: '100%',
          height: 'calc(100vh - 70px)',
          minHeight: '500px'
        }}
      />
    </div>
  );
};

FinanceChart.propTypes = {};

export default FinanceChart;
