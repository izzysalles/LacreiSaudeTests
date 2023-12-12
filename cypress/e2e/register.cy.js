import { faker } from "@faker-js/faker";

describe("register page", () => {
  it("should create a new account", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.contains("button", "Criar conta").click();
    cy.get('[id="first_name"]').type(faker.person.firstName());
    cy.get('[id="last_name"]').type(faker.person.lastName());
    cy.get('[id="email"]').type(faker.internet.email());
    cy.get('[id="password1"]').type("Lacrei@123");
    cy.get('[id="password2"]').type("Lacrei@123");
    cy.get('div[class="terms-checkbox-text"]').click({ multiple: true });
    cy.contains("label", "Tenho 18 anos ou mais").click({ multiple: true });
    cy.contains("button", "Cadastrar").click();
  });

  it("should return a message error when email already exists", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.contains("button", "Criar conta").click();
    cy.get('[id="first_name"]').type(faker.person.firstName());
    cy.get('[id="last_name"]').type(faker.person.lastName());
    cy.get('[id="email"]').type("teste@teste.com");
    cy.get('[id="password1"]').type("Lacrei@123");
    cy.get('[id="password2"]').type("Lacrei@123");
    cy.get('div[class="terms-checkbox-text"]').click({ multiple: true });
    cy.contains("label", "Tenho 18 anos ou mais").click({ multiple: true });
    cy.contains("button", "Cadastrar").click();
    cy.contains(
      "Um usuário já foi registrado com este endereço de e-mail."
    ).should("be.visible");
  });

  it("should return a message indicating fields that were not filled in", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.contains("button", "Criar conta").click();
    cy.get('div[class="terms-checkbox-text"]').click({ multiple: true });
    cy.contains("label", "Tenho 18 anos ou mais").click({ multiple: true });
    cy.contains("button", "Cadastrar").click();
    cy.contains("O nome é obrigatório.").should("be.visible");
    cy.contains("O sobrenome é obrigatório.").should("be.visible");
    cy.contains("O e-mail é obrigatório.").should("be.visible");
    cy.contains("A senha é obrigatória.").should("be.visible");
  });

  it("should return a message of what the password is missing", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.contains("button", "Criar conta").click();
    cy.get('[id="first_name"]').type(faker.person.firstName());
    cy.get('[id="last_name"]').type(faker.person.lastName());
    cy.get('[id="email"]').type(faker.internet.email());
    cy.get('[id="password1"]').type("lacrei");
    cy.get('[id="password2"]').type("lacrei");
    cy.contains("A senha deve conter, no mínimo:").should("be.visible");
  });

  it("should go back to login page", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.contains("button", "Criar conta").click();
    cy.contains("button", "Voltar").click();
    cy.contains("Boas-vindas à Lacrei Saúde").should("be.visible");
  });

  it("should show an error indicating email format is wrong", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.contains("button", "Criar conta").click();
    cy.get('[id="first_name"]').type(faker.person.firstName());
    cy.get('[id="last_name"]').type(faker.person.lastName());
    cy.get('[id="email"]').type("email432423");
    cy.get('[id="password1"]').type("Lacrei@123");
    cy.get('[id="password2"]').type("Lacrei@123");
    cy.get('div[class="terms-checkbox-text"]').click({ multiple: true });
    cy.contains("label", "Tenho 18 anos ou mais").click({ multiple: true });
    cy.contains("button", "Cadastrar").click();
    cy.contains("Insira um e-mail válido.").should("be.visible");
  });

  it("should display an error message indicating check box age must be accepted", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.contains("button", "Criar conta").click();
    cy.get('[id="first_name"]').type(faker.person.firstName());
    cy.get('[id="last_name"]').type(faker.person.lastName());
    cy.get('[id="email"]').type(faker.internet.email());
    cy.get('[id="password1"]').type("Lacrei@123");
    cy.get('[id="password2"]').type("Lacrei@123");
    cy.get('div[class="terms-checkbox-text"]').click({ multiple: true });
    cy.contains("button", "Cadastrar").click();
    cy.contains("Você deve ter 18 anos ou mais.").should("be.visible");
  });
});
