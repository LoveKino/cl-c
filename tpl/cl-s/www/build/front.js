// ./node_modules/.bin/babel-node www/build/task.js

import Task from 'cl-task';
import path from 'path';
import handyp from 'handyp';
let babel = require("babel-core");

let {
    task, timeTask, fileTask
} = Task({
    watch: {
        dirs: [
            path.join(__dirname, "../src")
        ],
        conf: {
            ignored: /node_modules/,
            persistent: true
        }
    }
});

let es6Task = task(async (...y) => {
    let src = path.join(__dirname, "../src");
    let tar = path.join(__dirname, "../lib");
    try {
        await handyp.deletep(tar);
        console.log('***********compile es7 to es5 with babel***********');
        await handyp.copyp(src, tar, {
            handler: (info) => {
                let ext = path.extname(info.srcPath);
                if (ext === '.js') {
                    try {
                        info.source = babel.transform(info.source, {
                            "presets": ["es2015", "stage-0"]
                        }).code;
                        console.log(
                            `${info.srcPath} -> ${info.tarPath}`);
                    } catch (e) {
                        console.warn && console.warn(
                            `error: path[${info.srcPath}] error[${e}]`
                        );
                    }
                }

                return info;
            }
        });
    } catch (err) {
        console.log(err);
    };
});

let startTask = task(() => {
    console.log('************* front programe ************');
}).c(es6Task);


let frontTask = fileTask('raw', async () => {
    await es6Task();
}).c(startTask);

module.exports = frontTask;