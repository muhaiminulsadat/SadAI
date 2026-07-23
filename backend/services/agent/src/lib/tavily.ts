import {TavilySearch} from "@langchain/tavily";

export const tavilySearchTool = new TavilySearch({
  maxResults: 5,
  includeImages: true,
  tavilyApiKey: process.env.TAVILY_API_KEY,
});
