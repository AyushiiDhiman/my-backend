function logInfo(message) {
  console.log(`ℹ️ [INFO]: ${message}`);
}

function logError(message) {
  console.error(`❌ [ERROR]: ${message}`);
}

module.exports = { logInfo, logError };
const { logInfo, logError } = require("../utils/logger");

logInfo("Fetching all videos");
