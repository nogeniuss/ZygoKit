# 🔥 ZygoKit

> **A modern CLI tool for architecture configuration and basic project scaffolding**

ZygoKit is a developer toolkit that lets you choose your stack and handles the execution. Stop repeating basic configurations at the start of every project—let ZygoKit handle dependencies, Docker setup, architecture patterns, and more.

---

## ✨ Features

- 🎯 **Multi-language support**: JavaScript, TypeScript, and Python (with more coming)
- 🏗️ **Architecture templates**: Feature-based, Clean Architecture, DDD, Hexagonal, and more
- 🐳 **Docker-first approach**: Everything runs in containers—no pollution of your local environment
- ⚡ **Framework agnostic**: Support for Express, NestJS, FastAPI, Django, Next.js, React, Vue, and 30+ frameworks
- 📦 **Monorepo ready**: Built-in support for Turborepo and workspace architectures
- 🔧 **Feature configuration**: Auth, databases, styling, testing, linting—all configurable
- 🎨 **Smart defaults**: Sensible configurations out of the box, customizable when needed

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 20.x
- **Docker** (required for project generation)

### Installation

```bash
# Clone the repository
git clone https://github.com/NoGeniuss/zygokit.git
cd zygokit

# Install dependencies
npm install

# Run the CLI
zygokit
```

---

## 📖 Usage

### Interactive Mode

Simply run the CLI and follow the prompts:

```bash
zygokit
```

You'll be guided through:

1. **Language selection** (js, ts, py)
2. **Project name**
3. **Domain** (backend, frontend, fullstack, mobile, desktop)
4. **Architecture** (Feature-based, Clean Architecture, DDD, etc.)
5. **Framework** (Next.js, FastAPI, NestJS, React, etc.)
6. **Optional features** (auth, database, styling, testing, Docker)

### Example Flow

```
📦 Linguagens disponíveis:
   1. JS (.js, .mjs, .cjs)
   2. TS (.ts, .tsx, .mts, .cts)
   3. PY (.py)

Digite o número da linguagem: 2
✓ Selecionado: TS

📝 Nome do projeto: my-awesome-app

🎯 Tipos de projeto disponíveis:
   1. Backend
   2. Frontend
   3. Fullstack
   4. Mobile
   5. Desktop

Digite o número do tipo de projeto: 3
✓ Selecionado: fullstack

🏗️ Arquiteturas disponíveis para fullstack:
   1. Monolithic Unified
   2. Monorepo
   3. Polyrepo (Multi-repo)
   ...

⚙️ Frameworks disponíveis (ts):
   1. Next.js
   2. Remix
   3. SvelteKit
   ...
```

---

## 🏗️ Architecture Patterns

ZygoKit supports multiple architecture patterns for different domains:

### Backend
- Feature-based (modular)
- Layer-based (MVC/traditional)
- Clean Architecture
- Hexagonal Architecture (Ports & Adapters)
- Domain-Driven Design (DDD)
- CQRS
- Event-Driven Architecture
- Microservices

### Frontend
- Feature-based (Feature-Sliced Design)
- Atomic Design
- Layer-based (traditional)
- Component-Driven Development
- Micro-frontends

### Fullstack
- Monolithic Unified
- Monorepo
- Polyrepo (Multi-repo)
- Micro-frontends + Microservices
- BFF (Backend for Frontend)

---

## 🛠️ Supported Technologies

### Languages
- **JavaScript** (Node.js, Bun, Deno)
- **TypeScript** (Node.js, Bun, Deno)
- **Python** (3.10+)

### Backend Frameworks
**JavaScript/TypeScript:**
- Express.js, Fastify, NestJS, Koa, Hono, AdonisJS, tRPC

**Python:**
- FastAPI, Django, Flask, Starlette, Sanic, Quart

### Frontend Frameworks
- React, Vue.js, Angular, Svelte, Solid.js, Preact, Alpine.js, Lit

### Fullstack Frameworks
- Next.js, Nuxt, SvelteKit, Remix, Astro, Qwik, SolidStart, Analog

### Databases
**SQL:** PostgreSQL, MySQL, MariaDB, SQLite, CockroachDB  
**NoSQL:** MongoDB, Redis, Cassandra, DynamoDB

### ORMs
**JS/TS:** Prisma, TypeORM, Drizzle, MikroORM, Sequelize  
**Python:** SQLAlchemy, Django ORM, Tortoise ORM, Peewee

### Testing
**JS/TS:** Jest, Vitest, Playwright, Cypress  
**Python:** pytest, unittest, Playwright

### Quality Tools
**Linting:** ESLint, Biome, Pylint, Flake8, Ruff  
**Formatting:** Prettier, Biome, Black, autopep8

---

## 📦 Generated Project Structure

