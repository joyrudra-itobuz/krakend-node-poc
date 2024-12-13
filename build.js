import fs from "node:fs/promises";
import config from "./config.js";

const path = `${process.cwd()}/${
  Number(config.DEV_MODE) ? "krakendDev" : "krakend"
}`;

console.log(path);

const endpoints = ["server-4000.json", "server-4040.json", "server-4080.json"];

const defaultConfigurations = {
  version: 3,
  name: "KrakenD API Gateway",
  port: 8080,
  cache_ttl: "3600s",
  endpoints: [],
};

async function appendKrakend() {
  try {
    const endpointsJSON = await Promise.all(
      endpoints.map(async (endpoint) => {
        const data = await fs.readFile(`${path}/${endpoint}`, "utf-8");
        return JSON.parse(data);
      })
    );

    for (const endpoint of endpointsJSON) {
      defaultConfigurations.endpoints = [
        ...defaultConfigurations.endpoints,
        ...endpoint,
      ];
    }

    await fs.writeFile(
      `${path}/krakend.json`,
      JSON.stringify(defaultConfigurations, null, 2)
    );

    console.log("Krakend file created successfully");
  } catch (error) {
    console.log(error);
  }
}

appendKrakend().catch(console.error);
