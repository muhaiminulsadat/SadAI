import {StateGraph, START} from "@langchain/langgraph";
import {AgentState} from "./state.js";
import {pptAgent as ppt} from "../agents/ppt.agent.ts";
import {chatAgent as chat} from "../agents/chat.agent.ts";
import {router} from "./router.ts";
import {codingAgent as coding} from "../agents/coding.agent.ts";
import {searchAgent as search} from "../agents/search.agent.ts";
import {pdfAgent as pdf} from "../agents/pdf.agent.ts";
import {visionAgent as image} from "../agents/vision.agent.ts";

const workflow = new StateGraph(AgentState)
  .addNode("router", router)
  .addNode("chat", chat)
  .addNode("coding", coding)
  .addNode("search", search)
  .addNode("pdf", pdf)
  .addNode("ppt", ppt)
  .addNode("image", image)

  .addEdge(START, "router")
  .addConditionalEdges(
    "router",
    (state: typeof AgentState.State) => {
      switch (state.agent) {
        case "chat":
          return "chat";
        case "coding":
          return "coding";
        case "search":
          return "search";
        case "pdf":
          return "pdf";
        case "ppt":
          return "ppt";
        case "image":
        case "vision":
          return "image";

        default:
          return "chat";
      }
    },
    {
      chat: "chat",
      coding: "coding",
      search: "search",
      pdf: "pdf",
      ppt: "ppt",
      image: "image",
    },
  )
  .addEdge("search", "chat")
  .addEdge("chat", "__end__")
  .addEdge("coding", "__end__")
  .addEdge("pdf", "__end__")
  .addEdge("ppt", "__end__")
  .addEdge("image", "__end__");

export const graph = workflow.compile();
