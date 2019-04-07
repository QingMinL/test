// import axios from 'axios';
// 发送一个 POST 请求
// var ip='http://123.124.130.23:8084/caa_v3.0';
var baseUrl='http://123.124.130.23:8084/caa_v3.0/';
var condition={andcondition: {commonfields: ["盗窃"]}};
var doc=(condition)=>{
    return  axios({
        method: 'post',
        baseURL: baseUrl,
        url: '/search/document',
        headers: {'Content-Type': 'application/json'},
        params: {
            ID: new Date().getTime()
        },
        responseType: 'json',
        data: {
            condition: condition,
            isAscending: false,
            issecondquery: "false",
        },
        transformRequest: [function (data, headers) {
            // 可以对data做任何操作
            var newData=Object.assign(data,{from: 0,
                size: 10,
                sort: "_score"});
            return JSON.stringify(newData);
        }],
        timeout: 1000,
    })
};
var statis=(condition)=>{
    return  axios({
        method: 'post',
        baseURL: baseUrl,
        url: '/search/statis',
        headers: {'Content-Type': 'application/json'},
        params: {
            ID: new Date().getTime()
        },
        responseType: 'json',
        data: {
            condition: condition,
            issecondquery: "false"
        },
        transformRequest: [function (data, headers) {
            // 可以对data做任何操作
            var newData=Object.assign(data,{
                category: ["case_feature", "dispute_focus", "casecause", "applicable_law_keyword", "casecause_level_content","courtlevel","province"],
            });
            return JSON.stringify(newData);
        }],
        timeout: 1000,
    })
};
axios.all([doc(condition),statis(condition)]).then(function (response) {
    console.log(JSON.parse(response[0]['data']['result']),JSON.parse(response[1]['data']['result']));
})
    .catch(function (error) {
        console.log(error);
    });
