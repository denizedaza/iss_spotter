const { fetchMyIP, fetchCoordsbyIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});

fetchCoordsbyIP('99.226.209.50', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned coordinates:', coordinates);
});

fetchISSFlyOverTimes({ latitude: 43.7952, longitude: -79.267 }, (error, times) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned times:', times);

});
*/

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didnt work!", error);
  }

  printPassTimes(passTimes);
});

module.exports = printPassTimes;