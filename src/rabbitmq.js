import amqp from "amqplib";

let channel;
let connection;

async function connect() {
    if (!connection || !channel) {
        connection = await amqp.connect(Bun.env.RABBIT_URL);
        channel = await connection.createChannel();
        const queue = 'notifications';
        
        await channel.assertQueue(queue, {
            durable: true
        });
    }
}

export async function sendNotification(notificationData) {
    try {
        await connect();

        const queue = 'notifications';
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(notificationData)), {
            persistent: true 
        });

        console.log('Sent notification:', notificationData);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}
