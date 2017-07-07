var amqp = require('amqplib');

class Client {

    constructor(host, requestQueue) {
        this.host = host;
        this.requestQueue = requestQueue;
    }

    uuid(len) {
        var buf = []
            , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            , charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[this.getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    sendRequest(message, replyHandler) {
        let _self = this;
        amqp.connect(this.host).then(function (conn) {
            return conn.createChannel().then(function (ch) {
                return new Promise(function (resolve) {
                    var correlationId = _self.uuid(16);
                    function checkForAnswer(msg) {
                        if (msg.properties.correlationId === correlationId) {
                            resolve(msg.content.toString());
                        }
                    }

                    //Se crea una cola dejando que el servidor elija el nombre, esta sera usada como cola de respuesta
                    var ok = ch.assertQueue('', { exclusive: true })
                        .then(function (qok) { return qok.queue; });

                    ok = ok.then(function (queue) {
                        return ch.consume(queue, checkForAnswer, { noAck: true })
                            .then(function () { return queue; });
                    });

                    ok = ok.then(function (queue) {
                        console.log(`Peticion enviada con exito ${message}`);
                        ch.sendToQueue(_self.requestQueue, Buffer.from(message), {
                            correlationId: correlationId, replyTo: queue
                        });
                    });
                });
            })
                .then(replyHandler)
                .finally(function () { conn.close(); });
        }).catch(console.warn);
    }
}

class Server {
    constructor(host, requestQueue) {
        this.host = host;
        this.requestQueue = requestQueue;
    }

    start(requestHandler) {
        let _self = this;
        amqp.connect(this.host).then(function (conn) {
            process.once('SIGINT', function () { conn.close(); });
            return conn.createChannel().then(function (ch) {
                var ok = ch.assertQueue(_self.requestQueue, { durable: false });
                var ok = ok.then(function () {
                    ch.prefetch(1);
                    return ch.consume(_self.requestQueue, reply);
                });
                return ok.then(function () {
                    console.log('Servidor iniciado');
                });

                function reply(msg) {
                    requestHandler.processRequestMessage(msg.content.toString())
                        .then(function (reply) {
                            ch.sendToQueue(msg.properties.replyTo,
                                Buffer.from(reply),
                                { correlationId: msg.properties.correlationId });
                            ch.ack(msg);
                        }).catch(console.warn);
                }
            });
        }).catch(console.warn);
    }
}

exports.Client = Client;
exports.Server = Server;