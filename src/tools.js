module.exports ={
    getMessage : function (status,infos){
        var body = {"status": status, infos};
        var statusCode = 200;
        return {
            "statusCode": statusCode,
            "headers": {},
            "body": JSON.stringify(body)
        };
    },

    getParameter : function (event,param) {
        var val = null;
        if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
            if (event.queryStringParameters[param] !== undefined && 
                event.queryStringParameters[param] !== null && 
                event.queryStringParameters[param] !== "") {
                val = event.queryStringParameters[param] ;
            }
        }
        return val;
    },

    shuffle : function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },

    isEmptyObject : function (obj) {
        return !Object.keys(obj).length;
    }
    
};