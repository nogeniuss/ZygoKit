forge/
├─ package.json
├─ bin/
│  └─ forge.js          # CLI entrypoint
├─ src/
│  ├─ core/
│  │  ├─ prompt.js     # perguntas (UX)
│  │  ├─ resolver.js   # valida combinações
│  │  ├─ planner.js    # gera plano de arquivos
│  │  └─ generator.js  # cria pastas + copia templates
│  ├─ stacks/
│  │  └─ js-ts/
│  │     ├─ index.js   # mapa da stack JS/TS
│  │     ├─ backend/
│  │     │  └─ nest/
│  │     ├─ frontend/
│  │     │  └─ next/
│  │     └─ fullstack/
│  │        └─ next/
│  ├─ templates/
│  │  └─ js-ts/
│  │     ├─ backend/nest/
│  │     ├─ frontend/next/
│  │     └─ fullstack/next/
│  └─ utils/
│     ├─ exec.js
│     └─ fs.js
└─ README.md


🧠 2️⃣ Por que essa arquitetura?

Você separa 4 responsabilidades críticas:

| Camada    | Responsabilidade     |
| --------- | -------------------- |
| prompt    | UX (perguntas)       |
| resolver  | Regras de negócio    |
| planner   | Decide o que criar   |
| generator | Cria arquivos        |
| stacks    | Declara o que existe |
| templates | Código-base          |
