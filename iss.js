const request = require('request');

const fetchMyIP = function (callback) {
  request('https://api.ipify.org/?format=json', function (error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // console.log(typeof body);
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  })
};

const fetchCoordsbyIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const errMsg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(errMsg, null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    // console.log({latitude, longitude});

    callback(null, { latitude, longitude });

  })

};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const errorMsg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`
      callback(Error(errorMsg), null);
      return;
    }

    const output = JSON.parse(body).response;

    callback(null, output);

  })
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsbyIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, times);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsbyIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };