/// <reference types="Cypress" />

describe("Automation Practice", () => {
  it("deve poder acessar a página e realizar uma busca", () => {
    cy.visit("http://automationpractice.com/");
    cy.get("#search_query_top").type("Dress");
    cy.get("#search_query_top").type("{enter}");
  });

  it("deve não poder realizar o sign in devido a senha e usuário incorreto", () => {
    cy.visit(
      "http://automationpractice.com/index.php?controller=authentication&back=my-account"
    );
    cy.get("#email").type("test@test.com");
    cy.get("#passwd").type("test123");
    cy.get("#SubmitLogin").click();
    cy.get("#center_column > :nth-child(2) > p").should(
      "contain",
      "There is 1 error"
    );
  });

  it("deve poder cadastrar um novo usuário", () => {
    cy.visit(
      "http://automationpractice.com/index.php?controller=authentication&back=my-account"
    );
    let email = generateRandomEmail();
    let password = "test123";

    cy.fixture("user.json").then((user) => {
      let userTest = {
        name: user.name,
        lastname: user.lastname,
      };

      array.push({ email: email, password: password });
      cy.get("#email_create").type(email);
      cy.get("#SubmitCreate").click();
      cy.get("#id_gender1").click();
      cy.get("#customer_firstname").type(userTest.name);
      cy.get("#customer_lastname").type(userTest.lastname);
      cy.get("#passwd").type(password);
      cy.get("#days").select("1");
      cy.get("#months").select("January");
      cy.get("#years").select("1990");
      cy.get("#company").type("Teste");
      cy.get("#address1").type("Teste");
      cy.get("#address2").type("Teste");
      cy.get("#city").type("Teste");
      cy.get("#id_state").select("Alaska");
      cy.get("#postcode").type("12345");
      cy.get("#other").type("Teste");
      cy.get("#phone").type("123456789");
      cy.get("#phone_mobile").type("123456789");
      cy.get("#alias").type("Teste");
      cy.get("#submitAccount").click();
      cy.get(".info-account").should(
        "contain",
        "Welcome to your account. Here you can manage all of your personal information and orders."
      );
    });
  });
});

var array = [];

function generateRandomPassword() {
  const randomPassword = Math.random().toString(36).substring(7);
  return randomPassword;
}

function generateRandomEmail() {
  const randomEmail = Math.random().toString(36).substring(7);
  return `${randomEmail}@test.com`;
}
