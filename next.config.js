/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "cdn.shopify.com"],
  },
  env: {
    customKey: "my-value",
    stripeKey:
      "pk_test_51IdilRJ7h2a8qeYvQB36QJaXYeGKPAyqHsTvqlzcKx5uR26Sw76cFqwZD8gsVbPN1kIfQPOgP1hpQKldytpCpcDU0077auCMKl",
    firebaseApiKey: "AIzaSyD8v5LvrT5Wi1B3YSS8MJnlvttIQOnsri8",
    firebaseAuthDomain: "ecommerce-ae8e8.firebaseapp.com",
    firebaseProjectId: "ecommerce-ae8e8",
    firebaseStorageBucket: "mc-events-b2f80.appspot.com",
    firebaseMessagingSenderId: "834124421298",
    firebaseAppId: "1:834124421298:web:72dad6d9250f2f375791ab",
    apiUrl: "http://localhost:8001/api",
    // apiUrl: "https://stark-falls-64890.herokuapp.com/api",
    firebaseRegisterRedirectUrl: "http://localhost:3000/register-complete",
    firebaseForgotPasswordRedirect: "http://localhost:3000/login",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
