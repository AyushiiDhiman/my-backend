// utils/constants.js

// Topics for videos/PDFs
const TOPICS = {
  AWS: "aws",
  GCP: "gcp",
  AZURE: "azure",
  KUBERNETES: "kubernetes",
  DEVOPS: "devops",
  DATA: "data",
  SERVERLESS: "serverless"
};

// Tags commonly used for videos/PDFs
const TAGS = {
  BEGINNER: "beginner",
  CERTIFICATION: "certification",
  HANDS_ON: "hands-on",
  IAC: "iac", // Infrastructure as Code
  ETL: "etl",
  LAMBDA: "lambda",
  DOCKER: "docker",
  K8S: "k8s"
};

// Hardcoded status messages
const STATUS = {
  SUCCESS: "success",
  FAILURE: "failure"
};

// Example: default pagination limit
const DEFAULT_LIMIT = 20;

module.exports = { TOPICS, TAGS, STATUS, DEFAULT_LIMIT };
