// import { getAccessToken } from "./getAccessToken.js";
// import { getEmbedToken } from "./getEmbedToken.js";

// async function run() {
//   try {
//     const x = await getEmbedToken();
//     console.log("embed Token:", x);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// run();

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
