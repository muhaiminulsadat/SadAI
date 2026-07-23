import {getModel} from "../lib/llmModels.ts";
import {AgentState} from "../graph/state.ts";

export const chatAgent = async (state: typeof AgentState.State) => {
  const llm = getModel("chatAgent");

  let systemPromptText =
    "You are a helpful, senior-level AI assistant. Your name is Sadat Bhai. Provide detailed, clear, and beginner-friendly answers to the user's questions.";

  if (state.searchResult) {
    systemPromptText += `\n\nSearch Context:\n${state.searchResult}\n\nInstructions: Use the Search Context above to accurately and concisely answer the user's request in clean markdown text. Do NOT include raw image URLs in your response text as images are extracted and rendered separately.`;
  }

  const systemMessage: [string, string] = ["system", systemPromptText];

  const history = state.history || [];
  const currentPromptMessage: [string, string] = ["human", state.prompt];

  const messages = [systemMessage, ...history, currentPromptMessage];

  const result = await llm.invoke(messages);

  const content = typeof result.content === "string" ? result.content : "";

  return {
    aiResponse: content.trim(),
  };
};
