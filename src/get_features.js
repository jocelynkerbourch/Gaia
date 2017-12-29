var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    getFeatures (event, callback);
}
 
function getFeatures (event, callback) {

    var conversation = tools.getParameter(event,"conversation");
    var params = {
        TableName: "gaia_features"
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
                var message = "";
                data.Items.forEach(function(item,idx, array) {
                    message+= "(" + item.id + ") " + item.phrase + "\n" + item.description;
                });
                infos['message']=message;
            }
        }
        var result = tools.getMessage(status,infos);
        callback(null, result);
    });
}