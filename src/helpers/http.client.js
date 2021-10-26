const axios = require('axios');

module.exports = class HttpClient {
  constructor(baseUrl) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  get(url) {
    return this.axiosInstance.get(url);
  }
};
