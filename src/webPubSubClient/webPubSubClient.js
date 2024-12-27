import { WebPubSubClient } from "@azure/web-pubsub-client";

let pubSubClient;

let initialized = false;
let initializing = false;

export async function initializePubSubClient(url, dispatch) {
    if (initializing || initialized) {
        return;
    }

    initializing = true;

    try {
        const client = new WebPubSubClient(url);
        await client.start();

        client.on("connected", (e) => {
            // FOR DEBUGGING: Connected to server
            // console.log("connected", e.connectionId);
        });

        client.on("disconnected", (e) => {
            // FOR DEBUGGING: Disconnected from server
            // console.log("disconnected", e.message);
        });

        client.on("server-message", (e) => {
            const receivedData = e.message.data;
            // FOR DEBUGGING: Received message from server
            console.log(receivedData);
        });
    } catch (error) {
        console.error("Failed to initialize pubsub client", error);
    }

    initialized = true;
    initializing = false;
}

export default pubSubClient;
