import axios from "axios";
import { baseUrl } from "../core/constants";
import type { Dev } from "../core/interfaces";

const urlBase = baseUrl + '/devs';

export async function getDevs(terms?: string) {
  try {
    const response = await axios.get<Dev[]>(urlBase, {
      params: terms ? { terms } : {},
    });

    return response.data;
  } catch (error: any) {
    console.error("API error:", error.response?.data);
    throw error;
  }
}

export async function getDev(id: string) {
  try {
    const response = await axios.get<Dev>(`${urlBase}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("API error:", error.response?.data);
    throw error;
  }
}

export async function saveDev(dev: Dev) {
    console.log("Dev a adicionar", dev);
  try {
    const response = await axios.post<Dev>(urlBase, dev, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("API error:", error.response?.data);
    throw error;
  }
}