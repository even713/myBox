if (document.URL.indexOf( 'http://' ) === -1
  && document.URL.indexOf( 'https://' ) === -1) {
  console.log("URL: Running in Cordova/PhoneGap");
  document.addEventListener('deviceready', function onDeviceReady() {
    angular.bootstrap(document, ['myBox']);
  }, false);
} else {
  console.log("URL: Running in browser");
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['myBox']);
    //angular.resumeBootstrap();
  });
}
