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
      {
        question: "What does JS stand for?",
        answers: [
            { text: "JavaSource", isCorrect: false },
            { text: "JustScript", isCorrect: false },
            { text: "JavaScript", isCorrect: true },
        ],
      },
      {
        question: "Which company developed the React framework?",
        answers: [
            { text: "Google", "isCorrect": false },
            { text: "Facebook", "isCorrect": true },
            { text: "Microsoft", "isCorrect": false },
        ],
      },
      {
        question: "What does API stand for?",
        answers: [
            { text: "Application Programming Interface", "isCorrect": true },
            { text: "Advanced Programming Integration", "isCorrect": false },
            { text: "Application Process Integration", "isCorrect": false },
        ],
      },
      {
        question: "Which of these is a NoSQL database?",
        answers: [
            { text: "MongoDB", "isCorrect": true },
            { text: "MySQL", "isCorrect": false },
            { text: "PostgreSQL", "isCorrect": false },
        ],
      },
      {
        question: "What is the purpose of version control systems like Git?",
        answers: [
            { text: "To create graphics", "isCorrect": false },
            { text: "To manage and track changes in code", "isCorrect": true },
            { text: "To debug applications", "isCorrect": false },
        ],
      },
      {
        question: "Which of these is a front-end framework?",
        answers: [
            { text: "Laravel", "isCorrect": false },
            { text: "Django", "isCorrect": false },
            { text: "Angular", "isCorrect": true },
        ],
      },
      {
        question: "What is Cypress primarily used for?",
        answers: [
            { text: "End-to-end testing", "isCorrect": true },
            { text: "Code compilation", "isCorrect": false },
            { text: "Server deployment", "isCorrect": false },
        ],
      },
      {
        question: "What type of programming language is Python?",
        answers: [
            { text: "Compiled", "isCorrect": false },
            { text: "Interpreted", "isCorrect": true },
            { text: "Machine Language", "isCorrect": false },
        ],
      },
    ];
  
    beforeEach(() => {
      cy.intercept('GET', '/api/questions/random', (req) => {
        req.reply((res) => {
          res.headers['cache-control'] = 'no-cache';
          res.send({
            statusCode: 200,
            body: mockQuestions,
          });
        });
      }).as('getQuestions');
    });
  
    it('should navigate through all questions and complete the quiz', () => {
      cy.visit('/');
  
      cy.contains('Start Quiz').should('be.visible').click();
  
      cy.wait('@getQuestions').then((interception) => {
        console.log('Intercepted Response:', interception.response.body);
      });
  
      mockQuestions.forEach((question, index) => {
        cy.contains(question.question, { timeout: 50000 }).should('be.visible')

        cy.contains(question.question).should('be.visible');
  
        const correctAnswer = question.answers.find((answer) => answer.isCorrect).text;
        cy.contains(correctAnswer).should('be.visible').click();
  
        if (index < mockQuestions.length - 1) {
          cy.contains(mockQuestions[index + 1].question).should('be.visible');
        }
      });
  
      cy.contains('Quiz Completed').should('be.visible');
      cy.contains(`Your score: ${mockQuestions.length}/${mockQuestions.length}`).should('be.visible');
    });
  });  