import config from 'config';
import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";

const database: { connectionString: string, host: string, port: number, name: string, user: string, password: string } = config.get('database');
console.log("@database", database);
const sequelize = new Sequelize(
  database.connectionString,
  {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  }
);

// Authenticate and log connection status
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

const xdbmodels = initModels(sequelize);
const XDbHelpers = {
  getDbModels: () => xdbmodels,
  getSequelize: () => sequelize,
}

export default XDbHelpers;