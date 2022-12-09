/**
 * Workshop #17
 * We are locating issues here based on one enter ('multiple assignees')
 * Think and create a loop using "forEach", which would allow us to test multiple enters without creating a new instance of test for that
 * Use object with multiple rows for solving this task.
 *
 * Expected result:
 * 1. You will have object with multiple entries
 * 2. You are running test X amount of times without creating new instance of test (using "it")
 */

describe('Issue filtering', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should filter issues by title', () => {
    getSearchInput().debounced('type', 'multiple assignee');
    cy.get('[data-testid="list-issue"]').should('have.length', '1');
  });

  /**
   * New tests can be created here for practice
   * 1. Filter by avatar
   * 2. Filter by "Only My Issues" button
   * 3. Filter by "Recently Updated" button
   */

  const getSearchInput = () => cy.get('[data-testid="board-filters"]').find('input');
});

  // In the file issue-filtering-5.cy.js we are locating issues based on only one search 
  // criteria ('multiple assignees') and verify, that we receive only 1 result. 
  // Think and create for .. of loop, which would allow us to test multiple entries howithout creating a new instance of test for that. Use object with multiple rows for solving this task.
  const issuesToValidate = [
    {
      issueName: 'multiple assignees',
      expectedAmountOfIssues: '1',
    },
    {
      issueName: 'you can',
      expectedAmountOfIssues: '2',
    },
    {
      issueName: 'an issue',
      expectedAmountOfIssues: '3',
    }
  ];

      // workshop #17 task #1
      // Think and create for .. of loop, which would allow us to test multiple entries
  for (let issue of issuesToValidate) {
    it(`Should filter issues by title: ${issue.issueName}`, () => {
      getSearchInput().debounced('type', issue.issueName);
      cy.get('[data-testid="list-issue"]')
        .should('have.length', issue.expectedAmountOfIssues);
    });
  };

      // workshop #17 task #2 
      // Try to create the same solution as in task 1, but usin forEach function
  it.only(`Should filter issues by title: `, () => {
    issuesToValidate.forEach(issue => {
      getSearchInput().clear().debounced('type', issue.issueName);
      cy.get('[data-testid="list-issue"]')
        .should('have.length', issue.expectedAmountOfIssues);
    });
   });