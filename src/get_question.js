var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    getQuestion (event, callback);
}
 
function getQuestion (event, callback) {

    var conversation = getParameter(event,"conversation");
    var params = {
        TableName: "gaia_responses",
        FilterExpression: "conversation_id = :conversation",
        ExpressionAttributeValues : {":conversation" : conversation}
    };

    getResponsesByConversation(params, getRamdomQuestion, getMessage, callback);
}

function getResponsesByConversation(params, getRamdomQuestion, getMessage, callback) {
    if(params.ExpressionAttributeValues[":conversation"]!= null) {
        var documentClient = new AWS.DynamoDB.DocumentClient();

        documentClient.scan(params, function(err, data) {
            if (err) {
                var result = getMessage('error',params);
                callback(null, result);
            } else {
                var attributes = {};
                var expression = "";
                data.Items.forEach(function(item,idx, array) {
                    attributes[":id"+idx]=item.question_id;
                    expression+="id <> :id"+idx;
                    if (idx !== array.length - 1){ 
                        expression+=" and ";
                    }
                });

                var paramsSelect = {
                    TableName: "gaia_questions",
                    ExpressionAttributeValues: attributes,
                    FilterExpression: expression,
                };
                
                getRamdomQuestion(paramsSelect, getMessage, callback);
            }
        });
        
    } else {
        var result = getMessage('error',params);
        callback(null, result);
    }
}

function getRamdomQuestion(params, getMessage, callback){
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
                var random = shuffle(data.Items)
                infos['data']=random[0];
            }
        }
        var result = getMessage(status,infos);
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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

