import { IUrl } from "../interfaces/IUrl";
import { Schema, Document, model } from "mongoose";

const urlScheme = new Schema(
  {
    urlCode: {
      type: String,
      required: true,
      index: true,
    },

    longUrl: {
      type: String,
      required: true,
      index: true,
    },

    date: {
      type: String,
      default: Date.now(),
      index: true,
    },
  },
  { timestamps: false }
);

export default model<IUrl & Document>("url", urlScheme);
