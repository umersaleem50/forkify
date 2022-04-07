import { TIMEOUT_DURATION } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// const setTimeout = async function (sec) {

// };

export const AJAX = async function (url, uploadData = undefined) {
  // export const getJSON = async function (url) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    console.log(fetchPro);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_DURATION)]);
    const data = await res.json();
    if (!res.ok) throw new Error('Something went wrong! in getting json');
    return data;
  } catch (err) {
    // console.error(err.message);
    throw err;
  }
};

// export const sendJSON = async function (url, updateData) {
//   try {
// const res = await Promise.race([
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updateData),
//   }),
//   timeout(TIMEOUT_DURATION),
// ]);
//   console.log(res);
//   const data = await res.json();
//   if (!res.ok)
//     throw new Error('Something went wrong while sending Json, in helper.js');
//   return data;
// } catch (err) {
//   throw err;
// }
// };
