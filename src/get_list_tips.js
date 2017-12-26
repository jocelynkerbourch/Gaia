var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    getQuestions (event, callback);
}
 
function getQuestions (event, callback) {

    var conversation = tools.getParameter(event,"conversation");
    var params = {
        TableName: "gaia_tips"
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();
    documentClient.scan(params, function(err, data) {
        
        var status = "scan";
        var infos={"params":params, "data":{}};
        if (err) {
            status = "error";
        } else {
            if (data.Items.length==0){
                status = "empty";
            }else{
                infos['data']=data.Items;
            }
        }
        var result = tools.getMessage(status,infos);
        callback(null, result);
    });
}