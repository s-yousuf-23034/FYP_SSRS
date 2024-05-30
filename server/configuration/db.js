import pkg from "mssql/msnodesqlv8.js";
import config from "./config.js";

const { ConnectionPool } = pkg;

const connectAndQuery = async (query) => {
  try {
    let pool = await new ConnectionPool(config).connect();
    let result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};

export default connectAndQuery;
