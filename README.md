# Service Bus, Event Hub and Logic App DEMO

The objective of this DEMO is to showcase the difference in how to integrate Service Bus and Event Hub using an SDK. In addition, we will explore how Logic App can integrate with both the messaging services.

The high level architecture:
![Architecture](https://github.com/fdelivamsft/service-bus-event-hub-demo/raw/main/readme/highlevel.jpg)


## Getting started

### Install the packages

1. Clone the repository
2. Install the Azure Event Hubs client library using npm

```bash
cd event-hub
npm install
```
3. Install the Azure Service Bus client library using npm

```bash
cd service-bus
npm install
```
### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Event Hubs Namespace](https://docs.microsoft.com/azure/event-hubs/)
- A [Service Bus](https://docs.microsoft.com/azure/service-bus/)
- A [Logic App](https://docs.microsoft.com/en-us/azure/logic-apps/)

### Create two subscription inside Service Bus

As you can notice from the content of the folder "service-bus/topic/" you can find two receivers. Each receiver is associated two a different subscription. The best way to explore this concept is to create two subscription and a filter read this introduction: [Topic filters and actions](https://docs.microsoft.com/en-us/azure/service-bus-messaging/topic-filters)

This is an snapshot of the one used in this DEMO:

![Filter example](https://github.com/fdelivamsft/service-bus-event-hub-demo/raw/master/readme/filterSubscriber.jpg)

### Learn how to use the Javscript SDKs for Service Bus and Event Hub

Please read carefully the following guides:
- [Event Hubs SDK](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-node-get-started-send) and the [reference guide](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/?view=azure-node-latest)
- [Service Bus SDK](https://www.npmjs.com/package/@azure/service-bus) and the [reference guide](https://docs.microsoft.com/en-us/javascript/api/@azure/service-bus/?view=azure-node-latest)

## Configure the javascript files

You should now create the connection strings associated to the Event Hub and Service Bus that you created and copy paste it in the relevant files"
```bash
/service-bus/topic/sendTopic.js
/service-bus/topic/receivefromsubscriptionAll.js
/service-bus/topic/receivefromsubscriptionRecent.js
/event-hub/event-hub-send.js
/event-hub/event-hub-receive.js
```
In each of those file, you will find variables at the top of the files where you need to copy paste the connection string.

## Configure the Logic App

In this section we will create a Logic App with the following logic:
![logicApp](https://github.com/fdelivamsft/service-bus-event-hub-demo/raw/master/readme/logicApp.jpg)

1. Please create a HTTP request trigger Logic App. You can follow this [example](https://docs.microsoft.com/en-us/azure/connectors/connectors-native-reqres#add-request-trigger).
The message payload that you can use to generate the payload is the following:
```bash
{
  "isEvent" : "Y",
  "body": "Galileo"
}
```

2. After the HTTP trigger, please create a condition with this basic logic:
![Condition](https://github.com/fdelivamsft/service-bus-event-hub-demo/raw/master/readme/condition.jpg)

3. In this step, you should create the Service Bus and Event Hub action to send message in the respective queues. Please check the images and the guides below:
![Connectors](https://github.com/fdelivamsft/service-bus-vs-event-hub/raw/master/readme/orchestration.jpg)****
[Integrate Logic app with Event Hubs](https://docs.microsoft.com/en-us/azure/connectors/connectors-create-api-azure-event-hubs)
[Integrate Logic app with Service Bus](https://docs.microsoft.com/en-us/azure/connectors/connectors-create-api-servicebus)

4. In the last step you should provide a response to your client:
![Response](https://github.com/fdelivamsft/service-bus-event-hub-demo/raw/master/readme/response.jpg)

## Test it

The overall flow should be the following:
![Demo Architecture](https://github.com/fdelivamsft/service-bus-event-hub-demo/raw/master/readme/DemoOVerview.jpg)

You can test the service-bus with the following commands:
```bash
cd /service-bus/topic
node receivefromsubscriptionAll.js
node sendTopic.js
```

You can test the event-hub with the following commands:
```bash
cd /event-hub
node event-hub-receive.js
node event-hub-send.js
```

If you want to test the overall integration, you can use postman. Select the Method POST and as URL the Logic App url. The request body should be set to JSON and you can send the following content to trigger the Event Hub:
```bash
{
  "isEvent" : "Y",
  "body": "Galileo"
}
```
And the following content to trigger the Service Bus:
```bash
{
  "isEvent" : "Y",
  "body": "Galileo"
}
```
