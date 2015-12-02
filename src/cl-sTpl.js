import handyp from "handyp";
import path from "path";
import _ from "lodash";
import installDependencies from './installDependencies';
import gitInit from './gitInit';

let tplPath = path.join(__dirname, "../tpl/cl-s");

let nodeModulePath = path.join(tplPath, 'node_modules');

let createFiles = async (target) => {
    await handyp.copyp(tplPath, target, {
        override: false,
        handler: (info) => {
            if(info.srcPath.indexOf(nodeModulePath) === 0) {
                return false;
            }
            return info;
        }
    });
}

export default async (target) => {
    await createFiles(target);
    await installDependencies(target);
}