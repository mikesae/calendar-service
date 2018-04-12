const { google } = require('googleapis');
const privateKey = require('./pk.json');

// configure a JWT auth client
const jwtClient = new google.auth.JWT(
    privateKey.client_email,
    null,
    privateKey.private_key,
    ['https://www.googleapis.com/auth/calendar']
);

// authenticate request
jwtClient.authorize(error => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Authorized.")
});

const calendar = google.calendar('v3');
calendar.events.list({
    auth: jwtClient,
    calendarId: 'ia0ttobe2lkaaii29h3lghtobk@group.calendar.google.com'
}, (error, response) => {
    if (error) {
        console.log(`Calendar service returned an error: ${error}`);
        return
    }
    const dinners = response.data.items;
    console.log(`response: ${response.data}`);
    if (dinners.length === 0) {
        console.log('No dinners found');
    } else {
        console.log('Dinners:');
        for(const dinner of dinners) {
            console.log(`Dinner: ${dinner.summary}`);
        }
    }
});