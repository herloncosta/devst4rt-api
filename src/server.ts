import { app, prisma } from "./app.js";

const PORT = process.env.PORT || 3001

async function startServer() {
    try {
        await prisma.$connect()
        console.log("Database connected successfully!")

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
            console.log(`Health check: http://localhost:${PORT}/health`)
        })
    } catch (e) {
        console.log(`Failed to start server: Error: ${e}`)
        process.exit(1)
    }
}

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully!")
    await prisma.$disconnect()
    process.exit(1)
})

process.on("SIGINT", async () => {
    console.log("SIGINT received, shutting down gracefully!")
    await prisma.$disconnect()
    process.exit(1)
})

startServer()