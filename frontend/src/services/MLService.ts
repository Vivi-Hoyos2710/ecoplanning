import axios from "axios";

export async function getModelCost(car_discharge_estimation:number, time_of_trip:number, diff_elevation:number, temperature:number):Promise<number>{
    const baseURL = 'http://127.0.0.1:8000/api/v1/discharge_prediction/';
    const response = await axios.post<any>(baseURL,{
        car_discharge_estimation,
        time_of_trip,
        diff_elevation,
        temperature
    })
    return response?.data?.discharge_prediction[0];
  }
