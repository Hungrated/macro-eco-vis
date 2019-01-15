import React from 'react';
import styles from '../../styles/LocalOverviewChart.less';
import ReactEcharts from 'echarts-for-react';

const LocalOverviewChart = ({data}) => {

  const getOption = () => {

    const cities = ['宁波市区', '余姚市', '慈溪市', '奉化市', '象山县', '宁海县'];

    let dataMap = {};

    function dataFormatter (obj) {
      if (!obj || obj === {}) {
        return {};
      }
      let cityList = cities;
      let temp;
      for (let year = 2000; year <= 2017; year++) {
        let max = 0;
        let sum = 0;
        temp = obj[year];
        for (let i = 0, l = temp.length; i < l; i++) {
          max = Math.max(max, temp[i]);
          sum += temp[i];
          obj[year][i] = {
            name: cityList[i],
            value: temp[i]
          };
        }
        obj[year + 'max'] = Math.floor(max / 100) * 100;
        obj[year + 'sum'] = Number(sum).toFixed(2);
      }
      return obj;
    }

    dataMap.dataGDP = dataFormatter(data.gdp);

    dataMap.dataPI = dataFormatter(data.primary);

    dataMap.dataSI = dataFormatter(data.secondary);

    dataMap.dataTI = dataFormatter(data.third);

    dataMap.dataIndustry = dataFormatter(data.industry);

    let innerOptions = [];

    for (let i = 2000; i <= 2017; i++) {
      let yearIdx = i.toString();
      innerOptions.push({
        title: {
          text: yearIdx + '年宁波市下属区县市经济指标',
          left: 'center',
          top: 20
        },
        series: [
          {data: dataMap.dataGDP[yearIdx]},
          {data: dataMap.dataPI[yearIdx]},
          {data: dataMap.dataSI[yearIdx]},
          {data: dataMap.dataTI[yearIdx]},
          {
            data: [
              {name: '第一产业', value: dataMap.dataPI[yearIdx + 'sum']},
              {name: '第二产业', value: dataMap.dataSI[yearIdx + 'sum']},
              {name: '第三产业', value: dataMap.dataTI[yearIdx + 'sum']}
            ]
          },
          {
            data: [
              {name: '第二产业', value: dataMap.dataSI[yearIdx + 'sum']},
              {name: '工业', value: dataMap.dataIndustry[yearIdx + 'sum']}
            ]
          }
        ]
      });
    }

    return {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          loop: false,
          playInterval: 200,
          data: [
            '2000-01-01',
            '2001-01-01',
            '2002-01-01',
            '2003-01-01',
            '2004-01-01',
            '2005-01-01',
            '2006-01-01',
            '2007-01-01',
            '2008-01-01',
            '2009-01-01',
            '2010-01-01',
            '2011-01-01',
            '2012-01-01',
            '2013-01-01',
            '2014-01-01',
            '2015-01-01',
            '2016-01-01',
            '2017-01-01'
          ],
          label: {
            formatter: function (s) {
              return (new Date(s)).getFullYear();
            }
          }
        },
        title: {
          subtext: '数据来自浙江统计年鉴'
        },
        dataZoom: [
          {
            show: true,
            width: 20,
            yAxisIndex: [0],
            right: 70,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '120%',
            handleStyle: {
              color: '#d3dee5'
            },
            borderColor: '#90979c'
          }
        ],
        tooltip: {},
        legend: {
          data: ['GDP', '第一产业', '第二产业', '第三产业'],
          left: 'center',
          top: 88
        },
        calculable: true,
        grid: {
          top: 80,
          bottom: 100,
          left: '10%'
        },
        xAxis: [
          {
            'type': 'category',
            'axisLabel': {'interval': 0},
            'data': cities,
            splitLine: {show: false}
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'GDP（亿元）',
            max: 6500
          }
        ],
        series: [
          {name: 'GDP', type: 'bar'},
          {name: '第一产业', type: 'bar'},
          {name: '第二产业', type: 'bar'},
          {name: '第三产业', type: 'bar'},
          {
            name: 'GDP占比',
            type: 'pie',
            center: ['80%', '20%'],
            radius: '15%',
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            }
          },
          {
            name: '工业占比',
            type: 'pie',
            center: ['80%', '40%'],
            radius: '15%',
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            }
          }
        ]
      },
      options: innerOptions
    };
  };

  return (
    <div className={styles['g-inner']}>
      <ReactEcharts
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        style={{
          minWidth: '550px',
          width: '100%',
          marginLeft: '35px',
          height: 'calc(100vh - 100px)'
        }}
      />
    </div>
  );
};

LocalOverviewChart.propTypes = {};

export default LocalOverviewChart;
