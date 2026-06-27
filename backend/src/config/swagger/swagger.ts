import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Skoelx Licensing API",
      version: "1.0.0",
      description:
        "Enterprise Centralized Licensing Platform API",
    },

    servers: [
      {
        url: "http://localhost:4001/api/v1",
        description: "Development",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
  "./src/docs/**/*.ts",
],
};

export default swaggerJsdoc(options);