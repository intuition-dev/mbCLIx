let active = false;

let activate = () => {
    // chrome.browserAction.setBadgeText({ text: "ready" });
    active = true;
    console.info("Extension is active");
    chrome.browserAction.setIcon({path:"icon.png"});

}

let deactivate = () => {
    // chrome.browserAction.setBadgeText({ text: "N/A" });
    active = false;
    console.info("Extension deactivated");
    chrome.browserAction.setIcon({path:"icon_disabled.png"});
}

function isActive() { return active; }

let checkExtStatus = function () {
    deactivate();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
            tabs.forEach(function (activeTab) {
                if (typeof activeTab.url !== 'undefined') {
                    console.info('activeTab ------>', activeTab, activeTab.url);
                    chrome.extension.sendMessage('hello');
                    
                    var url = new URL(activeTab.url);
                    var domain = url.hostname;
                    if (url.protocol === 'http:' || url.protocol === 'https:') {
                        var map = url.protocol + '//' + domain + '/map.yaml';
                        console.info('map ------>', map);
                        
                        $.get(map)
                        .done(function (res) {
                            let map = jsyaml.load(res);
                            console.info('RES:', res, map.isAdmin);
                            if (typeof map.isAdmin !== 'undefined' && map.isAdmin === true) {
                                activate();
                            } else {
                                deactivate();
                            }
                        })
                        .fail(deactivate);
                    } else {
                        deactivate();
                    }
                } else {
                    deactivate();
                }
                
            })
        })
    })
};

chrome.tabs.onUpdated.addListener(checkExtStatus);
chrome.tabs.onActivated.addListener(checkExtStatus);