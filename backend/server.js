import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// apply arcjet  rate limits to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
      res.status(429).json({
        success: false,
        message: "Too Many Requests",
      })
      } else if (decision.reason.isBot()) {
        res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    } 
    if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
      res.status(403).json({
        success: false,
        message: "Spoofed or Bot Detected",
      });
    }
    next(); 
  } catch (error) {
    console.error("Arcjet rate limit error", error);
    next(error)
  }
 
})

app.use("/api/products/", productRoutes);

async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        `;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
}
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
