// public/service-worker.js
if (typeof self !== 'undefined' && 'serviceWorker' in self.navigator) {
    self.navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registration successful:', registration);
      })
      .catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
  } else {
    console.warn('Service workers are not supported in this environment.');
  }
  