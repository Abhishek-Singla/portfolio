const config = {
  async redirects() {
    return [
      // The payment rails comparison now lives in the Learn hub.
      { source: "/rails", destination: "/learn/payment-rails", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/sqljs/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default config;
