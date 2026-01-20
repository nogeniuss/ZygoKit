import { projectConfigOptions } from "../stacks/index.js";

export function planProject(config) {
  const plan = [];
  const isMonorepo = config.architecture && (
    config.architecture.toLowerCase().includes("monorepo") ||
    config.architecture === "Monorepo"
  );
  const baseDir = isMonorepo ? "apps" : ".";

  // ============ Determinar Docker Image baseado na linguagem ============
  const getDockerImage = () => {
    switch (config.language) {
      case "js":
      case "ts":
        return "node:20-alpine";
      case "py":
        return "python:3.12-alpine";
      default:
        return "node:20-alpine";
    }
  };

  const dockerImage = getDockerImage();

  // ============ BACKEND ============
  if (config.domain === "backend") {
    let command = "";
    let target = `${baseDir}/api`;

    // JavaScript/TypeScript Backend
    if (config.language === "js" || config.language === "ts") {
      switch (config.framework) {
        case "NestJS":
          command = `npx @nestjs/cli new ${target} --package-manager npm --skip-git`;
          break;
        
        case "Express.js":
          command = `npx express-generator ${target} --no-view`;
          break;
        
        case "Fastify":
          command = `npm create fastify@latest ${target} -- --lang=${config.language}`;
          break;
        
        case "Koa":
          command = `mkdir -p ${target} && cd ${target} && npm init -y && npm install koa koa-router`;
          break;
        
        case "Hono":
          command = `npm create hono@latest ${target}`;
          break;
        
        case "AdonisJS":
          command = `npm init adonisjs@latest ${target}`;
          break;
        
        default:
          // Express como fallback
          command = `npx express-generator ${target} --no-view`;
      }
    }

    // Python Backend
    if (config.language === "py") {
      const projectName = target.split('/').pop();
      
      switch (config.framework) {
        case "FastAPI":
          command = `mkdir -p ${target} && cd ${target} && python -m venv venv && . venv/bin/activate && pip install fastapi uvicorn && echo "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\ndef read_root():\n    return {'Hello': 'World'}" > main.py`;
          break;
        
        case "Django":
          command = `pip install django && django-admin startproject ${projectName} ${target}`;
          break;
        
        case "Flask":
          command = `mkdir -p ${target} && cd ${target} && python -m venv venv && . venv/bin/activate && pip install flask && echo "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return 'Hello World!'\n\nif __name__ == '__main__':\n    app.run(debug=True)" > app.py`;
          break;
        
        case "Starlette":
          command = `mkdir -p ${target} && cd ${target} && python -m venv venv && . venv/bin/activate && pip install starlette uvicorn`;
          break;
        
        default:
          // FastAPI como fallback
          command = `mkdir -p ${target} && cd ${target} && python -m venv venv && . venv/bin/activate && pip install fastapi uvicorn`;
      }
    }

    plan.push({
      type: "docker",
      image: dockerImage,
      command,
      target,
      workdir: "/app"
    });
  }

  // ============ FRONTEND ============
  if (config.domain === "frontend") {
    let command = "";
    let target = `${baseDir}/web`;

    // JavaScript/TypeScript Frontend
    if (config.language === "js" || config.language === "ts") {
      const isTS = config.language === "ts";
      
      switch (config.framework) {
        case "React":
          command = `npx create-react-app ${target}${isTS ? ' --template typescript' : ''}`;
          break;
        
        case "Vue.js":
          command = `npm create vue@latest ${target} -- ${isTS ? '--typescript' : ''}`;
          break;
        
        case "Angular":
          command = `npx @angular/cli new ${target} --skip-git`;
          break;
        
        case "Svelte":
          command = `npm create vite@latest ${target} -- --template svelte${isTS ? '-ts' : ''}`;
          break;
        
        case "Solid.js":
          command = `npx degit solidjs/templates/${isTS ? 'ts' : 'js'} ${target}`;
          break;
        
        case "Preact":
          command = `npx preact-cli create default ${target}`;
          break;
        
        case "Alpine.js":
          command = `mkdir -p ${target} && echo "<!DOCTYPE html><html><head><script defer src='https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js'></script></head><body><div x-data='{ count: 0 }'><button @click='count++'>Increment</button><span x-text='count'></span></div></body></html>" > ${target}/index.html`;
          break;
        
        case "Lit":
          command = `npm create vite@latest ${target} -- --template lit${isTS ? '-ts' : ''}`;
          break;
        
        default:
          // Vite + React como fallback
          command = `npm create vite@latest ${target} -- --template react${isTS ? '-ts' : ''}`;
      }
    }

    // Python Frontend (frameworks raros, mas existem)
    if (config.language === "py") {
      const projectName = target.split('/').pop();
      
      switch (config.framework) {
        case "Streamlit":
          command = `mkdir -p ${target} && cd ${target} && python -m venv venv && . venv/bin/activate && pip install streamlit && echo "import streamlit as st\n\nst.title('Hello Streamlit')\nst.write('Welcome!')" > app.py`;
          break;
        
        case "Dash (Plotly)":
          command = `mkdir -p ${target} && cd ${target} && python -m venv venv && . venv/bin/activate && pip install dash`;
          break;
        
        case "Gradio":
          command = `mkdir -p ${target} && cd ${target} && python -m venv venv && . venv/bin/activate && pip install gradio`;
          break;
        
        default:
          command = `mkdir -p ${target} && cd ${target} && python -m venv venv && . venv/bin/activate && pip install streamlit`;
      }
    }

    plan.push({
      type: "docker",
      image: dockerImage,
      command,
      target,
      workdir: "/app"
    });
  }

  // ============ FULLSTACK ============
  if (config.domain === "fullstack") {
    let command = "";
    let target = isMonorepo ? "apps/web" : ".";

    // JavaScript/TypeScript Fullstack
    if (config.language === "js" || config.language === "ts") {
      const isTS = config.language === "ts";
      
      switch (config.framework) {
        case "Next.js":
          command = `npx create-next-app@latest ${target} --${isTS ? 'typescript' : 'javascript'} --tailwind --app --no-git`;
          break;
        
        case "Nuxt":
          command = `npx nuxi@latest init ${target}`;
          break;
        
        case "SvelteKit":
          command = `npm create svelte@latest ${target}`;
          break;
        
        case "Remix":
          command = `npx create-remix@latest ${target}`;
          break;
        
        case "Astro":
          command = `npm create astro@latest ${target} -- --template minimal --no-git`;
          break;
        
        case "Qwik":
          command = `npm create qwik@latest ${target}`;
          break;
        
        case "SolidStart":
          command = `npm create solid@latest ${target}`;
          break;
        
        case "Analog":
          command = `npx @analogjs/platform@latest new ${target}`;
          break;
        
        default:
          // Next.js como fallback
          command = `npx create-next-app@latest ${target} --${isTS ? 'typescript' : 'javascript'} --tailwind --app --no-git`;
      }
    }

    // Python Fullstack
    if (config.language === "py") {
      const projectName = target.split('/').pop();
      
      switch (config.framework) {
        case "Django":
          command = `pip install django && django-admin startproject ${projectName} ${target}`;
          break;
        
        case "Flask + Jinja2":
          command = `mkdir -p ${target} && cd ${target} && python -m venv venv && . venv/bin/activate && pip install flask && mkdir -p templates static`;
          break;
        
        case "Reflex":
          command = `pip install reflex && reflex init --name ${projectName}`;
          break;
        
        default:
          command = `pip install django && django-admin startproject ${projectName} ${target}`;
      }
    }

    plan.push({
      type: "docker",
      image: dockerImage,
      command,
      target,
      workdir: "/app"
    });
  }

  // ============ Adicionar configurações extras ============
  
  // Monorepo setup
  if (isMonorepo) {
    plan.unshift({
      type: "file",
      target: "package.json",
      content: JSON.stringify({
        name: config.projectName,
        private: true,
        workspaces: ["apps/*", "packages/*"],
        scripts: {
          dev: "turbo run dev",
          build: "turbo run build",
          lint: "turbo run lint"
        },
        devDependencies: {
          turbo: "latest"
        }
      }, null, 2)
    });

    plan.unshift({
      type: "file",
      target: "turbo.json",
      content: JSON.stringify({
        "$schema": "https://turbo.build/schema.json",
        "pipeline": {
          "dev": {
            "cache": false,
            "persistent": true
          },
          "build": {
            "dependsOn": ["^build"],
            "outputs": [".next/**", "dist/**", "build/**"]
          },
          "lint": {}
        }
      }, null, 2)
    });

    plan.unshift({
      type: "directory",
      target: "apps"
    });

    plan.unshift({
      type: "directory",
      target: "packages"
    });
  }

  // Docker Compose para o projeto
  if (config.features?.containerization === "docker") {
    const services = {};
    
    if (config.domain === "backend" || config.domain === "fullstack") {
      services.api = {
        build: {
          context: config.domain === "backend" ? `${baseDir}/api` : ".",
          dockerfile: "Dockerfile"
        },
        ports: ["3000:3000"],
        volumes: [`./${baseDir}/api:/app`, "/app/node_modules"],
        environment: {
          NODE_ENV: "development"
        }
      };
    }

    if (config.domain === "frontend" || config.domain === "fullstack") {
      services.web = {
        build: {
          context: config.domain === "frontend" ? `${baseDir}/web` : ".",
          dockerfile: "Dockerfile"
        },
        ports: ["3001:3000"],
        volumes: [`./${config.domain === "frontend" ? baseDir + "/web" : "."}:/app`, "/app/node_modules"],
        environment: {
          NODE_ENV: "development"
        }
      };
    }

    // Adicionar database se configurado
    if (config.features?.database?.sql) {
      const dbType = config.features.database.sql.type;
      
      if (dbType === "PostgreSQL") {
        services.postgres = {
          image: "postgres:16-alpine",
          ports: ["5432:5432"],
          environment: {
            POSTGRES_USER: "dev",
            POSTGRES_PASSWORD: "dev",
            POSTGRES_DB: config.projectName.replace(/-/g, "_")
          },
          volumes: ["postgres_data:/var/lib/postgresql/data"]
        };
      } else if (dbType === "MySQL") {
        services.mysql = {
          image: "mysql:8-alpine",
          ports: ["3306:3306"],
          environment: {
            MYSQL_ROOT_PASSWORD: "dev",
            MYSQL_DATABASE: config.projectName.replace(/-/g, "_")
          },
          volumes: ["mysql_data:/var/lib/mysql"]
        };
      }
    }

    if (config.features?.database?.nosql) {
      const dbType = config.features.database.nosql.type;
      
      if (dbType === "MongoDB") {
        services.mongodb = {
          image: "mongo:7-alpine",
          ports: ["27017:27017"],
          environment: {
            MONGO_INITDB_ROOT_USERNAME: "dev",
            MONGO_INITDB_ROOT_PASSWORD: "dev"
          },
          volumes: ["mongo_data:/data/db"]
        };
      } else if (dbType === "Redis") {
        services.redis = {
          image: "redis:7-alpine",
          ports: ["6379:6379"],
          volumes: ["redis_data:/data"]
        };
      }
    }

    const volumes = {};
    if (services.postgres) volumes.postgres_data = {};
    if (services.mysql) volumes.mysql_data = {};
    if (services.mongodb) volumes.mongo_data = {};
    if (services.redis) volumes.redis_data = {};

    plan.push({
      type: "file",
      target: "docker-compose.yml",
      content: `version: '3.8'

services:
${Object.entries(services).map(([name, config]) => 
  `  ${name}:\n${Object.entries(config).map(([key, value]) => 
    `    ${key}: ${typeof value === 'object' ? '\n' + Object.entries(value).map(([k, v]) => 
      `      ${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`).join('\n') : value}`
  ).join('\n')}`
).join('\n\n')}

${Object.keys(volumes).length > 0 ? `volumes:\n${Object.keys(volumes).map(v => `  ${v}:`).join('\n')}` : ''}
`
    });
  }

  // Dockerfile
  if (config.features?.containerization === "docker") {
    const dockerfileContent = config.language === "py" 
      ? `FROM python:3.12-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
`
      : `FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
`;

    plan.push({
      type: "file",
      target: config.domain === "backend" ? `${baseDir}/api/Dockerfile` : "Dockerfile",
      content: dockerfileContent
    });
  }

  // .dockerignore
  if (config.features?.containerization === "docker") {
    plan.push({
      type: "file",
      target: ".dockerignore",
      content: `node_modules
npm-debug.log
.next
.env
.git
dist
build
*.log
`
    });
  }

  // README.md
  plan.push({
    type: "file",
    target: "README.md",
    content: `# ${config.projectName}

## Stack
- **Language**: ${config.language.toUpperCase()}
- **Domain**: ${config.domain}
- **Architecture**: ${config.architecture}
- **Framework**: ${config.framework}

## Features
${config.features?.authentication ? `- Authentication: ${config.features.authentication.strategy}` : ''}
${config.features?.database?.sql ? `- Database SQL: ${config.features.database.sql.type} + ${config.features.database.sql.orm}` : ''}
${config.features?.database?.nosql ? `- Database NoSQL: ${config.features.database.nosql.type}` : ''}
${config.features?.styling ? `- Styling: ${config.features.styling}` : ''}
${config.features?.testing ? `- Testing: ${config.features.testing.unitTest}` : ''}
${config.features?.quality ? `- Linting: ${config.features.quality.linter}, Formatting: ${config.features.quality.formatter}` : ''}

## Getting Started

${config.features?.containerization === "docker" ? `
### Using Docker
\`\`\`bash
docker-compose up
\`\`\`
` : `
### Development
\`\`\`bash
npm install
npm run dev
\`\`\`
`}

## Project generated with ZygoKit
`
  });

  return plan;
}