var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    getStatistiques (event, callback);
}
 
function getStatistiques (event, callback) {

    var conversation = tools.getParameter(event,"conversation");
    var params = {
        TableName: "gaia_conversations",
        "created_at" "2017-12-23T00:00:00" "2017-12-23T23:59:59"

    };


    var documentClient = new AWS.DynamoDB.DocumentClient();
    documentClient.scan(params, function(err, data) {
        
        var status = "scan";
        var infos={"params":params, "data":{}};
        if (err) {
            status = "error";
        } else {
            data.Items.forEach(function(item,idx, array) {
                
            });
		    //all stats per days, weeks, years

		    //conversation pending
		    //conversation end
		    "status end" 
		    "status pending"
		    "group by calculed_tips_id limit 5"
		    //top 5 tips                
        }
        var result = tools.getMessage(status,infos);
        callback(null, result);
    });


}