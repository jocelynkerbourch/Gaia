var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    setQuestion (event, callback);
}
 
function setQuestion (event, callback) {

    var uniqid = (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
    var question = tools.getParameter(event,"question");
    var mindTrue = parseInt(tools.getParameter(event,"mind_true"));
    var mindFalse = parseInt(tools.getParameter(event,"mind_false"));
    var eatTrue = parseInt(tools.getParameter(event,"eat_true"));
    var eatFalse = parseInt(tools.getParameter(event,"eat_false"));
    var moveTrue = parseInt(tools.getParameter(event,"move_true"));
    var moveFalse = parseInt(tools.getParameter(event,"move_false"));
    var sleepTrue = parseInt(tools.getParameter(event,"sleep_true"));
    var sleepFalse = parseInt(tools.getParameter(event,"sleep_false"));

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

    putItem(params, tools.getMessage, callback);
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