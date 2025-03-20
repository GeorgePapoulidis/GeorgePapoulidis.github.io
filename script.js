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

