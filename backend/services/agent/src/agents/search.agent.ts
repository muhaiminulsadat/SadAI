import {tavilySearchTool} from "../lib/tavily.ts";
import {AgentState} from "../graph/state.ts";

export const searchAgent = async (state: typeof AgentState.State) => {
  try {
    const rawResult = await tavilySearchTool.invoke({query: state.prompt});

    let parsedResult: any = rawResult;
    if (typeof rawResult === "string") {
      try {
        parsedResult = JSON.parse(rawResult);
      } catch {
        parsedResult = {results: [], images: []};
      }
    }

    let searchResultText = "";
    let images: string[] = [];

    if (Array.isArray(parsedResult)) {
      searchResultText = parsedResult
        .map(
          (r: any) =>
            `Title: ${r.title || ""}\nSnippet: ${
              r.content || r.snippet || ""
            }\nURL: ${r.url || ""}`,
        )
        .join("\n\n");
    } else if (typeof parsedResult === "object" && parsedResult !== null) {
      if (Array.isArray(parsedResult.results)) {
        searchResultText = parsedResult.results
          .map(
            (r: any) =>
              `Title: ${r.title || ""}\nSnippet: ${
                r.content || r.snippet || ""
              }\nURL: ${r.url || ""}`,
          )
          .join("\n\n");
      } else if (typeof parsedResult.output === "string") {
        searchResultText = parsedResult.output;
      }

      if (Array.isArray(parsedResult.images)) {
        images = parsedResult.images
          .map((img: any) => (typeof img === "string" ? img : img.url || ""))
          .filter(Boolean);
      }
    } else {
      searchResultText = String(rawResult || "");
    }

    return {
      searchResult: searchResultText,
      images,
    };
  } catch (error) {
    console.error("[SearchAgent] Tavily search error:", error);
    return {
      searchResult: "Unable to retrieve search results at this time.",
      images: [],
    };
  }
};
