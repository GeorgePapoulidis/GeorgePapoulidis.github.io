document.getElementById('push-btn').addEventListener('click', () => {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Push notifications granted!');
            // You can now send a push notification via Gozen Notify
            //subscribeUserToPush();
        } else {
            console.log('Push notifications denied!');
        }
    });
});



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
        console.log('Service Worker registration failed:', error);
    });
}









const button = document.getElementById('create-and-download-btn');

button.addEventListener('click', function() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('name');  // Get the 'name' parameter
    const eventTime = urlParams.get('time');  // Get the 'time' parameter (in 24-hour format, e.g., "13:30")

// Ensure parameters are present
if (!eventName || !eventTime) {
    alert("Missing required parameters: 'name' or 'time'.");
    return;
}

// Set the current date and combine it with the provided time to create the event's start time
const now = new Date();
const [hours, minutes] = eventTime.split(':'); // Split the time into hours and minutes
const eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

// Format the date in the required iCalendar format (YYYYMMDDTHHmmSSZ)
const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0];
};

const startFormatted = formatDate(eventDate);
const endFormatted = formatDate(new Date(eventDate.getTime() + 60 * 60 * 1000)); // 1 hour duration

// iCalendar content for an event
const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourCompany//NONSGML Event//EN
BEGIN:VEVENT
UID:${startFormatted}-your-unique-id@example.com
DTSTAMP:${startFormatted}
DTSTART:${startFormatted}
DTEND:${endFormatted}
SUMMARY:${eventName}
DESCRIPTION:This event was generated dynamically.
LOCATION:Online
STATUS:CONFIRMED
PRIORITY:5
BEGIN:VALARM
TRIGGER:-PT15M
DESCRIPTION:Reminder for ${eventName}
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR
`;

// Create a Blob with the iCalendar content
const blob = new Blob([icsContent], { type: 'text/calendar' });

// Create a URL for the Blob
const icsURL = URL.createObjectURL(blob);

// Create a temporary link element to trigger the download
const tempLink = document.createElement('a');
tempLink.href = icsURL;
tempLink.download = 'event.ics'; // Default name for the downloaded file
tempLink.click(); // Trigger the download

// Clean up by revoking the object URL after the download is triggered
URL.revokeObjectURL(icsURL);
});

