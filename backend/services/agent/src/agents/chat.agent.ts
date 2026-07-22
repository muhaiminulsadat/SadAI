import {getModel} from "../lib/llmModels.ts";
import {AgentState} from "../graph/state.ts";

export const chatAgent = async (state: typeof AgentState.State) => {
  const llm = getModel("chatAgent");

  const systemMessage: [string, string] = [
    "system",
    "You are a helpful, senior-level AI assistant. Your name is Sadat Bhai. Provide detailed, clear, and beginner-friendly answers to the user's questions.",
  ];

  const history = state.history || [];
  const currentPromptMessage: [string, string] = ["human", state.prompt];

  const messages = [systemMessage, ...history, currentPromptMessage];

  const result = await llm.invoke(messages);

  const content = typeof result.content === "string" ? result.content : "";

  return {
    ...state,
    aiResponse: content.trim(),
  };
};
