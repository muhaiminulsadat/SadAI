import proxy from "express-http-proxy";

const proxyWithHeader = (serviceUrl: string) => {
  return proxy(serviceUrl, {
    proxyReqPathResolver: (req) => req.originalUrl,
    proxyReqOptDecorator: (opts, srcReq) => {
      opts.headers = {
        ...opts.headers,
        "user-id": srcReq.user?.id ?? "",
        "user-name": srcReq.user?.name ?? "",
        "user-email": srcReq.user?.email ?? "",
        "user-image": srcReq.user?.image ?? "",
        "user-email-verified": srcReq.user?.emailVerified != null ? String(srcReq.user.emailVerified) : "",
        "user-created-at": srcReq.user?.createdAt ? new Date(srcReq.user.createdAt).toISOString() : "",
        "user-updated-at": srcReq.user?.updatedAt ? new Date(srcReq.user.updatedAt).toISOString() : "",
      };
      return opts;
    },
  });
};

export default proxyWithHeader;
