import fs from "fs-extra";
import path from "path";
import { exec } from "../utils/exec.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateProject(plan, projectName, config) {
  const root = path.resolve(process.cwd(), projectName);
  
  console.log(`\n🚀 Iniciando geração do projeto: ${projectName}`);
  console.log(`📁 Diretório: ${root}\n`);

  await fs.ensureDir(root);

  // ============ Executar cada step do plano ============
  for (const step of plan) {
    
    // ============ Criar diretórios ============
    if (step.type === "directory") {
      const dirPath = path.join(root, step.target);
      console.log(`📂 Criando diretório: ${step.target}`);
      await fs.ensureDir(dirPath);
    }

    // ============ Criar arquivos ============
    if (step.type === "file") {
      const filePath = path.join(root, step.target);
      const fileDir = path.dirname(filePath);
      
      console.log(`📄 Criando arquivo: ${step.target}`);
      await fs.ensureDir(fileDir);
      await fs.writeFile(filePath, step.content, "utf-8");
    }

    // ============ Executar comandos Docker ============
    if (step.type === "docker") {
      const targetPath = path.join(root, step.target);
      await fs.ensureDir(targetPath);

      console.log(`🐳 Executando via Docker: ${step.command}`);
      console.log(`   Image: ${step.image}`);
      console.log(`   Target: ${step.target}\n`);

      // Construir comando docker run
      const dockerCommand = [
        "docker run",
        "--rm",
        "-v", `"${targetPath}:${step.workdir || '/app'}"`,
        "-w", step.workdir || "/app",
        step.image,
        "sh", "-c",
        `"${step.command}"`
      ].join(" ");

      try {
        await exec(dockerCommand, root);
        console.log(`✅ Comando executado com sucesso\n`);
      } catch (error) {
        console.error(`❌ Erro ao executar Docker: ${error.message}`);
        console.error(`   Comando: ${dockerCommand}\n`);
        throw error;
      }
    }

    // ============ Executar comandos normais ============
    if (step.type === "exec") {
      const cwd = path.join(root, step.target || ".");
      await fs.ensureDir(cwd);

      console.log(`⚙️  Executando: ${step.command}`);
      try {
        await exec(step.command, cwd);
        console.log(`✅ Comando executado\n`);
      } catch (error) {
        console.error(`❌ Erro: ${error.message}\n`);
        throw error;
      }
    }
  }

  // ============ Aplicar template de arquitetura ============
  await applyArchitectureTemplate(root, config);

  // ============ Aplicar configurações de features ============
  await applyFeatureConfigurations(root, config);

  // ============ Criar .gitignore ============
  await createGitignore(root, config);

  // ============ Criar arquivo de environment ============
  await createEnvFile(root, config);

  // ============ Finalização ============
  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ Projeto "${projectName}" gerado com sucesso!`);
  console.log(`${"=".repeat(60)}\n`);
  
  console.log(`📋 Próximos passos:\n`);
  console.log(`   cd ${projectName}`);
  
  if (config.features?.containerization === "docker") {
    console.log(`   docker-compose up`);
  } else {
    if (config.language === "py") {
      console.log(`   python -m venv venv`);
      console.log(`   source venv/bin/activate  # ou .\\venv\\Scripts\\activate no Windows`);
      console.log(`   pip install -r requirements.txt`);
      console.log(`   python main.py`);
    } else {
      console.log(`   npm install`);
      console.log(`   npm run dev`);
    }
  }
  console.log();
}

// ============ Aplicar template de arquitetura ============
async function applyArchitectureTemplate(root, config) {
  console.log(`\n🏗️  Aplicando arquitetura: ${config.architecture}\n`);

  const isMonorepo = config.architecture && config.architecture.toLowerCase().includes("monorepo");
  const baseDir = isMonorepo ? path.join(root, "apps") : root;

  // Determinar o diretório alvo baseado no domínio
  let targetDir = baseDir;
  if (config.domain === "backend") {
    targetDir = path.join(baseDir, "api");
  } else if (config.domain === "frontend") {
    targetDir = path.join(baseDir, "web");
  }

  await fs.ensureDir(targetDir);

  // ============ Templates de arquitetura por domínio ============
  
  if (config.domain === "backend") {
    await applyBackendArchitecture(targetDir, config);
  }

  if (config.domain === "frontend") {
    await applyFrontendArchitecture(targetDir, config);
  }

  if (config.domain === "fullstack") {
    await applyFullstackArchitecture(targetDir, config);
  }
}

