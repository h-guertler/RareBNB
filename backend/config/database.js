const config = require("./index");

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'postgres://app_academy_projects_sr0b_user:8S8vpnKIHPxw7xYXRx9uPPDdpevTMnAd@dpg-ck53099voi7s73e67b60-a.ohio-postgres.render.com/app_academy_projects_sr0b',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};
