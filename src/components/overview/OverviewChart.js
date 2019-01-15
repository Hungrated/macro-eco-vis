import React from 'react';
import styles from '../../styles/OverviewChart.less';
import ReactEcharts from 'echarts-for-react';

const OverviewChart = ({data}) => {

  const getOption = () => {

    const cities = [
      '杭州',
      '宁波',
      '温州',
      '嘉兴',
      '绍兴',
      '金华'
    ];

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
            right: 20,
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
          x: 'right',
          data: ['GDP', '第一产业', '第二产业', '第三产业'],
          right: '2%'
        },
        calculable: true,
        grid: {
          top: 80,
          bottom: 100
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
            // max: 53500
            max: 13000
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
      options: [
        {
          title: {text: '2000浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2000']},
            {data: dataMap.dataPI['2000']},
            {data: dataMap.dataSI['2000']},
            {data: dataMap.dataTI['2000']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2000sum']},
                {name: '第二产业', value: dataMap.dataSI['2000sum']},
                {name: '第三产业', value: dataMap.dataTI['2000sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2000sum']},
                {name: '工业', value: dataMap.dataIndustry['2000sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2001浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2001']},
            {data: dataMap.dataPI['2001']},
            {data: dataMap.dataSI['2001']},
            {data: dataMap.dataTI['2001']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2001sum']},
                {name: '第二产业', value: dataMap.dataSI['2001sum']},
                {name: '第三产业', value: dataMap.dataTI['2001sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2001sum']},
                {name: '工业', value: dataMap.dataIndustry['2001sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2002浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2002']},
            {data: dataMap.dataPI['2002']},
            {data: dataMap.dataSI['2002']},
            {data: dataMap.dataTI['2002']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2002sum']},
                {name: '第二产业', value: dataMap.dataSI['2002sum']},
                {name: '第三产业', value: dataMap.dataTI['2002sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2002sum']},
                {name: '工业', value: dataMap.dataIndustry['2002sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2003浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2003']},
            {data: dataMap.dataPI['2003']},
            {data: dataMap.dataSI['2003']},
            {data: dataMap.dataTI['2003']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2003sum']},
                {name: '第二产业', value: dataMap.dataSI['2003sum']},
                {name: '第三产业', value: dataMap.dataTI['2003sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2003sum']},
                {name: '工业', value: dataMap.dataIndustry['2003sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2004浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2004']},
            {data: dataMap.dataPI['2004']},
            {data: dataMap.dataSI['2004']},
            {data: dataMap.dataTI['2004']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2004sum']},
                {name: '第二产业', value: dataMap.dataSI['2004sum']},
                {name: '第三产业', value: dataMap.dataTI['2004sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2004sum']},
                {name: '工业', value: dataMap.dataIndustry['2004sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2005浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2005']},
            {data: dataMap.dataPI['2005']},
            {data: dataMap.dataSI['2005']},
            {data: dataMap.dataTI['2005']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2005sum']},
                {name: '第二产业', value: dataMap.dataSI['2005sum']},
                {name: '第三产业', value: dataMap.dataTI['2005sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2005sum']},
                {name: '工业', value: dataMap.dataIndustry['2005sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2006浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2006']},
            {data: dataMap.dataPI['2006']},
            {data: dataMap.dataSI['2006']},
            {data: dataMap.dataTI['2006']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2006sum']},
                {name: '第二产业', value: dataMap.dataSI['2006sum']},
                {name: '第三产业', value: dataMap.dataTI['2006sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2006sum']},
                {name: '工业', value: dataMap.dataIndustry['2006sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2007浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2007']},
            {data: dataMap.dataPI['2007']},
            {data: dataMap.dataSI['2007']},
            {data: dataMap.dataTI['2007']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2007sum']},
                {name: '第二产业', value: dataMap.dataSI['2007sum']},
                {name: '第三产业', value: dataMap.dataTI['2007sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2007sum']},
                {name: '工业', value: dataMap.dataIndustry['2007sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2008浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2008']},
            {data: dataMap.dataPI['2008']},
            {data: dataMap.dataSI['2008']},
            {data: dataMap.dataTI['2008']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2008sum']},
                {name: '第二产业', value: dataMap.dataSI['2008sum']},
                {name: '第三产业', value: dataMap.dataTI['2008sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2008sum']},
                {name: '工业', value: dataMap.dataIndustry['2008sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2009浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2009']},
            {data: dataMap.dataPI['2009']},
            {data: dataMap.dataSI['2009']},
            {data: dataMap.dataTI['2009']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2009sum']},
                {name: '第二产业', value: dataMap.dataSI['2009sum']},
                {name: '第三产业', value: dataMap.dataTI['2009sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2009sum']},
                {name: '工业', value: dataMap.dataIndustry['2009sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2010浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2010']},
            {data: dataMap.dataPI['2010']},
            {data: dataMap.dataSI['2010']},
            {data: dataMap.dataTI['2010']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2010sum']},
                {name: '第二产业', value: dataMap.dataSI['2010sum']},
                {name: '第三产业', value: dataMap.dataTI['2010sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2010sum']},
                {name: '工业', value: dataMap.dataIndustry['2010sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2011浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2011']},
            {data: dataMap.dataPI['2011']},
            {data: dataMap.dataSI['2011']},
            {data: dataMap.dataTI['2011']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2011sum']},
                {name: '第二产业', value: dataMap.dataSI['2011sum']},
                {name: '第三产业', value: dataMap.dataTI['2011sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2011sum']},
                {name: '工业', value: dataMap.dataIndustry['2011sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2012浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2012']},
            {data: dataMap.dataPI['2012']},
            {data: dataMap.dataSI['2012']},
            {data: dataMap.dataTI['2012']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2012sum']},
                {name: '第二产业', value: dataMap.dataSI['2012sum']},
                {name: '第三产业', value: dataMap.dataTI['2012sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2012sum']},
                {name: '工业', value: dataMap.dataIndustry['2012sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2013浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2013']},
            {data: dataMap.dataPI['2013']},
            {data: dataMap.dataSI['2013']},
            {data: dataMap.dataTI['2013']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2013sum']},
                {name: '第二产业', value: dataMap.dataSI['2013sum']},
                {name: '第三产业', value: dataMap.dataTI['2013sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2013sum']},
                {name: '工业', value: dataMap.dataIndustry['2013sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2014浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2014']},
            {data: dataMap.dataPI['2014']},
            {data: dataMap.dataSI['2014']},
            {data: dataMap.dataTI['2014']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2014sum']},
                {name: '第二产业', value: dataMap.dataSI['2014sum']},
                {name: '第三产业', value: dataMap.dataTI['2014sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2014sum']},
                {name: '工业', value: dataMap.dataIndustry['2014sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2015浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2015']},
            {data: dataMap.dataPI['2015']},
            {data: dataMap.dataSI['2015']},
            {data: dataMap.dataTI['2015']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2015sum']},
                {name: '第二产业', value: dataMap.dataSI['2015sum']},
                {name: '第三产业', value: dataMap.dataTI['2015sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2015sum']},
                {name: '工业', value: dataMap.dataIndustry['2015sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2016浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2016']},
            {data: dataMap.dataPI['2016']},
            {data: dataMap.dataSI['2016']},
            {data: dataMap.dataTI['2016']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2016sum']},
                {name: '第二产业', value: dataMap.dataSI['2016sum']},
                {name: '第三产业', value: dataMap.dataTI['2016sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2016sum']},
                {name: '工业', value: dataMap.dataIndustry['2016sum']}
              ]
            }
          ]
        },
        {
          title: {text: '2017浙江省部分城市经济指标'},
          series: [
            {data: dataMap.dataGDP['2017']},
            {data: dataMap.dataPI['2017']},
            {data: dataMap.dataSI['2017']},
            {data: dataMap.dataTI['2017']},
            {
              data: [
                {name: '第一产业', value: dataMap.dataPI['2017sum']},
                {name: '第二产业', value: dataMap.dataSI['2017sum']},
                {name: '第三产业', value: dataMap.dataTI['2017sum']}
              ]
            },
            {
              data: [
                {name: '第二产业', value: dataMap.dataSI['2017sum']},
                {name: '工业', value: dataMap.dataIndustry['2017sum']}
              ]
            }
          ]
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
          minWidth: '550px',
          width: '100%',
          height: 'calc(100vh - 100px)'
        }}
      />
    </div>
  );
};

OverviewChart.propTypes = {};

export default OverviewChart;
