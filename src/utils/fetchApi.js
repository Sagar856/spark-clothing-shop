export const fetchApi = (url, method) => {
  return fetch(url)
    .then((res) => {
      // if successful

      if (res.status == 200 || res.status == 201) {
        return res.json();
      } else {
        return {
          status: res.status,
          error: new Error("Invalid Response"),
        };
      }
    })
    .catch((err) => {
      // if error occurs
      return err;
    })
    .finally(() => {
    });
};
