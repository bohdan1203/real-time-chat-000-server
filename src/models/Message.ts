import { InferSchemaType, Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type Message = InferSchemaType<typeof messageSchema>;

export default model<Message>("Message", messageSchema);
