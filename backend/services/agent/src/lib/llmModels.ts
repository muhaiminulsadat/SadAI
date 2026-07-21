import {ChatGroq} from "@langchain/groq";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";

export const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  // other params...
});

export const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  maxRetries: 2,
  // other params...
});

export const getModel =  (agentType: string) => {
  switch (agentType) {
    case "chatAgent":
      return groq;

    case "searchAgent":
      return groq;

    case "codingAgent":
      return gemini;

    case "pptAgent":
      return gemini;

    default:
      return groq;
  }
};
