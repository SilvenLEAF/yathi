import config from 'config';
import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";

const database: { host: string, name: string, user: string, password: string } = config.get('database');
const sequelize = new Sequelize(
  database.name, database.user, database.password,
  {
    host: database.host,
    dialect: 'postgres',
  }
);

const xdbmodels = initModels(sequelize);
const XDbHelpers = {
  getDbModels: () => xdbmodels,
  getSequelize: () => sequelize,
}

export default XDbHelpers;