var http = require('http');
var methods = require("./methods");

http.createServer(function(req, res)
{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    //Callback
    methods.increaseSize(20, function(size) {
        console.log("Size in now " + size + " points");
    });

    //Promise
    methods.testPromise();

    //Async
    methods.asyncTest().then
    (
        result => console.log("Async succeded"),
        error => console.log(error.message)
    );

    //Async + Await
    methods.asyncAwaitTest();

    //Callback + Promise
    methods.callbackPromiseTest();


    res.end("Hello");
}).listen(8080);