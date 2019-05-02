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
            chrome.tabs.update({url: bgPage.getWebAdminUrl() });
        });
    } else {
        consoleLog($('#check'), 'OFF');
    }

}, false);
