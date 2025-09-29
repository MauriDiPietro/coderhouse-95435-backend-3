export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Productos",
      version: "1.0.0",
      description: "API para la gestión de productos",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Servidor de desarrollo",
      },
      {
        url: "https://api.miproyecto.com",
        description: "Servidor de producción",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
