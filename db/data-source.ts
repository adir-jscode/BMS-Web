import { DataSource, DataSourceOptions } from "typeorm";
export const dataSourceOptions: DataSourceOptions = {
type: "postgres",
host: "localhost",
port: 5432,
username: "postgres",
password: "admin",
database: "BMS-ERP",
entities: ["dist/**/*.entity.js"], //1
synchronize: false, // 2
migrations: ["dist/db/migrations/*.js"], // 3
};
const dataSource = new DataSource(dataSourceOptions); //4
export default dataSource;