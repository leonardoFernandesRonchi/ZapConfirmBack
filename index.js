require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3001;
const express = require("express");
const { sequelize } = require("./models");
// const usersRoutes = require("./routes/users");

const app = express();
app.use(express.json());

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Conexão estabelecida com ${env}`);
  } catch (error) {
    console.error("Erro:", error);
  }
})();

app.get("/", (req, res) => res.json({ status: "API is running on /api" }));
// app.use("/api/users", usersRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
