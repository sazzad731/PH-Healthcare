import express, { Request, Response } from "express"
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
const app = express();




// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());


app.use("/api/v1", IndexRoutes);



// Basic route
app.get("/", async(req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  })
});


app.use(globalErrorHandler);


export default app