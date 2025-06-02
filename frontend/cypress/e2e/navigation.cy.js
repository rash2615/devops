describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display home page content', () => {
    cy.contains('Bienvenue sur la page d\'accueil').should('be.visible');
  });

  it('should navigate to about page', () => {
    cy.contains('À propos').click();
    cy.contains('À propos de nous').should('be.visible');
  });

  it('should navigate to contact page', () => {
    cy.contains('Contact').click();
    cy.contains('Contactez-nous').should('be.visible');
  });

  it('should check API status', () => {
    cy.request('http://localhost:5000/api/status')
      .its('body')
      .should('deep.equal', { status: 'ok' });
  });
}); 