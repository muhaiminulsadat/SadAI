import {Annotation} from "@langchain/langgraph";

// Creating a custom state
export const AgentState = Annotation.Root({
  prompt: Annotation<string>(),
  aiResponse: Annotation<string>(),
  agent: Annotation<string>(),
  conversationId: Annotation<string>(),
  history: Annotation<Array<[string, string]>>(),
  searchResult: Annotation<string>(),
  images: Annotation<string[]>(),
});

