import {getModel} from "../lib/llmModels.ts";
import {AgentState} from "./state.js";

export const router = async (state: typeof AgentState.State) => {
  const llm = getModel("router");

  const prompt = `
You are an advanced AI assistant that routes user queries to the correct specialized agent. Analyze the user's intent and choose the most appropriate agent.

Available Agents:
1. chatAgent: For general conversation, questions, and discussions.
2. codingAgent: For code generation, debugging, and programming help.
3. searchAgent: For web searches, fetching real-time information, and current events.
4. pdfAgent: For summarizing, extracting text from, or analyzing PDF documents.
5. pptAgent: For creating or generating PowerPoint presentations.
6. visionAgent: For analyzing images, understanding visual content, or describing images.

INSTRUCTIONS:
- Read the user's message carefully.
- Determine which agent can best handle the request.
- Respond with ONLY the agent name (e.g., "chatAgent", "codingAgent").
- Do NOT include any explanations, extra text, or formatting.
- If unsure, default to "chatAgent".

User message: "${state.prompt}"

Return the name of the agent in strictly one word, no explanation, no formatting:`;

  const result = await llm.invoke(prompt);

  const content = typeof result.content === "string" ? result.content : "";

  return {
    ...state,
    agent: content.trim()
  };
};
