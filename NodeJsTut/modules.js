const Logger = require("./event");

const os = require('os');
const uuid = require('uuid');
const http = require('http');

console.log(`Your Id : ${uuid.v4()}\n`);

console.log(`CPU : `, os.cpus()[0]);
console.log(`Platform : ${os.platform()}`);
console.log(`Architecture : ${os.arch()}`);
console.log(`HomeDir : ${os.homedir()}`);
console.log(`UpTime : ${os.uptime()}`);
console.log(`Total Memory: ${os.totalmem()}`);
console.log(`Free Memory:  ${os.freemem()} \n`);


const logger = new Logger();

logger.on("message", data => console.log("Called Listener.....\n", data));

logger.log('Hello');


http.createServer((req, res) => {
    res.write("Hello world!");
    res.end();
}).listen(5050, () => console.log("Server Running on http://127.0.0.1:5050/"));