const { Expo } = require('expo-server-sdk');
export const sendNotifications = async ({tokens, title, body, url, type_id, user_chat_session_id}:{tokens: string[], title: string, body: string, url?: string, type_id?: number, user_chat_session_id?: string}) => {
    let expo = new Expo({
        useFcmV1: true,
    });
    let messages = [];

    for (let pushToken of tokens) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        messages.push({
            to: pushToken,
            sound: 'default',
            title: title,
            body: body,
            data: { url, type_id, user_chat_session_id },
        })
    }


    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                // console.log(ticketChunk, "--> ticketChunk");
                tickets.push(...ticketChunk);
                // NOTE: If a ticket contains an error code in ticket.details.error, you
                // must handle it appropriately. The error codes are listed in the Expo
                // documentation:
                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            } catch (error) {
                console.error(error);
            }
        }
    })();
}