const {coinCount} = require('./p3-module.js');
const fs = require('fs');
const fastify = require("fastify")();

//Basic Route
fastify.get("/", (request, reply) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if (err) {
            reply.code(500)
            reply.header("Content-Type", "text/html; charset=utf-8")
            reply.send("<h1>An error has occured</h1>")
        } else {
            reply.code(200)
            reply.header("Content-Type", "text/html; charset=utf-8")
            reply.send(data);
        }
    });
});

//Coin Route
fastify.get("/coin", (request, reply) => {
    const {denom = 0, count = 0} = request.query;
    const coinValue = coinCount({denom: denom, count: count})
    reply.code(200)
    reply.header("Content-Type", "text/html; charset=utf-8")
    reply.send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
})


//Coins Route
fastify.get("/coins", (request, reply) => {
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    const {option} = request.query;
    let coinValue = 0
    switch(option) {
        //Option 1
        case "1":
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }); 
            break;
        //Option 2
        case "2":
            coinValue = coinCount(...coins);
            break;
    }
    reply.code(200)
    reply.header("Content-Type", "text/html; charset=utf-8")
    reply.send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`)
})


//Server Listener
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

