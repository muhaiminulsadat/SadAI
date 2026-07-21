import {StateGraph, START} from "@langchain/langgraph";
import {AgentState} from "./state.js";
import {pptAgent} from "../agents/ppt.agent.ts";
import {chatAgent} from "../agents/chat.agent.ts";
import {router} from "./router.ts";
import {codingAgent} from "../agents/coding.agent.ts";
import {searchAgent} from "../agents/search.agent.ts";
import {pdfAgent} from "../agents/pdf.agent.ts";
import {visionAgent} from "../agents/vision.agent.ts";

const workflow = new StateGraph(AgentState)
  .addNode("router", router)
  .addNode("chatAgent", chatAgent)
  .addNode("codingAgent", codingAgent)
  .addNode("searchAgent", searchAgent)
  .addNode("pdfAgent", pdfAgent)
  .addNode("pptAgent", pptAgent)
  .addNode("visionAgent", visionAgent)

  .addEdge(START, "router")
  .addConditionalEdges(
    "router",
    (state: typeof AgentState.State) => {
      switch (state.agent) {
        case "chatAgent":
          return "chatAgent";
        case "codingAgent":
          return "codingAgent";
        case "searchAgent":
          return "searchAgent";
        case "pdfAgent":
          return "pdfAgent";
        case "pptAgent":
          return "pptAgent";
        case "visionAgent":
          return "visionAgent";

        default:
          return "chatAgent";
      }
    },
    {
      chatAgent: "chatAgent",
      codingAgent: "codingAgent",
      searchAgent: "searchAgent",
      pdfAgent: "pdfAgent",
      pptAgent: "pptAgent",
      visionAgent: "visionAgent",
    },
  )
  .addEdge("searchAgent", "chatAgent")
  .addEdge("chatAgent", "__end__")
  .addEdge("codingAgent", "__end__")
  .addEdge("pdfAgent", "__end__")
  .addEdge("pptAgent", "__end__")
  .addEdge("visionAgent", "__end__");

export const graph = workflow.compile();
