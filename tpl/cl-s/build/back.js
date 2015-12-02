import Task from 'cl-task';
import path from 'path';
import handyp from 'handyp';
let babel = require("babel-core");

let {
    task, timeTask, fileTask
} = Task({
    watch: {
        dirs: [
            path.join(__dirname, "../src"),
            path.join(__dirname, "../test")
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

let runTestTask = task(async ()=>{
    await handyp.spawn('npm' , ['test'], {} ,(type, info) => {
        console.log(`[${type}] ${info}`);
    });
});

let startTask = task(() => {
    console.log('************* start back programe ************');
}).c(es6Task, runTestTask);

let backTask = fileTask('raw', async () => {
    await startTask();
}).c(startTask);

module.exports = backTask;