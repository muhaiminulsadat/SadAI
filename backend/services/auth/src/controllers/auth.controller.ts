import {Request, Response} from "express";
import {auth} from "../config/auth.ts";

const forwardBetterAuthResponse = async (
  betterAuthResponse: globalThis.Response,
  res: Response,
  successMessage: string = "Operation successful",
): Promise<Response> => {
  const setCookies = betterAuthResponse.headers.getSetCookie();
  if (setCookies && setCookies.length > 0) {
    res.setHeader("set-cookie", setCookies);
  }

  const contentType = betterAuthResponse.headers.get("content-type");

  let rawData: any = null;
  const text = await betterAuthResponse.text();
  if (text) {
    if (contentType?.includes("application/json")) {
      try {
        rawData = JSON.parse(text);
      } catch {
        rawData = text;
      }
    } else {
      rawData = text;
    }
  }

  const success = betterAuthResponse.ok;

  if (success) {
    return res.status(betterAuthResponse.status).json({
      success: true,
      message: successMessage,
      data: rawData,
    });
  } else {
    let errorMessage = "Operation failed";
    if (rawData) {
      if (typeof rawData === "object") {
        errorMessage = rawData.message || rawData.error || errorMessage;
      } else {
        errorMessage = String(rawData);
      }
    }
    return res.status(betterAuthResponse.status).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const {email, password, name} = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email, password, name",
        data: null,
      });
    }

    const response = await auth.api.signUpEmail({
      body: {email, password, name},
      asResponse: true,
      headers: req.headers as any,
    });

    return forwardBetterAuthResponse(response, res, "Registration successful");
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email, password",
        data: null,
      });
    }

    const response = await auth.api.signInEmail({
      body: {email, password},
      asResponse: true,
      headers: req.headers as any,
    });

    return forwardBetterAuthResponse(response, res, "Login successful");
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

export const logout = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await auth.api.signOut({
      asResponse: true,
      headers: req.headers as any,
    });

    return forwardBetterAuthResponse(response, res, "Logout successful");
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};
