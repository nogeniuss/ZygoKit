import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { projectConfigOptions } from '../stacks/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function runPrompt() {
  const answers = {};
  const steps = [
    "language",
    "projectName", 
    "domain",
    "architecture",
    "framework",
    "features"
  ];
  let stepIndex = 0;

  while (stepIndex < steps.length) {
    const step = steps[stepIndex];

    // ============ STEP 1: Language ============
    if (step === "language") {
      const languageOptions = Object.keys(projectConfigOptions.languages);
      
      // Mostrar opções antes do prompt
      console.log("\n📦 Linguagens disponíveis:");
      languageOptions.forEach((lang, index) => {
        const langInfo = projectConfigOptions.languages[lang];
        console.log(`   ${index + 1}. ${langInfo.id.toUpperCase()} (${langInfo.extensions.join(', ')})`);
      });

      const { languageInput } = await inquirer.prompt([
        {
          type: "input",
          name: "languageInput",
          message: "Digite o número da linguagem:",
          validate: (input) => {
            const num = parseInt(input);
            if (isNaN(num) || num < 1 || num > languageOptions.length) {
              return `Por favor, digite um número entre 1 e ${languageOptions.length}`;
            }
            return true;
          }
        }
      ]);

      const selectedIndex = parseInt(languageInput) - 1;
      answers.language = projectConfigOptions.languages[languageOptions[selectedIndex]].id;
      console.log(`✓ Selecionado: ${answers.language.toUpperCase()}\n`);
      stepIndex++;
    }

    // ============ STEP 2: Project Name ============
    if (step === "projectName") {
      const { projectName } = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "📝 Nome do projeto:",
          default: "my-app",
          validate: (input) =>
            input && input.trim() !== ""
              ? true
              : "O nome do projeto não pode ser vazio."
        }
      ]);
      answers.projectName = projectName.trim();
      stepIndex++;
    }

    // ============ STEP 3: Domain ============
    if (step === "domain") {
      const domainOptions = Object.keys(projectConfigOptions.domains);
      
      console.log("\n🎯 Tipos de projeto disponíveis:");
      domainOptions.forEach((domain, index) => {
        console.log(`   ${index + 1}. ${domain.charAt(0).toUpperCase() + domain.slice(1)}`);
      });
      console.log(`   0. ⏪ Voltar`);

      const { domainInput } = await inquirer.prompt([
        {
          type: "input",
          name: "domainInput",
          message: "Digite o número do tipo de projeto:",
          validate: (input) => {
            const num = parseInt(input);
            if (isNaN(num) || num < 0 || num > domainOptions.length) {
              return `Por favor, digite um número entre 0 e ${domainOptions.length}`;
            }
            return true;
          }
        }
      ]);

      const selectedNum = parseInt(domainInput);
      if (selectedNum === 0) {
        stepIndex = Math.max(stepIndex - 1, 0);
        continue;
      }

      answers.domain = domainOptions[selectedNum - 1];
      console.log(`✓ Selecionado: ${answers.domain}\n`);
      stepIndex++;
    }

    // ============ STEP 4: Architecture ============
    if (step === "architecture") {
      const archOptions = projectConfigOptions.domains[answers.domain].architectures;
      
      console.log(`\n🏗️  Arquiteturas disponíveis para ${answers.domain}:`);
      archOptions.forEach((arch, index) => {
        console.log(`   ${index + 1}. ${arch}`);
      });
      console.log(`   0. ⏪ Voltar`);

      const { archInput } = await inquirer.prompt([
        {
          type: "input",
          name: "archInput",
          message: "Digite o número da arquitetura:",
          validate: (input) => {
            const num = parseInt(input);
            if (isNaN(num) || num < 0 || num > archOptions.length) {
              return `Por favor, digite um número entre 0 e ${archOptions.length}`;
            }
            return true;
          }
        }
      ]);

      const selectedNum = parseInt(archInput);
      if (selectedNum === 0) {
        stepIndex = Math.max(stepIndex - 1, 0);
        continue;
      }

      answers.architecture = archOptions[selectedNum - 1];
      console.log(`✓ Selecionado: ${answers.architecture}\n`);
      stepIndex++;
    }

    // ============ STEP 5: Framework ============
    if (step === "framework") {
      const domainConfig = projectConfigOptions.domains[answers.domain];
      let frameworkChoices = [];

      // Verificar se frameworks é um objeto com chaves de linguagem ou um array
      if (domainConfig.frameworks && typeof domainConfig.frameworks === 'object') {
        // Se for objeto, pegar frameworks da linguagem selecionada
        if (Array.isArray(domainConfig.frameworks[answers.language])) {
          frameworkChoices = domainConfig.frameworks[answers.language];
        } else {
          // Se a linguagem específica não existir, combinar todas
          frameworkChoices = Object.values(domainConfig.frameworks)
            .flat()
            .filter((v, i, a) => a.indexOf(v) === i); // Remove duplicatas
        }
      } else if (Array.isArray(domainConfig.frameworks)) {
        frameworkChoices = domainConfig.frameworks;
      }

      // Se não houver frameworks disponíveis para a linguagem
      if (frameworkChoices.length === 0) {
        console.log(`\n⚠️  Nenhum framework disponível para ${answers.language} em ${answers.domain}.`);
        const { skipFramework } = await inquirer.prompt([
          {
            type: "confirm",
            name: "skipFramework",
            message: "Deseja continuar sem framework?",
            default: false
          }
        ]);

        if (!skipFramework) {
          stepIndex = Math.max(stepIndex - 1, 0);
          continue;
        }
        answers.framework = "none";
        stepIndex++;
        continue;
      }

      console.log(`\n⚙️  Frameworks disponíveis (${answers.language}):`);
      frameworkChoices.forEach((fw, index) => {
        console.log(`   ${index + 1}. ${fw}`);
      });
      console.log(`   0. ⏪ Voltar`);

      const { frameworkInput } = await inquirer.prompt([
        {
          type: "input",
          name: "frameworkInput",
          message: "Digite o número do framework:",
          validate: (input) => {
            const num = parseInt(input);
            if (isNaN(num) || num < 0 || num > frameworkChoices.length) {
              return `Por favor, digite um número entre 0 e ${frameworkChoices.length}`;
            }
            return true;
          }
        }
      ]);

      const selectedNum = parseInt(frameworkInput);
      if (selectedNum === 0) {
        stepIndex = Math.max(stepIndex - 1, 0);
        continue;
      }

      answers.framework = frameworkChoices[selectedNum - 1];
      console.log(`✓ Selecionado: ${answers.framework}\n`);
      stepIndex++;
    }

    // ============ STEP 6: Features (Optional) ============
    if (step === "features") {
      const { configureFeatures } = await inquirer.prompt([
        {
          type: "confirm",
          name: "configureFeatures",
          message: "🔧 Deseja configurar features adicionais? (auth, database, styling, etc)",
          default: false
        }
      ]);

      if (configureFeatures) {
        answers.features = {};

        // Authentication
        if (projectConfigOptions.features.authentication) {
          const authStrategies = projectConfigOptions.features.authentication.strategies;
          
          console.log("\n🔐 Estratégias de autenticação:");
          authStrategies.forEach((strategy, index) => {
            console.log(`   ${index + 1}. ${strategy}`);
          });
          console.log(`   0. Skip`);

          const { authInput } = await inquirer.prompt([
            {
              type: "input",
              name: "authInput",
              message: "Digite o número (0 para pular):",
              default: "0",
              validate: (input) => {
                const num = parseInt(input);
                if (isNaN(num) || num < 0 || num > authStrategies.length) {
                  return `Por favor, digite um número entre 0 e ${authStrategies.length}`;
                }
                return true;
              }
            }
          ]);

          const selectedNum = parseInt(authInput);
          if (selectedNum > 0) {
            answers.features.authentication = { strategy: authStrategies[selectedNum - 1] };
            console.log(`✓ Selecionado: ${authStrategies[selectedNum - 1]}\n`);
          }
        }

        // Database
        if (projectConfigOptions.features.database) {
          console.log("\n💾 Tipo de database:");
          console.log("   1. SQL");
          console.log("   2. NoSQL");
          console.log("   3. Both");
          console.log("   0. Skip");

          const { dbInput } = await inquirer.prompt([
            {
              type: "input",
              name: "dbInput",
              message: "Digite o número (0 para pular):",
              default: "0",
              validate: (input) => {
                const num = parseInt(input);
                if (isNaN(num) || num < 0 || num > 3) {
                  return "Por favor, digite um número entre 0 e 3";
                }
                return true;
              }
            }
          ]);

          const dbTypes = ["Skip", "SQL", "NoSQL", "Both"];
          const dbType = dbTypes[parseInt(dbInput)];

          if (dbType !== "Skip") {
            if (dbType === "SQL" || dbType === "Both") {
              const sqlDbs = projectConfigOptions.features.database.sql.databases;
              
              console.log("\nDatabases SQL disponíveis:");
              sqlDbs.forEach((db, index) => {
                console.log(`   ${index + 1}. ${db}`);
              });

              const { sqlDbInput } = await inquirer.prompt([
                {
                  type: "input",
                  name: "sqlDbInput",
                  message: "Digite o número do database SQL:",
                  validate: (input) => {
                    const num = parseInt(input);
                    if (isNaN(num) || num < 1 || num > sqlDbs.length) {
                      return `Por favor, digite um número entre 1 e ${sqlDbs.length}`;
                    }
                    return true;
                  }
                }
              ]);

              const sqlDb = sqlDbs[parseInt(sqlDbInput) - 1];
              console.log(`✓ Selecionado: ${sqlDb}`);

              const ormKey = answers.language === "py" ? "python" : "typescript";
              const ormOptions = projectConfigOptions.features.database.sql.orms[ormKey] || [];

              console.log("\nORMs disponíveis:");
              ormOptions.forEach((orm, index) => {
                console.log(`   ${index + 1}. ${orm}`);
              });

              const { ormInput } = await inquirer.prompt([
                {
                  type: "input",
                  name: "ormInput",
                  message: "Digite o número do ORM:",
                  validate: (input) => {
                    const num = parseInt(input);
                    if (isNaN(num) || num < 1 || num > ormOptions.length) {
                      return `Por favor, digite um número entre 1 e ${ormOptions.length}`;
                    }
                    return true;
                  }
                }
              ]);

              const orm = ormOptions[parseInt(ormInput) - 1];
              console.log(`✓ Selecionado: ${orm}\n`);

              answers.features.database = {
                ...answers.features.database,
                sql: { type: sqlDb, orm }
              };
            }

            if (dbType === "NoSQL" || dbType === "Both") {
              const nosqlDbs = projectConfigOptions.features.database.nosql.databases;
              
              console.log("\nDatabases NoSQL disponíveis:");
              nosqlDbs.forEach((db, index) => {
                console.log(`   ${index + 1}. ${db}`);
              });

              const { nosqlDbInput } = await inquirer.prompt([
                {
                  type: "input",
                  name: "nosqlDbInput",
                  message: "Digite o número do database NoSQL:",
                  validate: (input) => {
                    const num = parseInt(input);
                    if (isNaN(num) || num < 1 || num > nosqlDbs.length) {
                      return `Por favor, digite um número entre 1 e ${nosqlDbs.length}`;
                    }
                    return true;
                  }
                }
              ]);

              const nosqlDb = nosqlDbs[parseInt(nosqlDbInput) - 1];
              console.log(`✓ Selecionado: ${nosqlDb}\n`);

              answers.features.database = {
                ...answers.features.database,
                nosql: { type: nosqlDb }
              };
            }
          }
        }

        // Styling (apenas para frontend/fullstack)
        if ((answers.domain === "frontend" || answers.domain === "fullstack") && 
            projectConfigOptions.features.styling) {
          const stylingOptions = projectConfigOptions.features.styling.cssFrameworks.slice(0, 10);
          
          console.log("\n🎨 Frameworks de CSS:");
          stylingOptions.forEach((style, index) => {
            console.log(`   ${index + 1}. ${style}`);
          });
          console.log(`   0. Skip`);

          const { stylingInput } = await inquirer.prompt([
            {
              type: "input",
              name: "stylingInput",
              message: "Digite o número (0 para pular):",
              default: "0",
              validate: (input) => {
                const num = parseInt(input);
                if (isNaN(num) || num < 0 || num > stylingOptions.length) {
                  return `Por favor, digite um número entre 0 e ${stylingOptions.length}`;
                }
                return true;
              }
            }
          ]);

          const selectedNum = parseInt(stylingInput);
          if (selectedNum > 0) {
            answers.features.styling = stylingOptions[selectedNum - 1];
            console.log(`✓ Selecionado: ${answers.features.styling}\n`);
          }
        }

        // Testing
        const { addTesting } = await inquirer.prompt([
          {
            type: "confirm",
            name: "addTesting",
            message: "🧪 Adicionar configuração de testes?",
            default: false
          }
        ]);

        if (addTesting) {
          const testKey = answers.language === "py" ? "python" : 
                         answers.language === "ts" ? "typescript" : "javascript";
          
          const unitTestOptions = projectConfigOptions.tools.testing[testKey]?.unitTesting || [];
          
          console.log("\nFrameworks de teste unitário:");
          unitTestOptions.forEach((test, index) => {
            console.log(`   ${index + 1}. ${test}`);
          });

          const { testInput } = await inquirer.prompt([
            {
              type: "input",
              name: "testInput",
              message: "Digite o número:",
              validate: (input) => {
                const num = parseInt(input);
                if (isNaN(num) || num < 1 || num > unitTestOptions.length) {
                  return `Por favor, digite um número entre 1 e ${unitTestOptions.length}`;
                }
                return true;
              }
            }
          ]);

          answers.features.testing = { unitTest: unitTestOptions[parseInt(testInput) - 1] };
          console.log(`✓ Selecionado: ${answers.features.testing.unitTest}\n`);
        }

        // Linting & Formatting
        const { addQuality } = await inquirer.prompt([
          {
            type: "confirm",
            name: "addQuality",
            message: "✨ Adicionar linting e formatting?",
            default: true
          }
        ]);

        if (addQuality) {
          const lintKey = answers.language === "py" ? "python" : 
                         answers.language === "ts" ? "typescript" : "javascript";
          
          const lintOptions = projectConfigOptions.tools.linting[lintKey] || [];
          const formatOptions = projectConfigOptions.tools.formatting[lintKey] || [];

          console.log("\nLinters disponíveis:");
          lintOptions.forEach((linter, index) => {
            console.log(`   ${index + 1}. ${linter}`);
          });

          const { linterInput } = await inquirer.prompt([
            {
              type: "input",
              name: "linterInput",
              message: "Digite o número do linter:",
              validate: (input) => {
                const num = parseInt(input);
                if (isNaN(num) || num < 1 || num > lintOptions.length) {
                  return `Por favor, digite um número entre 1 e ${lintOptions.length}`;
                }
                return true;
              }
            }
          ]);

          const linter = lintOptions[parseInt(linterInput) - 1];
          console.log(`✓ Selecionado: ${linter}`);

          console.log("\nFormatters disponíveis:");
          formatOptions.forEach((formatter, index) => {
            console.log(`   ${index + 1}. ${formatter}`);
          });

          const { formatterInput } = await inquirer.prompt([
            {
              type: "input",
              name: "formatterInput",
              message: "Digite o número do formatter:",
              validate: (input) => {
                const num = parseInt(input);
                if (isNaN(num) || num < 1 || num > formatOptions.length) {
                  return `Por favor, digite um número entre 1 e ${formatOptions.length}`;
                }
                return true;
              }
            }
          ]);

          const formatter = formatOptions[parseInt(formatterInput) - 1];
          console.log(`✓ Selecionado: ${formatter}\n`);

          answers.features.quality = { linter, formatter };
        }

        // Containerization
        const { addDocker } = await inquirer.prompt([
          {
            type: "confirm",
            name: "addDocker",
            message: "🐳 Adicionar Docker?",
            default: false
          }
        ]);

        if (addDocker) {
          answers.features.containerization = "docker";
        }
      }

      stepIndex++;
    }
  }

  return answers;
}