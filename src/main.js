import dotenv from 'dotenv'
import { bootstrap } from "./app.controller.js";


dotenv.config({ path: './config/.env' })

bootstrap()
