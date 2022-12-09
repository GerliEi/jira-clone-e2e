/**
 * Workshop #15
 * 1. Start creating classes for testable objects, such as "Issue"
 * 2. Move test actions into functions as we did on demo previously
 *    2.1 Update issue type, description etc.
 * 3. Use those functions in the spec file
 *
 * Expected result:
 * 1. New class with methods for updating title, description etc.
 * 2. Variables correctly stored
 *    Bonus: used random data generator library (faker.js)
 */

import IssueDetailPage from "../pages/IssueModal_WS #15,16";

/**
 * Workshop #16
 * Task #1
 * 1. Look for previously created method for validating information in the field (any field)
 *    1.1 One of them was: cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
 * 2. Define an object with expected information in the style: selector/it's value
 * 3. Update method to go over this object and assert information in the field using "for..of" loop
 *
 * Expected result:
 * 1. You will have defined object with at least priority, status and reporter selectors and their values
 * 2. Your method runs X amount of times and assert information in the field without code duplication
 *
 * Task #2
 * Most of the field in this file are using should('have.text') assertion, however, there are some which uses should('contain')
 * From the previous task expand the solution with "if" check which would allow us to assert using different should assertion but still keep all the code inside one loop without creating separated assertion
 *
 * Expected result:
 * 1. Previously created method will have more selectors included in the object (for example, assignees are added)
 */

describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'https://jira.ivorreic.com/project/board').then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
          .trigger('mouseover')
          .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
        // Workshop #16 task #1 (lühemalt sama test, mis eelnevatel ridadel)
        // const. with "contains"
    const dataForVerificationWithContains = [
      ['[data-testid="select:type"]','Story'],
      ['[data-testid="select:assignees"]', 'Baby Yoda'],
      ['[data-testid="select:assignees"]', 'Lord Gaben']
    ]
        // const. with "have.text"
    const dataForVerificationByText = [
      ['[data-testid="select:status"]','Done'],
      ['[data-testid="select:reporter"]', 'Pickle Rick'],
      ['[data-testid="select:priority"]', 'Medium']
    ]
        // asserting values with "contains" (vt täpsemalt ülevalpool)
    for (const [property, value] of dataForVerificationWithContains) {
      cy.get(property).should('contain', value)
    }
      // asserting values with "have.text"
    for (const [property, value] of dataForVerificationByText) {
      cy.get(property).should('have.text', value)
    }
      // const. with "contains" & "have text"
    const dataForVerificationTask2 = [
      ['[data-testid="select:type"]', 'Story'],
      ['[data-testid="select:assignees"]', 'Baby Yoda'],
      ['[data-testid="select:assignees"]', 'Lord Gaben'],
      ['[data-testid="select:status"]', 'Done'],
      ['[data-testid="select:reporter"]', 'Pickle Rick'],
      ['[data-testid="select:priority"]', 'Medium']
    ]
      // workshop #16 task #2 - adding if condition and 
      //combining two assertions into one cycle (=== (operands and their type aarem equal), || (OR))
    for (const [property, value] of dataForVerificationTask2) {
      if (property === '[data-testid="select:type"]' || property === '[data-testid="select:assignees"]')
        cy.get(property).should('contain', value);
      else cy.get(property).should('have.text', value);
    }
  }); 

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });

  it('Should delete an issue successfully', () => {
    getIssueDetailsModal()
      .find(`button ${'[data-testid="icon:trash"]'}`)
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains('button', 'Delete issue')
      .click();
    cy.get('[data-testid="modal:confirm"]')
        .should('not.exist');

    cy.contains('This is an issue of type: Task.').should('not.exist');

  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

      // task #3, workshop #17 Regex
      // Regex to be used: /^[A-Za-z ]*$/ - letter and space symbol 
  it('Reporter test with regEx', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:reporter"]').invoke('text')
        .should('match', /^[A-Za-z ]*$/);
    });
  });

      // task #4, workshop #17 Array.length + Array.push()
  
    const numberOfPriorities = 5;

  it(`Check, that priority fields has ${numberOfPriorities} values`, () => {
    let priorities = [];

      // add already chosen priority to the list
    cy.get('[data-testid="select:priority"]').invoke('text').then((extractedPriority) => {
      priorities.push(extractedPriority);
    })

      // click to open priority dropdown - options
    cy.get('[data-testid="select:priority"]').click();

      // get number of options from the page
    cy.get('[data-select-option-value]').then(($options) => {
      const itemCount = Cypress.$($options).length;

      // iterate through the options and
      // add text from each option to the list
    for (let index = 0; index < itemCount; index++) {
        cy.get('[data-select-option-value]')
          .eq(index).invoke('text').then((extractedPriority) => {
            priorities.push(extractedPriority);

            if (index == (itemCount - 1)) {
              cy.log("TOTAL calculated array length: " + priorities.length);
              expect(priorities.length).to.be.eq(numberOfPriorities);
            }
          });
      };
    });
  });

      // Examples, shown on the workshop. We needed to test saving all possible priorities one by one.
      // For both 1 set of test data is used:
const priorities = ["Lowest", "Low", "Medium", "High", "Highest"];
      
    // Use for loop inside of one the test, that tries to save all the possible values to priority:
  it(`We are checking saving all possible priorities`, () => {
    for (let priority1 of priorities) {
      IssueDetailPage.getIssueDetailModal().within(() => {
        IssueDetailPage.updateIssuePriorityTo(priority1);
      });
    }
  });

      // Use loop to create several tests, each one separately checking saving different value (here the test for saving value “High” will probably fail, 
      // because it is already chosen, when we open the page. Therefore there will be no such element [data-testid="select-option:High"]. 
      // To solve this we might need to update our step for updating issue priority: add there if condition, that if given priority is already chosen, then skip updating step.
  for(let priority1 of priorities){
    it(`We are checking saving priority ${priority1}`, () => {
      IssueDetailPage.getIssueDetailModal().within(() => {
        IssueDetailPage.updateIssuePriorityTo(priority1);
      });
    });
  }
});
