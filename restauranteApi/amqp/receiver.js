var amqp = require('amqplib');

class Receiver {

    constructor(host, queue) {
        this.host = host;
        this.queue = queue;
    }

    receiveMessage(messageHandler) {
        let _self = this;
        amqp.connect(this.host).then(function (connection) {
            return connection.createChannel().then(function (channel) {
                var ok = channel.assertQueue(_self.queue, { durable: false });

                ok = ok.then(function (_qok) {
                    return channel.consume(_self.queue, function (message) {
                        messageHandler(message);
                        connection.close();
                    }, { noAck: true });
                });
            });
        }).catch(console.warn);
    }
}

exports.Receiver = Receiver;