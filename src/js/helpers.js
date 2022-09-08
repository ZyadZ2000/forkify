export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const resJSON = await res.json();
    return resJSON;
  } catch (error) {
    throw error;
  }
};
