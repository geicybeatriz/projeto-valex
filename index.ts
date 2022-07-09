import express, { json } from "express";
import cors from "cors";
import "./src/config/setup.js";
import chalk from "chalk";
import router from "./src/routers/router.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => 
    console.log(chalk.bold.green(`Server is up and running on port ${port}`))
);