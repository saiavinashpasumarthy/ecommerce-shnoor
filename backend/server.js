import { loadEnvFile } from "node:process";

loadEnvFile();

const { default: app } =
  await import("./app.js");

const { default: connectDB } =
  await import("./config/db.js");

const PORT =
  process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});