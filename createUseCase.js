const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const indexPageCode = (
  name,
  repository
) => `import validator from "@middy/validator"; // apenas se usar validação de schema
import schemaCreate from "../../schemas/schemaCreate"; // apenas se usar validação de schema

import ${firstUpper(repository)} from "../../data/repositories/${firstUpper(
  repository
)}";
import commonMiddleware from "../../middlewares/commonMiddleware";
import ${firstUpper(name)}Controller from "./${firstUpper(name)}Controller";
import ${firstUpper(name)}Service from "./${firstUpper(name)}Service";

const ${firstLower(repository)} = new ${firstUpper(repository)}();
const ${firstLower(name)}Service = new ${firstUpper(name)}Service(${firstLower(
  repository
)});
const ${firstLower(name)}Controller = new ${firstUpper(
  name
)}Controller(${firstLower(name)}Service);

export const handler = commonMiddleware(
  ${firstLower(name)}Controller.handle.bind(${firstLower(name)}Controller)
).use(validator({ inputSchema: schemaCreate }));
`;

const controllerPageCode = (name) => `export default class ${firstUpper(
  name
)}Controller {
  constructor(${firstLower(name)}Service) {
    this.${firstLower(name)}Service = ${firstLower(name)}Service;
  }

  async handle(event, context) {
    /**
     * This method context.callbackWaitsForEmptyEventLoop = false;
     * Remove await response for Sequelize in loopback.
     * Do not remove.
     */
    context.callbackWaitsForEmptyEventLoop = false;

    try {
     const data = await this.${firstLower(name)}Service.execute();

      return {
        statusCode: 200,
        body: JSON.stringify({
          data,
          message: "Success",
          error: {},
        }),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
`;

const servicePageCode = (name, repository) => `
export default class ${firstUpper(name)}Service {
  constructor(${firstLower(repository)}) {
    /**
     * @type {import("../../data/repositories/${firstUpper(
       repository
     )}").default}
    */
    this.${firstLower(repository)} = ${firstLower(repository)};
  }

  async execute() {
  
    return {};
  }
}
`;
const postgresRepositoryCode = (name) => `import getModels from "../db";
import { PostgresRepository } from "@gestao-quatro-ponto-zero/g4-edu-models-v1.1";

export default class ${firstUpper(name)} extends PostgresRepository {
  #models;
  constructor() {
    super();
    this.#models = getModels;
  }

}
`;
const openSearchRepositoryCode = (
  name
) => `import connectToOpenSearch from "../openSearchDb";
import { v4 as uuid } from "uuid";
export default class ${firstUpper(name)} {
  #connection;
  constructor() {
    this.#connection = connectToOpenSearch;
  }
}

`;

//                                                    Start Questions
main();
function main() {
  readline.question(
    "\nWhat do you want to create?\n\n1-UseCase\n2-Repository\n\ninsert your answer: ",
    (create) => {
      switch (create) {
        case "1":
          createUseCaseQuestions();
          break;
        case "2":
          createRepositoryQuestions();
          break;

        default:
          console.log(`Type "${create}" is not valid. Try Again.\n\n`);
          main();
          break;
      }
    }
  );
}
function firstUpper(text) {
  return text[0].toUpperCase() + text.slice(1);
}
function firstLower(text) {
  return text[0].toLowerCase() + text.slice(1);
}
function createRepositoryQuestions() {
  readline.question(
    "\nWhat do you want to create?\n\n1-Postgres Repository\n2-OpenSearch Repository\n\ninsert your answer: ",
    (type) => {
      switch (type) {
        case "1":
          createPostgresRepository();
          break;
        case "2":
          createOpenSearchRepository();
          break;
        default:
          console.log(`Type "${type}" is not valid. Try Again.\n\n`);
          createRepositoryQuestions();
          break;
      }
    }
  );
}
function createPostgresRepository() {
  readline.question(
    "\nWhat is the repository name?\n\ninsert your answer: ",
    (name) => {
      fs.writeFileSync(
        `./src/data/repositories/${firstUpper(name)}.js`,
        postgresRepositoryCode(name)
      );
      readline.close();
    }
  );
}
function createOpenSearchRepository() {
  readline.question(
    "\nWhat is the repository name?\n\ninsert your answer: ",
    (name) => {
      fs.writeFileSync(
        `./src/data/repositories/${firstUpper(name)}.js`,
        openSearchRepositoryCode(name)
      );
      readline.close();
    }
  );
}
function createUseCaseQuestions() {
  readline.question(
    "\nWhat is the useCase name?\n\ninsert your answer: ",
    (name) => {
      readline.question(
        "\nWhat is the useCase`s main repository name?\n\ninsert your answer: ",
        (repository) => {
          createUseCase(name, repository);
          readline.close();
        }
      );
    }
  );
}
function createUseCase(name, repository) {
  fs.mkdirSync(`./src/useCases/${firstUpper(name)}`);
  fs.writeFileSync(
    `./src/useCases/${firstUpper(name)}/index.js`,
    indexPageCode(name, repository)
  );
  fs.writeFileSync(
    `./src/useCases/${firstUpper(name)}/${firstUpper(name)}Controller.js`,
    controllerPageCode(name)
  );
  fs.writeFileSync(
    `./src/useCases/${firstUpper(name)}/${firstUpper(name)}Service.js`,
    servicePageCode(name, repository)
  );
}