### Feature-based Backend (TypeScript)
```
my-app/
├── src/
│   ├── users/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.model.ts
│   │   └── user.routes.ts
│   ├── auth/
│   └── products/
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── package.json
```

### Monorepo Fullstack (TypeScript)
```
my-app/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── ui/           # Shared components
│   ├── types/        # Shared types
│   └── utils/        # Shared utilities
├── turbo.json
├── docker-compose.yml
└── package.json
```

### Clean Architecture Backend (Python)
```
my-app/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   └── use_cases/
│   ├── infrastructure/
│   │   ├── repositories/
│   │   └── database/
│   └── interfaces/
│       └── api/
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
└── .env.example
```

---

## 🐳 Docker Integration

All projects are generated with Docker support. The generated `docker-compose.yml` includes:

- Application container
- Database containers (if configured)
- Volume management
- Environment variables
- Development-ready setup

Example:
```bash
cd my-awesome-app
docker-compose up
```

---

## 🗺️ Roadmap

### Current Status
- ✅ JavaScript/TypeScript/Python support
- ✅ 30+ frameworks supported
- ✅ Multiple architecture patterns
- ✅ Docker-first approach
- ✅ Database integration
- ✅ Testing and quality tools setup

### Coming Soon
- 🔲 **CLI as Docker container/image** - Run ZygoKit without Node.js
- 🔲 **More languages**: Go, Rust, Java, C#, PHP
- 🔲 **Cross-platform binary** - Native executables for Windows/Mac/Linux
- 🔲 **Template marketplace** - Community-contributed project templates
- 🔲 **CI/CD integration** - GitHub Actions, GitLab CI templates
- 🔲 **Cloud deployment** - One-command deploy to AWS, GCP, Azure, Vercel
- 🔲 **GUI mode** - Web interface for visual project configuration
- 🔲 **Project migration** - Convert existing projects to different architectures

---

## 🤝 Contributing

Contributions are welcome! This is an open-source project under active development.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution

- Adding new framework support
- Creating architecture templates
- Improving documentation
- Bug fixes and optimizations
- Testing on different platforms

---

## 🐛 Known Issues

- Currently requires Node.js 20+ (will be containerized in future releases)
- Docker must be installed and running
- Some frameworks may require additional manual configuration
- Windows support is experimental (fully supported once containerized)

---

## 📝 License

This project is publicly available on GitHub. License to be determined.

---

## 👤 Author

**Marllon Antonio Hetzler**  
GitHub: [@NoGeniuss](https://github.com/NoGeniuss)

---

## 💡 Inspiration

Born from the frustration of repeating the same basic configurations at the start of every project—installing dependencies, setting up Docker, configuring linters, choosing architecture patterns. ZygoKit automates the boring stuff so you can focus on building.

---

## 📚 Documentation

### Project Structure
```
zygokit/
├── bin/
│   └── forge.js              # CLI entry point
├── src/
│   ├── core/
│   │   ├── prompt.js         # Interactive prompts
│   │   ├── resolver.js       # Config validation
│   │   ├── planner.js        # Project planning
│   │   └── generator.js      # File generation
│   ├── stacks/
│   │   └── index.js          # Stack definitions
│   ├── templates/
│   └── utils/
│       └── exec.js           # Command execution
└── package.json
```

### Adding a New Framework

1. Update `src/stacks/index.js`:
```javascript
frameworks: {
  typescript: [
    "Next.js",
    "YourNewFramework"  // Add here
  ]
}
```

2. Update `src/core/planner.js`:
```javascript
case "YourNewFramework":
  command = `npx create-your-framework ${target}`;
  break;
```

3. Test the generation:
```bash
zygokit
```

---

## ❓ FAQ

**Q: Do I need to install frameworks globally?**  
A: No! Everything runs in Docker containers. Your local machine stays clean.

**Q: Can I use this in production?**  
A: The generated projects are production-ready, but ZygoKit itself is in active development. Review generated code before deploying.

**Q: How do I add my own templates?**  
A: Currently, you need to modify the source code. A template marketplace is planned for future releases.

**Q: What if my framework isn't supported?**  
A: Open an issue or submit a PR! We're actively adding more frameworks.

**Q: Can I generate projects without Docker?**  
A: Currently, Docker is required. A non-Docker mode may be added in the future based on community feedback.

---

## 🙏 Acknowledgments

- Inspired by tools like create-react-app, vue-cli, and @nestjs/cli
- Built with [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) for interactive prompts
- Architecture patterns influenced by clean code principles and industry best practices

---

## 📊 Statistics

- **30+ frameworks** supported
- **3 languages** (JS/TS/Python)
- **8+ architecture patterns**
- **50+ configuration options**

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by developers, for developers

[Report Bug](https://github.com/NoGeniuss/zygokit/issues) · [Request Feature](https://github.com/NoGeniuss/zygokit/issues)

</div>
