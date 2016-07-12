var path = require('path');
var fs = require('fs');
var store = require('sclip/store');
var pm2 = require('pm2');


function start () {
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
        setAutoRun();
    });
}

function setAutoRun () {
    var HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    var pm2Path = path.resolve(path.join(__dirname, 'node_modules/.bin/pm2'));
    var sclipPath = path.resolve(path.join(__dirname, 'node_modules/.bin/sclip'));
    var zshrcPath = path.join(HOME, '.zshrc');
    var bashrcPath = path.join(HOME, '.bash_profile');
    fs.stat(zshrcPath, function (err, stats) {
        var rcPath = err ? bashrcPath : zshrcPath;
        var content = String(fs.readFileSync(rcPath));
        if (content.indexOf('sclip') > 0) {
            return;
        }
        content += '\n\n' + pm2Path + ' start ' + sclipPath + ' -s -- --no_notify';
        fs.writeFileSync(rcPath, content);
    })
}

start();