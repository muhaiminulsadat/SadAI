import type {Request, Response, NextFunction} from "express";

// ─── Better Auth Session Shape ────────────────────────────────────────────────
interface SessionResponse {
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    token: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

// ─── Type Augmentation ────────────────────────────────────────────────────────
// Extends Express's Request so downstream handlers get typed req.user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        image?: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

// ─── Middleware ───────────────────────────────────────────────────────────────
/**
 * Validates the incoming session by forwarding cookies to the auth service's
 * Better Auth `GET /api/auth/get-session` endpoint.
 *
 * - On success  → attaches `req.user` and calls `next()`
 * - No session  → 401 Unauthorized
 * - Service down → 503 Service Unavailable
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authServiceUrl = process.env.AUTH_SERVICE_URL;

  if (!authServiceUrl) {
    res.status(500).json({message: "Auth service URL not configured."});
    return;
  }

  try {
    const sessionRes = await fetch(`${authServiceUrl}/api/auth/get-session`, {
      method: "GET",
      headers: {
        // Forward cookies so Better Auth can resolve the session token
        ...(req.headers.cookie && {cookie: req.headers.cookie}),
        // Forward origin for Better Auth trusted-origin validation
        ...(req.headers.origin && {origin: req.headers.origin}),
      },
    });

    // Better Auth returns 200 with `null` body when there is no active session
    const body = (await sessionRes
      .json()
      .catch(() => null)) as SessionResponse | null;

    if (!body?.session || !body?.user) {
      res.status(401).json({message: "Unauthorized. Please log in."});
      return;
    }

    req.user = body.user;
    next();
  } catch (err) {
    console.error("[Gateway] Auth middleware error:", err);
    res.status(503).json({message: "Auth service unavailable."});
  }
}
