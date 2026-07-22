import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "New Conversation",
  },
  userId: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
}, {
  timestamps: true,
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
