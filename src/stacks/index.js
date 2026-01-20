export const projectConfigOptions = {
  languages: {
    javascript: {
      id: "js",
      extensions: [".js", ".mjs", ".cjs"],
      runtimes: ["node", "bun", "deno"]
    },
    typescript: {
      id: "ts",
      extensions: [".ts", ".tsx", ".mts", ".cts"],
      runtimes: ["node", "bun", "deno"],
      tools: ["tsc", "ts-node", "tsx", "esbuild", "swc"]
    },
    python: {
      id: "py",
      extensions: [".py"],
      versions: ["3.10", "3.11", "3.12", "3.13"],
      packageManagers: ["pip", "poetry", "pipenv", "uv"]
    }
  },

  domains: {
    backend: {
      architectures: [
        "Feature-based (modular)",
        "Layer-based (MVC/traditional)",
        "Clean Architecture",
        "Hexagonal Architecture (Ports & Adapters)",
        "DDD (Domain-Driven Design)",
        "CQRS (Command Query Responsibility Segregation)",
        "Event-Driven Architecture",
        "Microservices",
        "Monolithic"
      ],
      
      patterns: [
        "Repository Pattern",
        "Service Layer Pattern",
        "Factory Pattern",
        "Strategy Pattern",
        "Dependency Injection",
        "Singleton Pattern",
        "Observer Pattern",
        "Middleware Pattern"
      ],

      frameworks: {
        javascript: [
          "Express.js",
          "Koa",
          "Hapi",
          "Restify",
          "Polka",
          "Micro"
        ],
        typescript: [
          "NestJS",
          "Fastify",
          "Hono",
          "AdonisJS",
          "Elysia",
          "tRPC",
          "Feathers"
        ],
        python: [
          "FastAPI",
          "Django",
          "Django REST Framework",
          "Flask",
          "Flask-RESTful",
          "Starlette",
          "Sanic",
          "Tornado",
          "Quart",
          "Litestar",
          "Falcon",
          "Pyramid",
          "Bottle"
        ]
      },

      apiStyles: [
        "REST",
        "GraphQL",
        "gRPC",
        "WebSocket",
        "Server-Sent Events (SSE)",
        "WebRTC",
        "tRPC (TypeScript RPC)"
      ]
    },

    frontend: {
      architectures: [
        "Feature-based (Feature-Sliced Design)",
        "Atomic Design",
        "Layer-based (traditional)",
        "Component-Driven Development",
        "Micro-frontends",
        "JAMstack",
        "Islands Architecture",
        "Server Components Architecture"
      ],

      patterns: [
        "Container/Presentational Pattern",
        "Compound Components",
        "Render Props",
        "Higher-Order Components (HOC)",
        "Custom Hooks Pattern",
        "Provider Pattern",
        "Observer Pattern",
        "Module Pattern",
        "Proxy Pattern"
      ],

      frameworks: {
        javascript: [
          "React",
          "Vue.js",
          "Angular",
          "Svelte",
          "Solid.js",
          "Preact",
          "Alpine.js",
          "Lit",
          "Ember.js",
          "Backbone.js (legacy)",
          "Knockout.js (legacy)",
          "Mithril"
        ],
        typescript: [
          "React (with TS)",
          "Vue 3 (with TS)",
          "Angular",
          "Svelte (with TS)",
          "Solid.js",
          "Qwik",
          "Lit"
        ],
        python: [
          "Streamlit",
          "Dash (Plotly)",
          "Gradio",
          "Panel",
          "Anvil",
          "PyScript"
        ]
      },

      rendering: [
        "CSR (Client-Side Rendering)",
        "SSR (Server-Side Rendering)",
        "SSG (Static Site Generation)",
        "ISR (Incremental Static Regeneration)",
        "Hybrid (SSR + SSG)",
        "Streaming SSR",
        "Partial Hydration",
        "Progressive Hydration",
        "Islands Hydration"
      ]
    },

    fullstack: {
      architectures: [
        "Monolithic Unified",
        "Monorepo",
        "Polyrepo (Multi-repo)",
        "Micro-frontends + Microservices",
        "BFF (Backend for Frontend)",
        "Three-tier Architecture",
        "N-tier Architecture",
        "Serverless Architecture",
        "JAMstack Full",
        "Modular Monolith"
      ],

      frameworks: {
        javascript: [
          "Meteor"
        ],
        typescript: [
          "Next.js",
          "Remix",
          "Astro",
          "SvelteKit",
          "SolidStart",
          "Qwik City",
          "Nuxt",
          "Analog (Angular)",
          "Blitz.js",
          "RedwoodJS",
          "Wasp"
        ],
        python: [
          "Django (fullstack)",
          "Flask + Jinja2",
          "FastAPI + Templates",
          "Reflex",
          "Pynecone",
          "web2py",
          "TurboGears"
        ]
      },

      metaFrameworks: {
        react: ["Next.js", "Remix", "Gatsby", "Astro (with React)"],
        vue: ["Nuxt", "Astro (with Vue)", "VitePress", "Quasar"],
        svelte: ["SvelteKit", "Astro (with Svelte)", "Elder.js"],
        angular: ["Analog", "Scully"],
        solid: ["SolidStart", "Astro (with Solid)"]
      }
    },

    mobile: {
      frameworks: {
        javascript: [
          "React Native",
          "Ionic",
          "NativeScript",
          "Quasar (mobile)",
          "Framework7",
          "Onsen UI"
        ],
        typescript: [
          "React Native",
          "Ionic (with Angular/React/Vue)",
          "NativeScript",
          "Expo"
        ],
        python: [
          "Kivy",
          "BeeWare",
          "PyQt/PySide"
        ]
      }
    },

    desktop: {
      frameworks: {
        javascript: [
          "Electron",
          "NW.js",
          "Tauri (Rust + JS)",
          "Neutralino.js"
        ],
        typescript: [
          "Electron",
          "Tauri"
        ],
        python: [
          "PyQt/PySide",
          "Tkinter",
          "Kivy",
          "wxPython",
          "Dear PyGui"
        ]
      }
    }
  },

  tools: {
    monorepo: {
      tools: [
        "Turborepo",
        "Nx",
        "Lerna",
        "Rush",
        "Changesets",
        "Bit"
      ],
      packageManagers: [
        "pnpm workspaces",
        "Yarn workspaces",
        "npm workspaces",
        "Bun workspaces"
      ]
    },

    packageManagers: {
      javascript: ["npm", "yarn", "pnpm", "bun"],
      python: ["pip", "poetry", "pipenv", "pdm", "uv", "conda", "hatch"]
    },

    buildTools: {
      javascript: [
        "Webpack",
        "Vite",
        "Rollup",
        "esbuild",
        "Parcel",
        "Turbopack",
        "SWC",
        "Rspack",
        "Bun bundler",
        "tsup",
        "Rolldown"
      ],
      typescript: [
        "tsc (TypeScript Compiler)",
        "esbuild",
        "SWC",
        "Vite",
        "tsup"
      ],
      python: [
        "setuptools",
        "wheel",
        "PyInstaller",
        "cx_Freeze",
        "Nuitka"
      ]
    },

    taskRunners: {
      javascript: ["npm scripts", "gulp", "grunt"],
      general: ["make", "just", "task"]
    },

    testing: {
      javascript: {
        unitTesting: ["Jest", "Vitest", "Mocha", "Jasmine", "AVA", "Bun test"],
        e2eTesting: ["Cypress", "Playwright", "Puppeteer", "TestCafe", "Nightwatch"],
        componentTesting: ["Testing Library", "Enzyme", "Storybook"],
        visualTesting: ["Chromatic", "Percy", "Applitools"]
      },
      typescript: {
        unitTesting: ["Jest", "Vitest", "Bun test"],
        e2eTesting: ["Playwright", "Cypress"]
      },
      python: {
        unitTesting: ["pytest", "unittest", "nose2", "doctest"],
        e2eTesting: ["Selenium", "Playwright (Python)", "Robot Framework"],
        mocking: ["unittest.mock", "pytest-mock", "responses"]
      }
    },

    linting: {
      javascript: ["ESLint", "Standard", "XO"],
      typescript: ["ESLint + @typescript-eslint", "TSLint (deprecated)", "Biome"],
      python: ["Pylint", "Flake8", "Ruff", "PyLint", "Bandit", "mypy (type checking)"]
    },

    formatting: {
      javascript: ["Prettier", "Biome", "dprint"],
      typescript: ["Prettier", "Biome"],
      python: ["Black", "autopep8", "YAPF", "isort", "Ruff"]
    },

    typeChecking: {
      javascript: ["TypeScript", "Flow", "JSDoc"],
      python: ["mypy", "pyright", "pyre", "pytype"]
    },

    documentation: {
      javascript: ["JSDoc", "TypeDoc", "Docusaurus", "VitePress", "Nextra"],
      python: ["Sphinx", "MkDocs", "pdoc", "pydoc", "Read the Docs"]
    }
  },

  features: {
    authentication: {
      strategies: ["JWT", "Session", "OAuth2", "SAML", "LDAP", "Passkeys/WebAuthn", "Magic Links"],
      libraries: {
        javascript: ["Passport.js", "NextAuth.js", "Auth.js", "Lucia", "Clerk", "Supabase Auth"],
        typescript: ["NextAuth.js", "Auth.js", "Lucia", "Clerk"],
        python: ["Django Auth", "Flask-Login", "FastAPI-Users", "Authlib", "PyJWT"]
      }
    },

    authorization: {
      models: ["RBAC", "ABAC", "ACL", "PBAC"],
      libraries: {
        javascript: ["CASL", "Casbin", "AccessControl"],
        python: ["Django Guardian", "Flask-Principal", "Casbin"]
      }
    },

    database: {
      sql: {
        databases: ["PostgreSQL", "MySQL", "MariaDB", "SQLite", "CockroachDB", "SQL Server"],
        orms: {
          javascript: ["Sequelize", "TypeORM", "MikroORM", "Objection.js", "Knex.js"],
          typescript: ["Prisma", "TypeORM", "Drizzle ORM", "Kysely", "MikroORM"],
          python: ["SQLAlchemy", "Django ORM", "Tortoise ORM", "Peewee", "Pony ORM"]
        },
        queryBuilders: {
          javascript: ["Knex.js", "Slonik"],
          typescript: ["Kysely", "Zapatos"],
          python: ["SQLAlchemy Core"]
        }
      },
      nosql: {
        databases: ["MongoDB", "Redis", "Cassandra", "DynamoDB", "Couchbase", "Neo4j"],
        orms: {
          javascript: ["Mongoose", "Typegoose"],
          typescript: ["Mongoose", "Typegoose", "TypeORM (MongoDB)"],
          python: ["MongoEngine", "PyMongo", "Motor", "Beanie"]
        }
      },
      newSql: ["PlanetScale", "CockroachDB", "Vitess", "TiDB"]
    },

    orm: {
      javascript: ["Sequelize", "TypeORM", "Mongoose", "Bookshelf", "Objection.js"],
      typescript: ["Prisma", "TypeORM", "Drizzle ORM", "MikroORM", "Kysely"],
      python: ["SQLAlchemy", "Django ORM", "Tortoise ORM", "Peewee", "Pony ORM"]
    },

    validation: {
      javascript: ["Joi", "Yup", "Ajv", "Validator.js", "express-validator"],
      typescript: ["Zod", "Yup", "io-ts", "Valibot", "TypeBox", "ArkType"],
      python: ["Pydantic", "Marshmallow", "Cerberus", "Voluptuous", "Schema"]
    },

    stateManagement: {
      javascript: ["Redux", "MobX", "Zustand", "Jotai", "Recoil", "XState", "Valtio", "Nanostores"],
      vue: ["Vuex", "Pinia"],
      angular: ["NgRx", "Akita", "NGXS"],
      svelte: ["Svelte Stores"],
      solid: ["Solid Stores"]
    },

    styling: {
      cssFrameworks: [
        "Tailwind CSS",
        "Bootstrap",
        "Bulma",
        "Foundation",
        "Material UI",
        "Chakra UI",
        "Ant Design",
        "Mantine",
        "shadcn/ui",
        "DaisyUI",
        "UIkit",
        "Semantic UI"
      ],
      cssInJs: [
        "styled-components",
        "Emotion",
        "Stitches",
        "Vanilla Extract",
        "Linaria",
        "JSS",
        "Styled JSX",
        "Panda CSS"
      ],
      cssPreprocessors: ["Sass/SCSS", "Less", "Stylus", "PostCSS"],
      cssModules: ["CSS Modules", "CSS Scoped"],
      utilityFirst: ["Tailwind CSS", "UnoCSS", "Windi CSS", "Master CSS"]
    },

    apiClient: {
      javascript: ["Axios", "Fetch API", "Got", "node-fetch", "Undici", "ky", "superagent"],
      typescript: ["Axios", "ofetch", "ky", "wretch"],
      python: ["httpx", "requests", "aiohttp", "urllib3"]
    },

    graphql: {
      servers: {
        javascript: ["Apollo Server", "GraphQL Yoga", "Mercurius"],
        typescript: ["Apollo Server", "TypeGraphQL", "Pothos", "GraphQL Yoga"],
        python: ["Graphene", "Strawberry", "Ariadne"]
      },
      clients: {
        javascript: ["Apollo Client", "urql", "Relay", "GraphQL Request"],
        typescript: ["Apollo Client", "urql", "GraphQL Codegen"],
        python: ["GQL", "sgqlc"]
      }
    },

    websockets: {
      javascript: ["Socket.io", "ws", "WebSocket API", "µWebSockets.js"],
      typescript: ["Socket.io", "ws"],
      python: ["python-socketio", "websockets", "aiohttp websockets"]
    },

    caching: {
      inMemory: ["node-cache", "lru-cache", "cache-manager"],
      distributed: ["Redis", "Memcached", "Varnish"],
      libraries: {
        javascript: ["ioredis", "node-redis", "cache-manager"],
        python: ["redis-py", "aiocache", "django-redis"]
      }
    },

    queues: {
      messageQueues: ["RabbitMQ", "Redis", "Apache Kafka", "AWS SQS", "NATS", "ZeroMQ"],
      libraries: {
        javascript: ["Bull", "BullMQ", "Bee-Queue", "KafkaJS", "amqplib"],
        typescript: ["BullMQ", "KafkaJS"],
        python: ["Celery", "RQ (Redis Queue)", "Dramatiq", "Huey", "arq"]
      }
    },

    logging: {
      javascript: ["Winston", "Pino", "Bunyan", "log4js", "Consola"],
      typescript: ["Winston", "Pino", "tslog"],
      python: ["loguru", "structlog", "logging (built-in)", "python-json-logger"]
    },

    monitoring: {
      apm: ["New Relic", "Datadog", "Sentry", "AppDynamics", "Elastic APM"],
      openSource: ["Prometheus", "Grafana", "Jaeger", "Zipkin"],
      libraries: {
        javascript: ["@sentry/node", "prom-client", "newrelic"],
        python: ["sentry-sdk", "prometheus-client", "opentelemetry"]
      }
    },

    security: {
      encryption: ["bcrypt", "argon2", "crypto"],
      helmet: ["Helmet.js", "CORS", "csurf"],
      libraries: {
        javascript: ["helmet", "bcrypt", "jsonwebtoken", "crypto"],
        typescript: ["helmet", "bcryptjs", "jose"],
        python: ["cryptography", "passlib", "PyJWT", "python-jose"]
      }
    },

    email: {
      javascript: ["Nodemailer", "SendGrid", "Mailgun", "AWS SES"],
      python: ["django-anymail", "yagmail", "smtplib", "python-postmark"]
    },

    fileUpload: {
      javascript: ["Multer", "Formidable", "Busboy", "Express-fileupload"],
      python: ["python-multipart", "Django FileField", "FastAPI UploadFile"]
    },

    imageProcessing: {
      javascript: ["Sharp", "Jimp", "ImageMagick"],
      python: ["Pillow", "opencv-python", "scikit-image", "ImageMagick"]
    },

    pdf: {
      javascript: ["PDFKit", "jsPDF", "pdf-lib", "Puppeteer (PDF generation)"],
      python: ["ReportLab", "PyPDF2", "pdfplumber", "WeasyPrint", "xhtml2pdf"]
    },

    cron: {
      javascript: ["node-cron", "node-schedule", "Agenda", "Bree"],
      python: ["APScheduler", "Celery Beat", "schedule", "Airflow"]
    },

    realtime: {
      technologies: ["WebSockets", "Server-Sent Events", "WebRTC", "Long Polling"],
      libraries: {
        javascript: ["Socket.io", "Pusher", "Ably", "PubNub"],
        python: ["python-socketio", "Django Channels", "Pusher"]
      }
    },

    search: {
      engines: ["Elasticsearch", "Algolia", "MeiliSearch", "Typesense", "Solr"],
      libraries: {
        javascript: ["@elastic/elasticsearch", "algoliasearch"],
        python: ["elasticsearch-py", "algoliasearch", "whoosh"]
      }
    },

    cms: {
      headless: ["Strapi", "Contentful", "Sanity", "Prismic", "Ghost", "Directus"],
      traditional: ["WordPress", "Drupal", "Joomla"],
      python: ["Wagtail", "Django CMS", "Mezzanine"]
    }
  },

  infrastructure: {
    containerization: {
      tools: ["Docker", "Podman", "containerd"],
      orchestration: ["Kubernetes", "Docker Swarm", "Nomad", "Amazon ECS"]
    },

    cicd: {
      platforms: [
        "GitHub Actions",
        "GitLab CI/CD",
        "CircleCI",
        "Jenkins",
        "Travis CI",
        "Bitbucket Pipelines",
        "Azure DevOps",
        "Drone",
        "TeamCity"
      ]
    },

    cloudProviders: {
      major: ["AWS", "Google Cloud", "Azure", "DigitalOcean", "Linode"],
      edge: ["Cloudflare", "Vercel", "Netlify", "Fly.io", "Railway"],
      specialized: ["Heroku", "Render", "Supabase", "Firebase", "PlanetScale"]
    },

    iac: {
      tools: ["Terraform", "Pulumi", "AWS CDK", "CloudFormation", "Ansible"],
      docker: ["Docker Compose", "Dockerfile"]
    },

    reverseProxy: ["Nginx", "Apache", "Caddy", "Traefik", "HAProxy"],

    processManagers: {
      javascript: ["PM2", "Forever", "Nodemon"],
      python: ["Gunicorn", "uWSGI", "Supervisor", "systemd"]
    },

    serverless: {
      platforms: ["AWS Lambda", "Cloudflare Workers", "Vercel Functions", "Netlify Functions", "Google Cloud Functions"],
      frameworks: {
        javascript: ["Serverless Framework", "AWS SAM", "SST"],
        python: ["Zappa", "Chalice", "Serverless Framework"]
      }
    }
  },

  quality: {
    codeQuality: {
      javascript: ["ESLint", "JSHint", "StandardJS", "Biome"],
      typescript: ["ESLint + typescript-eslint", "TSLint (deprecated)", "Biome"],
      python: ["Pylint", "Flake8", "Ruff", "Bandit", "SonarQube"]
    },

    formatting: {
      javascript: ["Prettier", "Biome", "dprint"],
      typescript: ["Prettier", "Biome"],
      python: ["Black", "autopep8", "YAPF", "Ruff"]
    },

    preCommitHooks: ["Husky", "lint-staged", "pre-commit (Python)", "lefthook"],

    codeReview: ["SonarQube", "CodeClimate", "Codacy", "DeepSource"],

    accessibility: ["axe", "Pa11y", "Lighthouse", "WAVE"],

    performance: {
      frontend: ["Lighthouse", "WebPageTest", "Bundle Analyzer"],
      backend: ["Artillery", "k6", "Apache Bench", "wrk"]
    },

    coverage: {
      javascript: ["Istanbul/nyc", "c8", "Codecov"],
      python: ["Coverage.py", "pytest-cov"]
    }
  },

  devTools: {
    versionControl: ["Git", "GitHub", "GitLab", "Bitbucket"],

    editors: ["VS Code", "WebStorm", "Vim/Neovim", "Sublime Text", "Cursor", "Zed"],

    debugging: {
      javascript: ["Chrome DevTools", "VS Code Debugger", "Node Inspector"],
      python: ["pdb", "ipdb", "VS Code Debugger", "PyCharm Debugger"]
    },

    apiDevelopment: ["Postman", "Insomnia", "Thunder Client", "HTTPie", "cURL"],

    dbClients: ["TablePlus", "DBeaver", "pgAdmin", "MongoDB Compass", "Redis Commander"]
  },

  deployment: {
    strategies: [
      "Blue-Green Deployment",
      "Canary Deployment",
      "Rolling Deployment",
      "Recreate Deployment",
      "A/B Testing",
      "Feature Flags"
    ],

    featureFlags: ["LaunchDarkly", "Unleash", "Flagsmith", "PostHog"],

    platforms: {
      static: ["Vercel", "Netlify", "GitHub Pages", "Cloudflare Pages"],
      fullstack: ["Vercel", "Railway", "Render", "Fly.io", "Heroku"],
      traditional: ["AWS EC2", "DigitalOcean Droplets", "Linode", "VPS"]
    }
  }
};