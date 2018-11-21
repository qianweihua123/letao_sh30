$(function(){
    var myChart = echarts.init(document.querySelector('.echarts_left'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '2018 年注册人数'
            },
            tooltip: {},
            legend: {
                data:['人数','销量']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            },
            {
             name:'销量' ,
             type: 'bar',
             data: [100, 300, 240, 320, 400, 100]
            }
        ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


        var myChart = echarts.init(document.querySelector('.echarts_right'));

        // 指定图表的配置项和数据
        var option = {
            title : {
                text: '热门品牌销售',
                subtext: '2017年6月',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['斯凯奇','耐克','三叶草','阿迪达斯','李宁']
            },
            series : [
                {
                    name: '热门品牌',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'斯凯奇'},
                        {value:310, name:'耐克'},
                        {value:234, name:'三叶草'},
                        {value:135, name:'阿迪达斯'},
                        {value:1548, name:'李宁'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
})