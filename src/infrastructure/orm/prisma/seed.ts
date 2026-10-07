// src/seed.ts
import { SeedModule } from "@infrastructure/orm/prisma/seed.module"
import { SeedService } from "@infrastructure/orm/prisma/seed.service"
import { NestFactory } from "@nestjs/core"

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule)

  const seedService = app.get(SeedService)

  try {
    await seedService.run()
  } catch (error) {
    console.error("An error occurred while seeding:", error)
    process.exit(1)
  } finally {
    await app.close()
    process.exit(0)
  }
}

bootstrap()
