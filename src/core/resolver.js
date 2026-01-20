import { projectConfigOptions } from "../stacks/index.js";

export function resolveConfig(config) {
  const errors = [];
  const warnings = [];

  // ============ Validar Language ============
  const validLanguages = Object.keys(projectConfigOptions.languages);
  if (!validLanguages.includes(config.language)) {
    errors.push(`Linguagem inválida: ${config.language}. Opções: ${validLanguages.join(', ')}`);
  }

  // ============ Validar Domain ============
  const validDomains = Object.keys(projectConfigOptions.domains);
  if (!validDomains.includes(config.domain)) {
    errors.push(`Domínio inválido: ${config.domain}. Opções: ${validDomains.join(', ')}`);
  }

  const domainConfig = projectConfigOptions.domains[config.domain];

  // ============ Validar Architecture ============
  if (domainConfig && config.architecture) {
    const validArchitectures = domainConfig.architectures || [];
    if (!validArchitectures.includes(config.architecture)) {
      errors.push(
        `Arquitetura "${config.architecture}" inválida para domínio "${config.domain}". ` +
        `Opções: ${validArchitectures.join(', ')}`
      );
    }
  } else if (!config.architecture) {
    warnings.push("Nenhuma arquitetura especificada. Usando padrão.");
  }

  // ============ Validar Framework ============
  if (domainConfig && config.framework && config.framework !== "none") {
    let validFrameworks = [];

    // Verificar se frameworks é objeto (separado por linguagem) ou array
    if (domainConfig.frameworks && typeof domainConfig.frameworks === 'object') {
      if (Array.isArray(domainConfig.frameworks[config.language])) {
        validFrameworks = domainConfig.frameworks[config.language];
      } else {
        // Combinar todos os frameworks se não houver separação por linguagem
        validFrameworks = Object.values(domainConfig.frameworks)
          .flat()
          .filter((v, i, a) => a.indexOf(v) === i); // Remove duplicatas
      }
    } else if (Array.isArray(domainConfig.frameworks)) {
      validFrameworks = domainConfig.frameworks;
    }

    if (validFrameworks.length > 0 && !validFrameworks.includes(config.framework)) {
      errors.push(
        `Framework "${config.framework}" inválido para domínio "${config.domain}" ` +
        `com linguagem "${config.language}". Opções: ${validFrameworks.join(', ')}`
      );
    }
  } else if (!config.framework || config.framework === "none") {
    warnings.push("Nenhum framework especificado. Projeto será configurado sem framework.");
  }

  // ============ Validar Features (Opcional) ============
  if (config.features) {
    // Validar Authentication
    if (config.features.authentication) {
      const validAuthStrategies = projectConfigOptions.features.authentication?.strategies || [];
      if (!validAuthStrategies.includes(config.features.authentication.strategy)) {
        warnings.push(
          `Estratégia de autenticação "${config.features.authentication.strategy}" ` +
          `pode não ser suportada. Opções: ${validAuthStrategies.join(', ')}`
        );
      }
    }

    // Validar Database
    if (config.features.database) {
      // Validar SQL Database
      if (config.features.database.sql) {
        const validSqlDbs = projectConfigOptions.features.database?.sql?.databases || [];
        if (!validSqlDbs.includes(config.features.database.sql.type)) {
          warnings.push(
            `Database SQL "${config.features.database.sql.type}" pode não ser suportado. ` +
            `Opções: ${validSqlDbs.join(', ')}`
          );
        }

        // Validar ORM
        const ormKey = config.language === "py" ? "python" : "typescript";
        const validOrms = projectConfigOptions.features.database?.sql?.orms?.[ormKey] || [];
        if (config.features.database.sql.orm && !validOrms.includes(config.features.database.sql.orm)) {
          warnings.push(
            `ORM "${config.features.database.sql.orm}" pode não ser compatível com ${config.language}. ` +
            `Opções: ${validOrms.join(', ')}`
          );
        }
      }

      // Validar NoSQL Database
      if (config.features.database.nosql) {
        const validNosqlDbs = projectConfigOptions.features.database?.nosql?.databases || [];
        if (!validNosqlDbs.includes(config.features.database.nosql.type)) {
          warnings.push(
            `Database NoSQL "${config.features.database.nosql.type}" pode não ser suportado. ` +
            `Opções: ${validNosqlDbs.join(', ')}`
          );
        }
      }
    }

    // Validar Styling (apenas para frontend/fullstack)
    if (config.features.styling) {
      if (config.domain !== "frontend" && config.domain !== "fullstack") {
        warnings.push(
          `Framework de CSS "${config.features.styling}" especificado mas domínio é "${config.domain}". ` +
          `Styling é relevante apenas para frontend/fullstack.`
        );
      } else {
        const validStylingOptions = projectConfigOptions.features.styling?.cssFrameworks || [];
        if (!validStylingOptions.includes(config.features.styling)) {
          warnings.push(
            `Framework de CSS "${config.features.styling}" pode não ser suportado. ` +
            `Opções incluem: ${validStylingOptions.slice(0, 5).join(', ')}...`
          );
        }
      }
    }

    // Validar Testing
    if (config.features.testing) {
      const testKey = config.language === "py" ? "python" : 
                     config.language === "ts" ? "typescript" : "javascript";
      const validUnitTests = projectConfigOptions.tools.testing?.[testKey]?.unitTesting || [];
      
      if (config.features.testing.unitTest && !validUnitTests.includes(config.features.testing.unitTest)) {
        warnings.push(
          `Framework de testes "${config.features.testing.unitTest}" pode não ser compatível com ${config.language}. ` +
          `Opções: ${validUnitTests.join(', ')}`
        );
      }
    }

    // Validar Quality (Linting & Formatting)
    if (config.features.quality) {
      const qualityKey = config.language === "py" ? "python" : 
                        config.language === "ts" ? "typescript" : "javascript";
      
      const validLinters = projectConfigOptions.tools.linting?.[qualityKey] || [];
      const validFormatters = projectConfigOptions.tools.formatting?.[qualityKey] || [];

      if (config.features.quality.linter && !validLinters.includes(config.features.quality.linter)) {
        warnings.push(
          `Linter "${config.features.quality.linter}" pode não ser compatível com ${config.language}. ` +
          `Opções: ${validLinters.join(', ')}`
        );
      }

      if (config.features.quality.formatter && !validFormatters.includes(config.features.quality.formatter)) {
        warnings.push(
          `Formatter "${config.features.quality.formatter}" pode não ser compatível com ${config.language}. ` +
          `Opções: ${validFormatters.join(', ')}`
        );
      }
    }

    // Validar Containerization
    if (config.features.containerization) {
      const validContainerTools = projectConfigOptions.infrastructure.containerization?.tools || [];
      if (!validContainerTools.includes(config.features.containerization)) {
        warnings.push(
          `Ferramenta de containerização "${config.features.containerization}" pode não ser suportada. ` +
          `Opções: ${validContainerTools.join(', ')}`
        );
      }
    }
  }

  // ============ Validar Project Name ============
  if (!config.projectName || config.projectName.trim() === "") {
    errors.push("Nome do projeto não pode ser vazio");
  }

  // Verificar se há caracteres inválidos no nome do projeto
  const invalidChars = /[<>:"/\\|?*\s]/g;
  if (invalidChars.test(config.projectName)) {
    errors.push(
      "Nome do projeto contém caracteres inválidos. Use apenas letras, números, hífens e underscores."
    );
  }

  // ============ Exibir Erros e Warnings ============
  if (errors.length > 0) {
    console.error("\n❌ Erros de validação:");
    errors.forEach(err => console.error(`  - ${err}`));
    throw new Error("Configuração inválida. Corrija os erros acima.");
  }

  if (warnings.length > 0) {
    console.warn("\n⚠️  Avisos:");
    warnings.forEach(warn => console.warn(`  - ${warn}`));
  }

  // ============ Enriquecer Config com Defaults ============
  const enrichedConfig = {
    ...config,
    // Adicionar informações extras da linguagem
    languageInfo: projectConfigOptions.languages[config.language],
    
    // Adicionar patterns se disponível
    patterns: domainConfig?.patterns || [],
    
    // Adicionar API style se for backend
    apiStyle: config.domain === "backend" ? (config.apiStyle || "REST") : undefined,
    
    // Adicionar rendering strategy se for frontend/fullstack
    renderingStrategy: (config.domain === "frontend" || config.domain === "fullstack") 
      ? (config.renderingStrategy || "CSR") 
      : undefined,
    
    // Package manager baseado na linguagem
    packageManager: config.language === "py" 
      ? (config.packageManager || "pip")
      : (config.packageManager || "npm"),
    
    // Features com defaults
    features: {
      authentication: config.features?.authentication || null,
      database: config.features?.database || null,
      styling: config.features?.styling || null,
      testing: config.features?.testing || null,
      quality: config.features?.quality || null,
      containerization: config.features?.containerization || null,
      ...config.features
    }
  };

  console.log("\n✅ Configuração validada com sucesso!");
  console.log("\n📋 Resumo da configuração:");
  console.log(`  • Linguagem: ${enrichedConfig.language}`);
  console.log(`  • Projeto: ${enrichedConfig.projectName}`);
  console.log(`  • Domínio: ${enrichedConfig.domain}`);
  console.log(`  • Arquitetura: ${enrichedConfig.architecture}`);
  console.log(`  • Framework: ${enrichedConfig.framework}`);
  
  if (enrichedConfig.features.authentication) {
    console.log(`  • Auth: ${enrichedConfig.features.authentication.strategy}`);
  }
  if (enrichedConfig.features.database) {
    if (enrichedConfig.features.database.sql) {
      console.log(`  • Database SQL: ${enrichedConfig.features.database.sql.type} + ${enrichedConfig.features.database.sql.orm}`);
    }
    if (enrichedConfig.features.database.nosql) {
      console.log(`  • Database NoSQL: ${enrichedConfig.features.database.nosql.type}`);
    }
  }
  if (enrichedConfig.features.styling) {
    console.log(`  • Styling: ${enrichedConfig.features.styling}`);
  }
  if (enrichedConfig.features.testing) {
    console.log(`  • Testing: ${enrichedConfig.features.testing.unitTest}`);
  }
  if (enrichedConfig.features.quality) {
    console.log(`  • Quality: ${enrichedConfig.features.quality.linter} + ${enrichedConfig.features.quality.formatter}`);
  }
  if (enrichedConfig.features.containerization) {
    console.log(`  • Container: ${enrichedConfig.features.containerization}`);
  }

  return enrichedConfig;
}