import React from 'react';
import styles from '../../styles/CitiesGDPChart.less';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

const CitiesGDPChart = ({data}) => {

  const cityData = data.citiesGDP || {};

  const getOption = () => {

    const cities = Object.keys(cityData);
    const years = [2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000];
    let xAxisDetailedData = years;
    let yAxisDetailedDataArr = [];

    cities.forEach(function (item) {
      yAxisDetailedDataArr.push({
        name: item,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          normal: {
            width: 1
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
        data: cityData[item].map(function (item) {
          return item.value
        })
      });
    });

    return {
      title: {
        text: '浙江省部分城市GDP趋势',
        left: 'center',
        top: 20
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
        itemWidth: 10,
        itemHeight: 8,
        itemGap: 20,
        left: '15%',
        top: '18%',
        data: cities,
        textStyle: {
          fontSize: 12
        }
      },
      grid: {
        left: '2%',
        right: '5%',
        bottom: '2%',
        containLabel: true
      },
      // dataZoom: [
      //   {
      //     show: true,
      //     height: 25,
      //     xAxisIndex: [0],
      //     bottom: 30,
      //     handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      //     handleSize: '110%',
      //     handleStyle: {
      //       color: '#d3dee5'
      //     },
      //     borderColor: '#90979c'
      //   },
      //   {
      //     type: 'inside',
      //     show: true,
      //     height: 35,
      //     start: 1,
      //     end: 35
      //   }],
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          inverse: true,
          data: xAxisDetailedData
        }],
      yAxis: [
        {
          type: 'value',
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
          height: '100%',
          minWidth: '450px'
        }}
      />
    </div>
  );
};

CitiesGDPChart.propTypes = {};

export default CitiesGDPChart;
