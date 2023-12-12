describe("login page", () => {
    it("should login", () => {
        cy.visit("https://paciente.lacreisaude.com.br/");
        cy.get('[id="email"]').type("bellssalles@gmail.com");
        cy.get('[id="password"]').type("Teste@123");
        cy.contains("button", "Entrar").click();
        cy.url().should(
            "be.equal",
            "https://paciente.lacreisaude.com.br/verificar-email"
          );
      });

  it("should return password error", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.get('[id="email"]').type("teste@teste.com");
    cy.get('[id="password"]').type("teste@123");
    cy.contains("button", "Entrar").click();
    cy.contains(
      "Sua senha e/ou conta está incorreta. Se tiver esquecido a senha, clique em “Esqueci minha senha”"
    ).should("be.visible");
  });

  it("should return email error", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.get('[id="email"]').type("testeteste.com");
    cy.get('[id="password"]').type("teste@123");
    cy.contains("button", "Entrar").click();
    cy.contains(
      "Por favor, utilize um formato de e-mail válido. Por exemplo: email@dominio.com.br"
    ).should("be.visible");
  });

  it("should redirect user to password recovery page", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.contains("a", "Esqueci minha senha").click();
    cy.url().should(
      "be.equal",
      "https://paciente.lacreisaude.com.br/redefinicao-de-senha"
    );
  });

  it("should redirect user to register page", () => {
    cy.visit("https://paciente.lacreisaude.com.br/");
    cy.contains("button", "Criar conta").click();
    cy.url().should("be.equal", "https://paciente.lacreisaude.com.br/cadastro");
  });
});
