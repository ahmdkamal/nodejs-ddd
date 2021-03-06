const https = require('http');
require('dotenv').config({path: `.env`});

const appConfig = require('./src');

appConfig().then(app => {
    /**
     * Get port from environment and store in Express.
     */

    const normalizePort = val => {
        const _port = parseInt(val, 10);

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(_port)) {
            // named pipe
            return val;
        }

        if (_port >= 0) {
            // _port number
            return _port;
        }

        return false;
    };

    const port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    /**
     * Create HTTP server.
     */
    let server;
    server = https.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    /**
     * Event listener for HTTP server "error" event.
     */

    const onError = error => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                // eslint-disable-next-line no-console
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                // eslint-disable-next-line no-console
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };

    /**
     * Event listener for HTTP server "listening" event.
     */

    const onListening = () => {
        const addr = server.address();
        const bind =
            typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        // eslint-disable-next-line no-console
        console.log(`Listening on ${bind}`);
    };

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Normalize a port into a number, string, or false.
     */
});