var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    setConversation (callback);
}
 
function setConversation (callback) {

    var uniqid = (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
    var created_at = new Date().toISOString();
    var status = "pending";
    var items = {
            "id": uniqid,
            "created_at": created_at,
            "status": status
        };
    var params = {
        TableName:"gaia_conversations",
        Item:items
    };

    putItem(params, getMessage, callback);
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

function getMessage(status,infos){
    var body = {"status": status, infos};
    var statusCode = 200;
    return {
        "statusCode": statusCode,
        "headers": {},
        "body": JSON.stringify(body)
    };
}

