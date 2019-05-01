let bgPage = chrome.extension.getBackgroundPage();

function consoleLog(msg) {
   bgPage.console.info.apply(null, arguments);
}

document.addEventListener('DOMContentLoaded', function () {
   chrome.runtime.onMessage.addListener(
      function (message, callback) {
         consoleLog("MSG:", message);
      }
   );

   consoleLog('isActive', bgPage.isActive());
   if (bgPage.isActive()) {
      consoleLog($('#check'), 'ON');

      var checkPageButton = document.getElementById('check');
      checkPageButton.disabled = false;
      checkPageButton.addEventListener('click', function() {
         // redirect to WebAdmin
         chrome.tabs.update({url: "http://157.230.189.157:9080"});
      });
   } else {
      consoleLog($('#check'), 'OFF');
   }


   // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
   //    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
   //       tabs.forEach(element => {       
   //          var url = new URL(element.url);
   //          var domain = url.hostname;
   //          var map = 'http://' + domain + '/map.yaml';
   //          // consoleLog('map ------>', map);

   //          $.get(map)
   //             .done(function(res){
   //                let map = jsyaml.load(res);
   //                consoleLog('RES:', res, map.isAdmin);
   //                if (typeof map.isAdmin !== 'undefined' && map.isAdmin === true) {
   //                   chrome.browserAction.setBadgeText({text:"ready"});
   //                } else {
   //                   chrome.browserAction.setBadgeText({text:"X"});
   //                }
   //             })
   //             .fail(function(err){
   //                consoleLog('ERR:', err);
   //                chrome.browserAction.setBadgeText({text:"X"});
   //             });

   //          var checkPageButton = document.getElementById('check');
   //          checkPageButton.addEventListener('click', function() {
   //             // TODO redirect to admin CMS
   //          });

   //       });
   //    });
   // });

}, false);
