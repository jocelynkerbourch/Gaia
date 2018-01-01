var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    unsetQuestion (event, callback);
}
 
function unsetQuestion (event, callback) {

    var id = tools.getParameter(event,"id");
    if (id==null){
        var result = tools.getMessage("error",{"message":"no id define"});
        callback(null, result);
    }

    var params = {
        TableName: "gaia_questions",
        Key:{"id":id}
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();
    documentClient.delete(params, function(err, data) {
        
        var status = "delete";
        var message = "";
        var infos={"params":params};
        if (err) {
            status = "error";
        } else {
            message = "La question à été supprimé";
        }
        infos["message"] = message;
        var result = tools.getMessage(status,infos);
        callback(null, result);
    });
}