// ============ Arquitetura Backend ============
async function applyBackendArchitecture(targetDir, config) {
  const arch = config.architecture;

  if (arch === "Feature-based (modular)") {
    const features = ["users", "auth"];
    for (const feature of features) {
      const featureDir = path.join(targetDir, "src", feature);
      await fs.ensureDir(featureDir);
      
      const files = config.language === "py" 
        ? ["__init__.py", "models.py", "services.py", "routes.py"]
        : ["index.ts", "controller.ts", "service.ts", "model.ts", "routes.ts"];
      
      for (const file of files) {
        const filePath = path.join(featureDir, file);
        await fs.writeFile(filePath, getFeatureTemplate(file, feature, config.language), "utf-8");
      }
    }
    console.log(`   ✓ Estrutura Feature-based criada`);
  }

  if (arch === "Layer-based (MVC/traditional)") {
    const layers = config.language === "py"
      ? ["models", "views", "controllers", "services"]
      : ["models", "controllers", "services", "routes", "middlewares"];
    
    for (const layer of layers) {
      const layerDir = path.join(targetDir, "src", layer);
      await fs.ensureDir(layerDir);
      
      const indexFile = config.language === "py" ? "__init__.py" : "index.ts";
      await fs.writeFile(
        path.join(layerDir, indexFile),
        `# ${layer} layer\n`,
        "utf-8"
      );
    }
    console.log(`   ✓ Estrutura Layer-based criada`);
  }

  if (arch === "Clean Architecture" || arch === "Hexagonal Architecture (Ports & Adapters)") {
    const dirs = config.language === "py"
      ? ["domain/entities", "domain/use_cases", "infrastructure/repositories", "infrastructure/database", "interfaces/api"]
      : ["domain/entities", "domain/use-cases", "infrastructure/repositories", "infrastructure/database", "interfaces/controllers"];
    
    for (const dir of dirs) {
      const dirPath = path.join(targetDir, "src", dir);
      await fs.ensureDir(dirPath);
      
      const indexFile = config.language === "py" ? "__init__.py" : "index.ts";
      await fs.writeFile(path.join(dirPath, indexFile), "", "utf-8");
    }
    console.log(`   ✓ Estrutura Clean/Hexagonal Architecture criada`);
  }

  if (arch === "DDD (Domain-Driven Design)") {
    const contexts = ["sales", "inventory"];
    for (const context of contexts) {
      const dirs = config.language === "py"
        ? ["domain/entities", "domain/value_objects", "domain/repositories", "application/services", "infrastructure"]
        : ["domain/entities", "domain/value-objects", "domain/repositories", "application/services", "infrastructure"];
      
      for (const dir of dirs) {
        const dirPath = path.join(targetDir, "src", "bounded-contexts", context, dir);
        await fs.ensureDir(dirPath);
        
        const indexFile = config.language === "py" ? "__init__.py" : "index.ts";
        await fs.writeFile(path.join(dirPath, indexFile), "", "utf-8");
      }
    }
    console.log(`   ✓ Estrutura DDD criada`);
  }
}

// ============ Arquitetura Frontend ============
async function applyFrontendArchitecture(targetDir, config) {
  const arch = config.architecture;
  const srcDir = path.join(targetDir, "src");

  if (arch === "Feature-based (Feature-Sliced Design)") {
    const features = ["auth", "dashboard"];
    for (const feature of features) {
      const dirs = ["components", "hooks", "services", "types", "utils"];
      for (const dir of dirs) {
        const dirPath = path.join(srcDir, "features", feature, dir);
        await fs.ensureDir(dirPath);
        await fs.writeFile(path.join(dirPath, "index.ts"), "", "utf-8");
      }
    }
    
    // Shared
    const sharedDirs = ["components", "hooks", "utils", "types"];
    for (const dir of sharedDirs) {
      await fs.ensureDir(path.join(srcDir, "shared", dir));
    }
    console.log(`   ✓ Estrutura Feature-based criada`);
  }

  if (arch === "Atomic Design") {
    const atomicDirs = ["atoms", "molecules", "organisms", "templates", "pages"];
    for (const dir of atomicDirs) {
      await fs.ensureDir(path.join(srcDir, "components", dir));
    }
    console.log(`   ✓ Estrutura Atomic Design criada`);
  }

  if (arch === "Layer-based (traditional)") {
    const dirs = ["components", "pages", "services", "hooks", "utils", "contexts", "styles"];
    for (const dir of dirs) {
      await fs.ensureDir(path.join(srcDir, dir));
    }
    console.log(`   ✓ Estrutura Layer-based criada`);
  }

  if (arch === "Next.js App Router (moderna)") {
    // Next.js já cria a estrutura app/, apenas adicionar alguns extras
    const dirs = ["app/(auth)", "app/dashboard", "components", "lib"];
    for (const dir of dirs) {
      await fs.ensureDir(path.join(targetDir, dir));
    }
    console.log(`   ✓ Estrutura Next.js App Router criada`);
  }
}

