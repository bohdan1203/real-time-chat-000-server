import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import cors from "cors";

import chatsRoutes from "./routes/chats";

const app = express();

app.use(
  cors({
    origin: "https://real-time-chat-000-client.onrender.com",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/chats", chatsRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  let errorMessage = "An unknown error occured";
  let statusCode = 500;

  // if (error instanceof Error) errorMessage = error.message;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
