import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../src/components/Quiz';

describe('Quiz Component', () => {
    it('should render the start button', () => {
        mount(<Quiz />);
        cy.contains('Start').should('be.visible');
    });

    it('should start the quiz when the start button is clicked', () => {
        mount(<Quiz />);
        cy.contains('Start').click();
        cy.get('.question').should('exist');
    });

    it('should show the next question when an answer is selected', () => {
        mount(<Quiz />);
        cy.contains('Start').click();
        cy.get('.answer-option').first().click();
        cy.get('.question').should('exist');
    });

    it('should show the score at the end of the quiz', () => {
        mount(<Quiz />);
        cy.contains('Start').click();
        cy.get('.answer-option').each((option) => {
            cy.wrap(option).click();
        });
        cy.contains('Your Score').should('be.visible');
    });
});