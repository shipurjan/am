describe('Check if / route redirects to /map', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.url().should('include', '/map');
  });
});

describe('Check if /map route has content', () => {
  it('Visits the /map url', () => {
    cy.visit('/map');
    cy.get('ion-content').should('exist');
  });
});
