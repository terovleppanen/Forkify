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

// Function either sends or receives JSON data from remote API.
// If uploadData is sent it sends if not we get data from API.
//
// url: URL
// uploadData: (undefined by default) Data we upload to API.
//             If not defined, we get data.
//
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // Construct promise depending if we got uploadData or not
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // fetch and then get data
    // use timeout function to terminate fetch if it's taking too long
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // if response header ok was unsuccesful throw error
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

/*
* Two functions from AJAX was refactored.
*

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

// Send JSON data to url
//
// url: URL to send to
//
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchProm = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    // fetch and then get data
    // use timeout function to terminate fetch if it's taking too long
    const res = await Promise.race([fetchProm, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // if response header ok was unsuccesful throw error
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
*/
