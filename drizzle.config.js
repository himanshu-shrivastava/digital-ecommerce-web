import { defineConfig } from 'drizzle-kit'
import { loadEnvConfig } from '@next/env'

// To make ENV variable accessible
const projectDir = process.cwd()
loadEnvConfig(projectDir)

export default defineConfig({
    schema: './configs/schema.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.SERVER_DATABASE_URL,
    },
})