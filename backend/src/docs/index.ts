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
        url: "http://localhost:5000/api/v1",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
