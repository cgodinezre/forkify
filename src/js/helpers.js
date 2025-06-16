import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${s} seconds`)), s * 1000)
  );
};

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
