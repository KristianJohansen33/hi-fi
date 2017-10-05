const restify = require('restify');
const corsmiddleware = require('restify-cors-middleware');
const server = restify.createServer({
    'name': 'hi_fi_lort',
    'version': '1.0.0'
});

server.use(restify.plugins.bodyParser());
const cors = corsmiddleware({ origins: ['*'] });
server.pre(cors.preflight);
server.use(cors.actual);

require('./routes/index')(server);

server.listen(1337);