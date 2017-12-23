var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    setQuestion (event, callback);
}
 
function setQuestion (event, callback) {

    var uniqid = (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
    var question = getParameter(event,"question");
    var mindTrue = parseInt(getParameter(event,"mind_true"));
    var mindFalse = parseInt(getParameter(event,"mind_false"));
    var eatTrue = parseInt(getParameter(event,"eat_true"));
    var eatFalse = parseInt(getParameter(event,"eat_false"));
    var moveTrue = parseInt(getParameter(event,"move_true"));
    var moveFalse = parseInt(getParameter(event,"move_false"));
    var sleepTrue = parseInt(getParameter(event,"sleep_true"));
    var sleepFalse = parseInt(getParameter(event,"sleep_false"));

    var items = {
            "id": uniqid,
            "question": question,
            "mind_true": mindTrue,
            "mind_false": mindFalse,
            "eat_true": eatTrue,
            "eat_false": eatFalse,
            "move_true": moveTrue,
            "move_false": moveFalse,
            "sleep_true": sleepTrue,
            "sleep_false": sleepFalse
        };
    var params = {
        TableName:"gaia_questions",
        Item:items
    };

    putItem(params, getMessage, callback);
}

function putItem(params, getMessage, callback) {
    if(
        params.Item.question!=null
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