// ============ Arquitetura Fullstack ============
async function applyFullstackArchitecture(targetDir, config) {
  // Para fullstack, aplicar tanto backend quanto frontend se for monolito
  if (config.architecture === "Monolithic Unified") {
    await fs.ensureDir(path.join(targetDir, "src", "server"));
    await fs.ensureDir(path.join(targetDir, "src", "client"));
    await fs.ensureDir(path.join(targetDir, "src", "shared"));
    console.log(`   ✓ Estrutura Monolithic Unified criada`);
  }
}

// ============ Aplicar configurações de features ============
async function applyFeatureConfigurations(root, config) {
  if (!config.features) return;

  console.log(`\n🔧 Configurando features adicionais:\n`);

  // ============ Testing ============
  if (config.features.testing) {
    console.log(`   ✓ Configurando ${config.features.testing.unitTest}`);
    await createTestConfig(root, config);
  }

  // ============ Linting & Formatting ============
  if (config.features.quality) {
    console.log(`   ✓ Configurando ${config.features.quality.linter} + ${config.features.quality.formatter}`);
    await createQualityConfig(root, config);
  }

  // ============ Database ============
  if (config.features.database) {
    console.log(`   ✓ Configurando database`);
    await createDatabaseConfig(root, config);
  }
}

// ============ Criar configuração de testes ============
async function createTestConfig(root, config) {
  const testFramework = config.features.testing.unitTest;

  if (config.language === "js" || config.language === "ts") {
    if (testFramework === "Jest" || testFramework === "Vitest") {
      const configFile = testFramework === "Jest" ? "jest.config.js" : "vitest.config.ts";
      const configContent = testFramework === "Jest" 
        ? `module.exports = {
  preset: '${config.language === "ts" ? "ts-jest" : undefined}',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};`
        : `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});`;
      
      await fs.writeFile(path.join(root, configFile), configContent, "utf-8");
    }
  }

  if (config.language === "py") {
    if (testFramework === "pytest") {
      await fs.writeFile(
        path.join(root, "pytest.ini"),
        `[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
`,
        "utf-8"
      );
      
      await fs.ensureDir(path.join(root, "tests"));
      await fs.writeFile(
        path.join(root, "tests", "__init__.py"),
        "",
        "utf-8"
      );
    }
  }
}

// ============ Criar configuração de qualidade ============
async function createQualityConfig(root, config) {
  const { linter, formatter } = config.features.quality;

  if (config.language === "js" || config.language === "ts") {
    // ESLint
    if (linter === "ESLint" || linter === "ESLint + @typescript-eslint") {
      const eslintConfig = {
        env: {
          node: true,
          es2021: true
        },
        extends: config.language === "ts" 
          ? ["eslint:recommended", "plugin:@typescript-eslint/recommended"]
          : ["eslint:recommended"],
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module"
        },
        rules: {}
      };
      
      await fs.writeFile(
        path.join(root, ".eslintrc.json"),
        JSON.stringify(eslintConfig, null, 2),
        "utf-8"
      );
    }

    // Prettier
    if (formatter === "Prettier") {
      const prettierConfig = {
        semi: true,
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2
      };
      
      await fs.writeFile(
        path.join(root, ".prettierrc"),
        JSON.stringify(prettierConfig, null, 2),
        "utf-8"
      );
    }
  }

  if (config.language === "py") {
    // Black
    if (formatter === "Black") {
      await fs.writeFile(
        path.join(root, "pyproject.toml"),
        `[tool.black]
line-length = 100
target-version = ['py312']
`,
        "utf-8"
      );
    }

    // Pylint/Flake8
    if (linter === "Flake8") {
      await fs.writeFile(
        path.join(root, ".flake8"),
        `[flake8]
max-line-length = 100
exclude = .git,__pycache__,venv
`,
        "utf-8"
      );
    }
  }
}

