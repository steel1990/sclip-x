var store = require('sclip/store');

var pwd = store.getLocalConfigByKey('pwd');
var wilddogUrl = store.getLocalConfigByKey('wilddogUrl');

if (!pwd || !wilddogUrl) {
    store.getConfig({
        pwd: {
            key: 'pwd',
            type: 'password',
            message: 'Enter your password:'
        },
        wilddogUrl: {
            key: 'wilddogUrl',
            type: 'input',
            message: 'Enter your Wilddog url:'
        }
    }).then(cfg => {
        console.log(cfg);
    });
}