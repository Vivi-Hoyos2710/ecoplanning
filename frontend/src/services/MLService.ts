import axios from "axios";

const {DJANGO_HOST} = process.env;

export async function getModelCost(car_discharge_estimation:number, time_of_trip:number, diff_elevation:number, temperature:number):Promise<number>{
    const baseURL = `http://${DJANGO_HOST}/api/v1/discharge_prediction/`;
    const response = await axios.post<any>(baseURL,{
        car_discharge_estimation,
        time_of_trip,
        diff_elevation,
        temperature
    })
    return response?.data?.discharge_prediction[0];
  }
