import express from "express";
import bodyParser from "body-parser";
import contactRoutes from "./routes/contactRoutes";
import { connect } from "./database/connect";

const app = express();
const port = 3000;

app.use(bodyParser.json());

(async () => {
    try {
        await connect();
        app.use(contactRoutes);
        app.listen(port, () => {
            console.log(`Fluxkart.com is live @ http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Connection failed', error);
    }
})();