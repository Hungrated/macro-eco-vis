import React from 'react';
import styles from '../../styles/FinanceComparisonChart.less';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

const FinanceComparisonChart = ({data}) => {

  const citiesIncomeData = data.incomeFinance || {};

  const citiesExpenseData = data.expenseFinance || {};

  const getOption = () => {

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

    let cities = Object.keys(citiesIncomeData);
    let xAxisDetailedData = years;
    let yAxisDetailedDataArr = [];

    cities.forEach(function (item) {
      yAxisDetailedDataArr.push({
        name: item + '-预算收入',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          normal: {
            width: 2,
            type: 'dashed',
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(' + Math.round(Math.random() * 255) +
              ',' + Math.round(Math.random() * 255) +
              ',' + Math.round(Math.random() * 255) +
              ')'
          }
        },
        data: Object.values(citiesIncomeData[item] || {})
      });
    });

    cities.forEach(function (item) {
      yAxisDetailedDataArr.push({
        name: item + '-预算支出',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(' + Math.round(Math.random() * 255) +
              ',' + Math.round(Math.random() * 255) +
              ',' + Math.round(Math.random() * 255) +
              ')'
          }
        },
        data: Object.values(citiesExpenseData[item] || {})
      });
    });

    return {
      title: {
        text: '2000年至2017年浙江省部分城市财政预算收入与支出趋势及比较',
        subtext: '虚线代表预算收入 实线代表预算支出',
        left: 'center',
        top: 10
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#9db5dd'
          }
        }
      },
      legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 20,
        right: '4%',
        padding: [100, 10, 100, 0],
        data: cities.map(city => city + '-预算收入')
          .concat(cities.map(city => city + '-预算支出')),
        orient: 'vertical',
        textStyle: {
          fontSize: 12
        }
      },
      grid: {
        left: '10%',
        bottom: 70,
        right: 200,
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          height: 25,
          xAxisIndex: [0],
          bottom: 30,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          borderColor: '#90979c'
        },
        {
          type: 'inside',
          show: true,
          height: 35,
          start: 1,
          end: 35
        }],
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          inverse: true,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: xAxisDetailedData
        }],
      yAxis: [
        {
          type: 'value',
          name: '财政预算收支（亿元）',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
      series: yAxisDetailedDataArr
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

FinanceComparisonChart.propTypes = {};

export default FinanceComparisonChart;
