require("dotenv").config();
require("module-alias/register");
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;
const express = require("express");
const { sequelize } = require("./models");
const usersRoutes = require("./routes/users");
const cookieParser = require("cookie-parser");
const customersRoutes = require("@routes/customers");

const appointmentsRoutes = require("./routes/appointments");
const templatesRoutes = require("./routes/templates");
const templateVariablesRoutes = require("./routes/templateVariables");
const templateVersionsRoutes = require("./routes/templateVersions");
const variablesRoutes = require("./routes/variables");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "FieldRequiredError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "AlreadyTakenError") {
    return res.status(409).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: err.message });
  }

  res.status(500).json({ message: err.message || "Internal Server Error" });
};

app.get("/", (req, res) => res.json({ status: "API is running on /api" }));
app.use("/api/users", usersRoutes);
app.use("/api", appointmentsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/templates", templatesRoutes);
app.use("/api", templateVariablesRoutes);
app.use("/api", templateVersionsRoutes);
app.use("/api", variablesRoutes);
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
