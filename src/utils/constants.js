// export const Base_URL = "http://localhost:9999/";

export const Base_URL =
  location.hostname == "localhost" ? "http://localhost:9999" : "/api";
