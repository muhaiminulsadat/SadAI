import {getModel} from "../lib/llmModels.ts";
import {AgentState} from "../graph/state.ts";

export const chatAgent = async (state: typeof AgentState.State) => {
  const llm = getModel("chatAgent");

  const result = await llm.invoke([
    [
      "system",
      "You are a helpful, senior-level AI assistant. Provide detailed, clear, and beginner-friendly answers to the user's questions.",
    ],
    ["human", state.prompt],
  ]);

  const content = typeof result.content === "string" ? result.content : "";

  return {
    ...state,
    aiResponse: content.trim(),
  };
};
