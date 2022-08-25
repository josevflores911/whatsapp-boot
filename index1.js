"use strict";

module.exports.config = {
    directConnect: true,
    baseUrl: "https://web.whatsapp.com/",
    specs: ["some.js"],
    capabilities: {
        "browserName": "chrome",
        "goog:chromeOptions": {
            "excludeSwitches": [ "enable-automation" ],
            "useAutomationExtension": false
         }
    },
    onPrepare() {
        browser.waitForAngularEnabled(false);
    }
};