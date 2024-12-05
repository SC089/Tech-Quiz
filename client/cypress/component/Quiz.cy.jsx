import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../src/components/Quiz'; 
import '../../src/App.css';

describe('Quiz Component', () => {
  const mockQuestions = [
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Markup Language", isCorrect: true },
        { text: "Hot Mail", isCorrect: false },
        { text: "How To Make Lasagna", isCorrect: false }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", isCorrect: true },
        { text: "Creative Style System", isCorrect: false },
        { text: "Colorful Style Sheets", isCorrect: false }
      ]
    }
  ];

  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: mockQuestions,
    }).as('getQuestions');
  });

  it('renders and interacts with the Quiz component', () => {
    mount(<Quiz />);

    // Start the quiz
    cy.contains('Start Quiz').should('be.visible').click();

    // Wait for the API and log response
    cy.wait('@getQuestions').then((interception) => {
      console.log('Intercepted questions:', interception.response.body);
    });

    // Verify that the first question appears
    cy.contains(mockQuestions[0].question).should('be.visible');
  });
});
