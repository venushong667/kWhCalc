import axios from "axios";

export const DATAAPIV1 = (baseURL = "http://localhost:5500/api/") => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "App-Type": "dashboard"
    }
  });

  const getData = () => api.get(`/data`);

  const addData = (watt, time) =>
    api.post(`/login`, {
      watt: watt,
      time: time
    });

  const CalcKWH = values => {
    return api.post("/kwh", {
      time1: values.time1,
      time2: values.time2
    });
  };

  return { getData, addData, CalcKWH };
};
