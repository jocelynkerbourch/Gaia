var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    getQuestionDetail (event, callback);
}
 
function getQuestionDetail (event, callback) {

    var id = tools.getParameter(event,"id");
    if (id==null){
        var result = tools.getMessage("error",{"message":"no id define"});
        callback(null, result);
    }

    var params = {
        TableName: "gaia_questions",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues : {":id" : id}
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();
    documentClient.query(params, function(err, data) {
        
        var status = "scan";
        var message = "";
        var infos={"params":params};
        if (err) {
            status = "error";
        } else {
            if (data.Items.length==0){
                status = "empty";
                message = "Cet ID n'existe pas 🤔";
            }else{
                infos["data"] = data;
                var item = data.Items[0];
                message = "❓*Question* : " + item.question + "\n";
                message+= "🍴Eat/Oui : " + item.eat_true + "\n";
                message+= "🍴Eat/Non : " + item.eat_false + "\n";
                message+= "🧘Mind/Oui : " + item.mind_true + "\n";
                message+= "🧘Mind/Non : " + item.mind_false + "\n";
                message+= "🏃‍Move/Oui : " + item.move_true + "\n";
                message+= "🏃‍️Move/Non : " + item.move_false + "\n";
                message+= "💤Sleep/Oui : " + item.sleep_true + "\n";
                message+= "💤Sleep/Non : " + item.sleep_false + "\n";
            }
        }
        infos["message"] = message;
        var result = tools.getMessage(status,infos);
        callback(null, result);
    });
}