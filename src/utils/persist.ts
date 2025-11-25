import { CVData, CVSettings, defaultData, defaultSettings } from "../models/template";

type SavedData = {
  "cv-data": CVData;
  "cv-settings": CVSettings;
}

const FALLBACKS: SavedData = {
  "cv-data": defaultData,
  "cv-settings": defaultSettings,
};

export function loadSavedData<T extends keyof SavedData>(key: T): SavedData[T] {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    try {
      return JSON.parse(savedData) as SavedData[T];
    } catch (error) {
      console.error("Error parsing saved data:", error);
    }
  }
  // Return default value if not found
  return FALLBACKS[key];
}

export function saveData(data: CVData) {
  localStorage.setItem("cv-data", JSON.stringify(data));
}
