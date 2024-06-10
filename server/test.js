
import { getEmbedToken } from "./getEmbedToken.js"; // Adjust the path as needed
import { getAccessToken } from "./getAccessToken.js";

async function run() {
  try {
    const accessToken = await getAccessToken();
    console.log("Embed Token:", accessToken);
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
