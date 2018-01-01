var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    getQuestions (event, callback);
}
 
function getQuestions (event, callback) {

    var conversation = tools.getParameter(event,"conversation");
    var params = {
        TableName: "gaia_questions"
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();
    documentClient.scan(params, function(err, data) {
        
        var status = "scan";
        var infos={"params":params};
        if (err) {
            status = "error";
        } else {
            if (data.Items.length==0){
                status = "empty";
            }else{
                var message = "Il y a " + data.Items.length + " questions  : \n";
                data.Items.forEach(function(item,idx, array) {
                    message+= "• (_" + item.id + "_)\n" + item.question + "\n";
                });
                infos['message']=message;
            }
        }
        var result = tools.getMessage(status,infos);
        callback(null, result);
    });
}