// ============ Criar configuração de database ============
async function createDatabaseConfig(root, config) {
  if (config.features.database.sql) {
    const { type: dbType, orm } = config.features.database.sql;
    
    if (orm === "Prisma") {
      const prismaDir = path.join(root, "prisma");
      await fs.ensureDir(prismaDir);
      
      const schemaContent = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${dbType === "PostgreSQL" ? "postgresql" : "mysql"}"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;
      
      await fs.writeFile(
        path.join(prismaDir, "schema.prisma"),
        schemaContent,
        "utf-8"
      );
    }
  }
}

// ============ Criar .gitignore ============
async function createGitignore(root, config) {
  let gitignoreContent = "";

  if (config.language === "py") {
    gitignoreContent = `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/
.venv
pip-log.txt
pip-delete-this-directory.txt
.pytest_cache/
.coverage
htmlcov/
*.egg-info/
dist/
build/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db
`;
  } else {
    gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Build
dist/
build/
.next/
out/
.turbo/

# Environment
.env
.env*.local

# IDEs
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Misc
*.log
.cache/
`;
  }

  await fs.writeFile(path.join(root, ".gitignore"), gitignoreContent, "utf-8");
}

// ============ Criar arquivo .env ============
async function createEnvFile(root, config) {
  let envContent = `# ${config.projectName} Environment Variables\n\n`;

  if (config.features?.database?.sql) {
    const dbType = config.features.database.sql.type;
    const dbName = config.projectName.replace(/-/g, "_");
    
    if (dbType === "PostgreSQL") {
      envContent += `DATABASE_URL="postgresql://dev:dev@localhost:5432/${dbName}"\n`;
    } else if (dbType === "MySQL") {
      envContent += `DATABASE_URL="mysql://root:dev@localhost:3306/${dbName}"\n`;
    }
  }

  if (config.features?.database?.nosql) {
    const dbType = config.features.database.nosql.type;
    
    if (dbType === "MongoDB") {
      envContent += `MONGODB_URI="mongodb://dev:dev@localhost:27017"\n`;
    } else if (dbType === "Redis") {
      envContent += `REDIS_URL="redis://localhost:6379"\n`;
    }
  }

  envContent += `\nNODE_ENV="development"\n`;
  envContent += `PORT=3000\n`;

  await fs.writeFile(path.join(root, ".env.example"), envContent, "utf-8");
}

// ============ Helper: Template de feature ============
function getFeatureTemplate(file, feature, language) {
  if (language === "py") {
    if (file === "models.py") {
      return `from pydantic import BaseModel

class ${feature.charAt(0).toUpperCase() + feature.slice(1)}(BaseModel):
    id: int
    name: str
`;
    }
    if (file === "services.py") {
      return `class ${feature.charAt(0).toUpperCase() + feature.slice(1)}Service:
    def get_all(self):
        pass
`;
    }
    if (file === "routes.py") {
      return `from fastapi import APIRouter

router = APIRouter(prefix="/${feature}", tags=["${feature}"])

@router.get("/")
def get_all():
    return []
`;
    }
    return "";
  } else {
    if (file === "model.ts") {
      return `export interface ${feature.charAt(0).toUpperCase() + feature.slice(1)} {
  id: number;
  name: string;
}\n`;
    }
    if (file === "service.ts") {
      return `export class ${feature.charAt(0).toUpperCase() + feature.slice(1)}Service {
  async getAll() {
    return [];
  }
}\n`;
    }
    if (file === "controller.ts") {
      return `export class ${feature.charAt(0).toUpperCase() + feature.slice(1)}Controller {
  async index(req: any, res: any) {
    res.json([]);
  }
}\n`;
    }
    if (file === "routes.ts") {
      return `import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json([]);
});

export default router;\n`;
    }
    return `export {};\n`;
  }
}