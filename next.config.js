module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://admin:DHlWbzMLttsgNLOi@cluster0.9mg5a.mongodb.net/tienda-chayito?retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "b&7nvedd2A8Z-}NmQL)Q%",
    REFRESH_TOKEN_SECRET: "M7Uy^9$-fnu=k;&#f-F}rb(ztt/fUbZ",

    CLOUD_UPDATE_PRESET: "tienda",
    CLOUD_NAME: "abmontero",
    CLOUD_API: "https://api.cloudinary.com/v1_1/abmontero/image/upload",
    PAYPAL_CLIENT_ID:
      "AZF0s8Kv2rApvQNmkrHXHjvMYFCT88Y_fNaXnASVMzFDmLx81vqYvh9wpkA2IZaO7Scplt1idgb2VaNz",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
