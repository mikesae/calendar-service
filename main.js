const {google} = require('googleapis');
const privateKey = require('./pk.json');
const dayOfWeek = require('day-of-week').get;

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

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const itemToDinner = item => {
    const date = new Date(item.start.date);
    return {date: date.toString(), day: weekdays[dayOfWeek(item.start.date)], summary: item.summary}
};

const calendar = google.calendar('v3');
calendar.events.list({
    auth: jwtClient,
    calendarId: 'ia0ttobe2lkaaii29h3lghtobk@group.calendar.google.com',
    fields: ['items/summary, items/start']
}, (error, response) => {
    if (error) {
        console.log(`Calendar service returned an error: ${error}`);
        return
    }
    const items = response.data.items;

    if (items.length === 0) {
        console.log('No dinners found');
    } else {
        console.log('Dinners:');
        for (const item of items) {
            const dinner = itemToDinner(item);
            console.log(`${dinner.day}, ${dinner.date}: ${dinner.summary}`);
        }
    }
});