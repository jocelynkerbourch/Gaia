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
                message = "*Titre* : " + item.title + "\n";
                message+= "Image : " + item.image + "\n";
                message+= "Type : " + item.type + "\n";
                message+= "Tips : " + item.text + "\n";
            }
        }
        infos["message"] = message;
        var result = tools.getMessage(status,infos);
        callback(null, result);
    });
}