var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    setTips (event, callback);
}
 
function setTips (event, callback) {

    var uniqid = (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
    var title = tools.getParameter(event,"title");
    var text = tools.getParameter(event,"text");
    var image = tools.getParameter(event,"image");
    var type = tools.getParameter(event,"type");

    var items = {
            "id": uniqid,
            "title": title,
            "text": text,
            "image": image,
            "type": type
        };
    var params = {
        TableName:"gaia_tips",
        Item:items
    };

    putItem(params, tools.getMessage, callback);
}

function putItem(params, getMessage, callback) {
    if(
        params.Item.title!=null &&
        params.Item.text!=null &&
        params.Item.image!=null &&
        params.Item.type!=null &&
        (
            params.Item.type=="mind" ||
            params.Item.type=="eat" ||
            params.Item.type=="move" ||
            params.Item.type=="sleep"
        )
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
