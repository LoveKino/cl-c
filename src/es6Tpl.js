import handyp from "handyp";
import path from "path";
import _ from "lodash";
import installDependencies from './installDependencies';
import gitInit from './gitInit';

let es6TplPath = path.join(__dirname, "../tpl/es6Tpl");

let createFiles = async (target) => {
  let projectName = getProjectName(target);
  await handyp.copyp(es6TplPath, target, {
    override: false,
    handler: (info) => {
      tmpl(info, path.join(es6TplPath, "./package.json"), {
        name: projectName
      });
      tmpl(info, path.join(es6TplPath, "./index.js"), {
        name: projectName
      });
      return info;
    }
  });
  await handyp.fs.writeFile(
    path.join(target, `src/${projectName}.js`),
    "module.exports = () => {}",
    "utf-8"
  );
}

let tmpl = (info, p, data) => {
  if (info.srcPath === p) {
    info.source = _.template(info.source)(data);
  }
}

let getProjectName = (target) => path.basename(target);

export default async (target) => {
  await createFiles(target);
  await gitInit(target, getProjectName(target));
  await installDependencies(target);
}