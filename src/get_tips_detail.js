var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    getTipsDetail (event, callback);
}
 
function getTipsDetail (event, callback) {

    var id = tools.getParameter(event,"id");
    if (id==null){
        var result = tools.getMessage("error",{"message":"no id define"});
        callback(null, result);
    }

    var params = {
        TableName: "gaia_tips",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues : {":id" : id}
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();
    documentClient.query(params, function(err, data) {
        
        var status = "scan";
        var infos={"params":params};
        if (err) {
            status = "error";
        } else {
            if (data.Items.length==0){
                status = "empty";
            }else{
                infos["data"] = data;
            }
        }
        var result = tools.getMessage(status,infos);
        callback(null, result);
    });
}