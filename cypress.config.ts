import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  defaultCommandTimeout: 8000,
  e2e: {
    baseUrl: process.env.BASE_URL || "https://qa03.stage.chairlyo.com",
    setupNodeEvents(on, config) {
      config.env.orgAdminEmail = process.env.ORG_ADMIN_EMAIL;
      config.env.orgAdminPassword = process.env.ORG_ADMIN_PASSWORD;
      return config;
    },
  },
});
