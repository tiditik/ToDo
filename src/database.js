import { SQL } from "bun";

const db = new SQL({
  url: Bun.env.POSTGRESURL,
  onconnect: (client) => {
    console.log("Connected to database");
  },
  onclose: (client) => {
    console.log("Connection closed");
  },
});
