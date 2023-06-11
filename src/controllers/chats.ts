import { RequestHandler } from "express";
import createHttpError from "http-errors";

import Message from "../models/Message";

export const getMessages: RequestHandler = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
