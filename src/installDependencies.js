import handyp from "handyp";

module.exports = async (target) => {
  await handyp.spawn("npm", ["install"], {
    cwd: target
  }, (type, info) => {
    console.log(`[${type}] ${info.toString()}`);
  });
}