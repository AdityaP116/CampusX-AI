import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CampusX API Documentation",
      version: "1.0.0",
      description:
        "Verified student-only marketplace API documentation supporting Buy, Sell, Rent, Exchange operations.",
    },
    servers: [
      {
        url: "/api/v1",
        description: "Current Server",
      },
    ],
  },
  apis:
    process.env.NODE_ENV === "production"
      ? ["./dist/routes/*.js", "./dist/controllers/*.js"]
      : ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
