describe('Tech Quiz End-to-End Tests', () => {
    const mockQuestions = [
      {
        question: "What does HTML stand for?",
        answers: [
          { text: "Hyper Text Markup Language", isCorrect: true },
          { text: "Hot Mail", isCorrect: false },
          { text: "How To Make Lasagna", isCorrect: false },
        ],
      },
      {
        question: "What does CSS stand for?",
        answers: [
          { text: "Cascading Style Sheets", isCorrect: true },
          { text: "Creative Style System", isCorrect: false },
          { text: "Colorful Style Sheets", isCorrect: false },
        ],
      },
    ];
  
    beforeEach(() => {
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: mockQuestions,
      }).as('getQuestions');
    });
  
    it('should navigate through all questions and complete the quiz', () => {
      cy.visit('/');
  
      // Start the quiz
      cy.contains('Start Quiz').should('be.visible').click();
  
      // Wait for API and log response
      cy.wait('@getQuestions').then((interception) => {
        console.log('Intercepted questions:', interception.response.body);
      });
  
      // Debug DOM after quiz starts
      cy.get('body').then(($body) => {
        console.log('DOM after clicking Start Quiz:', $body.html());
      });
  
      // Answer each question
      mockQuestions.forEach((question, index) => {
        cy.log(`Answering question ${index + 1}: ${question.question}`);
  
        // Wait for the question to render
        cy.contains(question.question, { timeout: 10000 }).should('be.visible');
  
        // Select the correct answer
        const correctAnswer = question.answers.find((answer) => answer.isCorrect).text;
        cy.contains(correctAnswer, { timeout: 10000 }).click();
  
        // Wait for next question if not the last
        if (index < mockQuestions.length - 1) {
          cy.contains(mockQuestions[index + 1].question, { timeout: 10000 }).should('be.visible');
        }
      });
  
      // Verify quiz completion
      cy.contains('Quiz Completed', { timeout: 10000 }).should('be.visible');
      cy.contains(`Your score: ${mockQuestions.length}/${mockQuestions.length}`).should('be.visible');
    });
  
    it('should allow restarting the quiz after completion', () => {
      cy.visit('/');
  
      // Start the quiz
      cy.contains('Start Quiz').should('be.visible').click();
  
      // Wait for API and answer all questions
      cy.wait('@getQuestions');
      mockQuestions.forEach((question) => {
        const correctAnswer = question.answers.find((answer) => answer.isCorrect).text;
        cy.contains(correctAnswer).click();
      });
  
      // Verify quiz completion
      cy.contains('Quiz Completed').should('be.visible');
      cy.contains('Take New Quiz').should('be.visible').click();
  
      // Restart the quiz
      cy.contains('Start Quiz').should('be.visible');
    });
  });