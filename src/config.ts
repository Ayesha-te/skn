export const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? "http://localhost:8000" 
  : "https://sleepy-carrie-ayesha25-2b164d3d.koyeb.app";

export const API_BASE_URL = `${BASE_URL}/api`;
