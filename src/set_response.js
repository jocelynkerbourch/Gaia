var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    setResponse (event, callback);
}
 
function setResponse (event, callback) {

    var uniqid = (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
    var created_at = new Date().toISOString();
    var question_id = getParameter(event,"question");
    var conversation_id = getParameter(event,"conversation");
    var response = getParameter(event,"response")=="true";

    var items = {
            "id": uniqid,
            "created_at": created_at,
            "question_id": question_id,
            "conversation_id": conversation_id,
            "response": response
        };
    var params = {
        TableName:"gaia_responses",
        Item:items
    };

    putItem(params, getMessage, callback);
}

function putItem(params, getMessage, callback) {
    if(
        params.Item.question_id!=null &&
        params.Item.conversation_id!=null
    ){
        var documentClient = new AWS.DynamoDB.DocumentClient();
        documentClient.put(params, function(err, data) {
            var status = "insert";
            if (err) {
                status = "error";
            }

            var result = getMessage(status,params.Item);
            callback(null, result);
        });
    }else{
        var result = getMessage('error',params.Item);
        callback(null, result);
    }
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

function getParameter(event,param) {
    var val = null;
    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        if (event.queryStringParameters[param] !== undefined && 
            event.queryStringParameters[param] !== null && 
            event.queryStringParameters[param] !== "") {
            val = event.queryStringParameters[param] ;
        }
    }
    return val;
}

