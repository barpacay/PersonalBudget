describe('My First Cypress Test', () => {
  it('Visits the home page', () => {
    cy.visit('/');
    cy.contains('Login or Signup');
  });
});
