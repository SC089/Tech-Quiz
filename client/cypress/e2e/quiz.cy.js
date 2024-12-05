describe('Tech Quiz End-to-End Tests', () => {
    it('should start the quiz and navigate through all questions', () => {
      cy.visit('/');
      cy.contains('Start').click();
  
      cy.get('.question').should('exist');
      cy.get('.answer-option').each((option) => {
        cy.wrap(option).click();
      });
  
      cy.contains('Your Score').should('be.visible');
      cy.contains('Start a New Quiz').should('be.visible');
    });
  
    it('should allow starting a new quiz after completion', () => {
      cy.visit('/');
      cy.contains('Start').click();
  
      cy.get('.answer-option').each((option) => {
        cy.wrap(option).click();
      });
  
      // Start a new quiz
      cy.contains('Start a New Quiz').click();
      cy.contains('Start').should('be.visible');
    });
  });
  