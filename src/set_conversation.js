var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    setConversation (callback);
}
 
function setConversation (callback) {

    var uniqid = (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
    var created_at = new Date().toISOString();
    var updated_at = new Date().toISOString();
    var status = "pending";
    var items = {
            "id": uniqid,
            "created_at": created_at,
            "updated_at": updated_at,
            "calculed_tips_id": "null",
            "status": status
        };
    var params = {
        TableName:"gaia_conversations",
        Item:items
    };

    putItem(params, tools.getMessage, callback);
}

function putItem(params, getMessage, callback) {
    var documentClient = new AWS.DynamoDB.DocumentClient();
    documentClient.put(params, function(err, data) {
        var status = "insert";
        if (err) {
            status = "error";
        }

        var result = getMessage(status,params.Item);
        callback(null, result);
    });
}
