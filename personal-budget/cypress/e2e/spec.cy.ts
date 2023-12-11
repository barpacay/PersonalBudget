describe('E2ETest', () => {
  it('Visits the home page', () => {
    cy.visit('/');
    cy.contains('Login or Signup');
  });


  it('Performs visual regression test', () => {
    cy.eyesOpen({
    appName: 'Budget',
    testName: 'Visual Regression Test',
    browser: { width: 800, height: 600 },
});

  cy.eyesCheckWindow('Home Page');
  cy.eyesClose();
  });
});
