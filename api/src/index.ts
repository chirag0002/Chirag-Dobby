import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from "./routes/routes";
dotenv.config()

const app = express();

const PORT = process.env.PORT || 8081

app.use(cors())

app.use(express.json());

app.use('/api/v1', router)

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})

export default app;