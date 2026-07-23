import {getModel} from "../lib/llmModels.ts";
import {AgentState} from "./state.js";

const VALID_AGENTS = new Set(["chat", "coding", "pdf", "ppt", "image", "vision", "search"]);

export const router = async (state: typeof AgentState.State) => {
  const inputAgent = state.agent?.toLowerCase()?.replace(/agent$/, "")?.trim();

  // If specific agent passed (not "auto"), route directly
  if (inputAgent && inputAgent !== "auto" && VALID_AGENTS.has(inputAgent)) {
    return {
      ...state,
      agent: inputAgent === "vision" ? "image" : inputAgent,
    };
  }

  const llm = getModel("router");

  const prompt = `
You are an advanced AI assistant that routes user queries to the correct specialized agent. Analyze the user's intent and choose the most appropriate agent.

Available Agents:
1. chat: For general conversation, questions, and discussions.
2. coding: For code generation, debugging, and programming help.
3. search: For web searches, fetching real-time information, and current events.
4. pdf: For summarizing, extracting text from, or analyzing PDF documents.
5. ppt: For creating or generating PowerPoint presentations.
6. image: For analyzing images, understanding visual content, or describing images.

INSTRUCTIONS:
- Read the user's message carefully.
- Determine which agent can best handle the request.
- Respond with ONLY the agent name (e.g., "chat", "coding", "image").
- Do NOT include any explanations, extra text, or formatting.
- If unsure, default to "chat".

User message: "${state.prompt}"

Return the name of the agent in strictly one word, no explanation, no formatting:`;

  const result = await llm.invoke(prompt);

  const content = typeof result.content === "string" ? result.content.trim().toLowerCase() : "";
  const resolvedAgent = VALID_AGENTS.has(content) ? (content === "vision" ? "image" : content) : "chat";

  return {
    ...state,
    agent: resolvedAgent,
  };
};
