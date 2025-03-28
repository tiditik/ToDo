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

async function sendMessageToTelegram(data) {
    const response = await fetch(`https://api.telegram.org/bot${Bun.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${716609984}&text=${encodeURIComponent(data.message)}`, {
        method: 'POST'
    });

    if (!response.ok) {
        throw new Error('Ошибка при отправке сообщения в Telegram');
    }

    const result = await response.json();
    return result;
}

async function handleNotification(notificationData) {
    console.log('Received notification:', notificationData);

    switch (notificationData.action) {
        case 'create':
            console.log('Создана новая задача:', notificationData.task);
            await sendMessageToTelegram({ message: `Создана новая задача: ${notificationData.task.title}` }); 
            break;
        case 'update':
            console.log('Задача обновлена:', notificationData.task);
            await sendMessageToTelegram({ message: `Задача обновлена: ${notificationData.task.title}` });
            break;
        case 'delete':
            console.log('Задача удалена:', notificationData.task);
            await sendMessageToTelegram({ message: `Задача с ID ${notificationData.task.id } удалена` });
            break;
        default:
            console.log('Не понятное для меня действие:', notificationData.action);
    }
}

connectToRabbitMQ().then(consumeNotifications).catch(console.error);
