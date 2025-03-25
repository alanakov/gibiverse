import { Sequelize } from "sequelize";

const sequelize = new Sequelize("gibiverse", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
