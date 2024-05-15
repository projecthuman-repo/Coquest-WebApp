function getJson(str) {
  try {
      return JSON.parse(str);
  } catch (e) {
      return "";
  }
}

module.exports = {
  getJson,
};
