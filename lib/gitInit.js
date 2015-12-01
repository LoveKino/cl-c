import handyp from "handyp";
import path from 'path';

module.exports = async (target, projectName) => {
  await handyp.spawn("git", ["init"], {
    cwd: target
  }, (type, info) => {
    console.log(`[${type}] ${info.toString()}`);
  });

  await handyp.spawn("git", ["remote", "add", "origin",
    `https://github.com/LoveKino/${projectName}.git`
  ], {
    cwd: target
  }, (type, info) => {
    console.log(`[${type}] ${info.toString()}`);
  });

  await handyp.spawn("git", ["add", "*"], {
    cwd: target
  }, (type, info) => {
    console.log(`[${type}] ${info.toString()}`);
  });

  await handyp.spawn("git", ["commit", "-m", "init"], {
    cwd: target
  }, (type, info) => {
    console.log(`[${type}] ${info.toString()}`);
  });
}