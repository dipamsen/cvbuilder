import { CVData, defaultData } from "../models/template";

export function loadSavedData(): CVData {
  const savedData = localStorage.getItem("cv-data");
  if (savedData) {
    try {
      return JSON.parse(savedData) as CVData;
    } catch (error) {
      console.error("Error parsing saved data:", error);
    }
  }
  return defaultData;
}

export function saveData(data: CVData) {
  localStorage.setItem("cv-data", JSON.stringify(data));
}
