import amqp from "amqplib";

let channel;

async function connectToRabbitMQ() {
    const connection = await amqp.connect(Bun.env.RABBIT_URL);
    channel = await connection.createChannel();
    const queue = 'notifications';
  
    await channel.assertQueue(queue, {
      durable: true
    });
  
    console.log(`Connected to RabbitMQ and waiting for messages in ${queue}.`);
}
  
async function consumeNotifications() {
    const queue = 'notifications';
    channel.consume(queue, async (msg) => { 
        if (msg != null) {
            const notificationData = JSON.parse(msg.content.toString());
            await handleNotification(notificationData); 
            channel.ack(msg);
        }
    });
}


async function handleNotification(notificationData) {
    console.log('Received notification:', notificationData);

    switch (notificationData.action) {
        case 'create':
            console.log('Создана новая задача:', notificationData.task);
            break;
        case 'update':
            console.log('Задача обновлена:', notificationData.task);
            break;
        case 'delete':
            console.log('Задача удалена:', notificationData.task);
            break;
        default:
            console.log('Не понятное для меня действие:', notificationData.action);
    }
}

connectToRabbitMQ().then(consumeNotifications).catch(console.error);
