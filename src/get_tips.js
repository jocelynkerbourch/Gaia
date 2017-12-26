var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    console.log(tools);
    getTips (event, callback);
}
 
function getTips (event, callback) {

    var conversation = tools.getParameter(event,"conversation");
    var params = {
        TableName: "gaia_responses",
        FilterExpression: "conversation_id = :conversation",
        ExpressionAttributeValues : {":conversation" : conversation}
    };

    getTipsByConversation(conversation, params, getTipsByPilar, tools.getMessage, callback);
}

function getTipsByConversation(conversation, params, getTipsByPilar, getMessage, callback) {
    if(params.ExpressionAttributeValues[":conversation"]!= null) {
        var documentClient = new AWS.DynamoDB.DocumentClient();

        documentClient.scan(params, function(err, data) {
            if (err) {
                var result = getMessage('error',params);
                callback(null, result);
            } else {
                var questions=[];
                data.Items.forEach(function(item,idx, array) {
                    questions[idx]={
                        'id':item.question_id,
                        'response':item.response
                    };
                });
                
                getResponses(conversation, questions, 0, callback);
            }
        });
        
    } else {
        var result = getMessage('error',params);
        callback(null, result);
    }
}

function getResponses(conversation, questions, index, callback){
    if (index==questions.length){
       var notes = [
          { name: "mind", value: 0 },
          { name: "eat", value: 0 },
          { name: "move", value: 0 },
          { name: "sleep", value: 0 }
        ];
        questions.forEach(function(question) {
            notes.forEach(function(note) {
                note.value+= question['notes'][note.name];
            });
        });

        notes.sort(function (a, b) {
          return a.value - b.value;
        });
        notes.reverse();
        var type = notes[0].name;

        var paramsTips = {
            TableName: "gaia_tips",
            FilterExpression: "#type=:type",
            ExpressionAttributeValues: {":type":type},
            ExpressionAttributeNames:  {"#type":"type"}
            
        };
        
        getTipsByPilar(conversation, paramsTips, tools.getMessage, callback);

    }else{
        var documentClient = new AWS.DynamoDB.DocumentClient();
        
        var params = {
            TableName: "gaia_questions",
            FilterExpression: "id=:question_id",
            ExpressionAttributeValues: {":question_id":questions[index]['id']}        
        };

        documentClient.scan(params, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                if (data.Items.length==1){
                    var item = data.Items[0];
                    var strResp = questions[index]['response']==true;
                    var notes =[]; 
                    notes["mind"]=item['mind_' + strResp];
                    notes["eat"]=item['eat_' + strResp];
                    notes["move"]=item['move_' + strResp];
                    notes["sleep"]=item['sleep_' + strResp];
                    questions[index]['notes']=notes;
                }
            }
            getResponses(conversation, questions, index+1, callback);
        }); 
    }
}

function getTipsByPilar(conversation, params, getMessage, callback){
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
                var random = tools.shuffle(data.Items)
                infos['data']=random[0];
            }
        }
        
        var paramsUpdate = {
            TableName: "gaia_conversations",
            UpdateExpression: "set calculed_tips_id = :tips, updated_at = :date, #status = :status",
            Key: {"id": conversation},
            ExpressionAttributeNames : {
                "#status": "status"
            },
            ExpressionAttributeValues : {
                ":status": "end",
                ":tips": infos['data']['id'],
                ":date": new Date().toISOString()
            }
        }

        documentClient.update(paramsUpdate, function(err, data){
            console.log(err);
        });
        
        var result = getMessage(status,infos);
        callback(null, result);
    });
}