var AWS = require('aws-sdk');
var tools = require('./tools.js');

exports.handler = function(event, context, callback) {
    getStatistiques (event, callback);
}
 
function getStatistiques (event, callback) {

    var conversation = tools.getParameter(event,"conversation");
    var params = {
        TableName: "gaia_conversations"
    };


    //all stats per days, weeks, years

    //conversation pending
    //conversation end
    //top 5 tips
}