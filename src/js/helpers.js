import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// Rejects Promise if timer is up.
//
// seconds: timeout time in seconds.
const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      );
    }, seconds * 1000);
  });
};

// getJSON
// Retrieve data from given url
//
// url: url where data is fetched
export const getJSON = async function (url) {
  try {
    // fetch and then get data
    // use timeout function to terminate fetch if it's taking too long
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // if response header ok was unsuccesful throw error
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
