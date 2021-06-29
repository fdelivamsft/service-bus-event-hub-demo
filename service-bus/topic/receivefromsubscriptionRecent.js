const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");

const connectionString = "SERVICE BUS CONNECTION STRING"
const topicName = "TOPIC NAME";
const subscriptionName = "FILTERED SUBSCRIPTION NAME";

 async function main() {
	// create a Service Bus client using the connection string to the Service Bus namespace
	const sbClient = new ServiceBusClient(connectionString);

	// createReceiver() can also be used to create a receiver for a queue.
	const receiver = sbClient.createReceiver(topicName, subscriptionName);

	// function to handle messages
	const myMessageHandler = async (messageReceived) => {
		console.log(`Received message, name: ${messageReceived.body.name}`);
	};

	// avoid auto peek https://stackoverflow.com/questions/43361331/how-to-fetch-messages-from-an-azure-service-bus-queue-in-peeklock-mode-using-a

	// function to handle any errors
	const myErrorHandler = async (error) => {
		console.log(error);
	};

	// subscribe and specify the message and error handlers
	receiver.subscribe({
		processMessage: myMessageHandler,
		processError: myErrorHandler
	});

	// Waiting long enough before closing the sender to send messages
	await delay(5000);

	await receiver.close();	
	await sbClient.close();
}

// call the main function
main().catch((err) => {
	console.log("Error occurred: ", err);
	process.exit(1);
 });