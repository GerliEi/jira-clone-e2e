/**
 * Workshop #14
 * This is an example file and approach for OOP in Cypress
 */
/// <reference types="Cypress" /> 
import IssueModal from "../../pages/IssueModal_WS #14";
import { faker } from '@faker-js/faker';
    // import { faker } from '@faker-js/faker/locale/de';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET','**/currentUser').as('currentUserApiRequest')
    cy.url().should('eq', 'https://jira.ivorreic.com/project/board').then((url) => {
      cy.wait('@currentUserApiRequest')
      cy.visit(url + '/settings?modal-issue-create=true');
    });
  });

  const issueDetails = {
    title: "TEST_TITLE", // const title = faker.name.fullName() 
    type: "Bug",
    description: "TEST_DESCRIPTION", // const description = faker.lorem.paragraph() 
    assignee: "Lord Gaben",
  };

  const EXPECTED_AMOUNT_OF_ISSUES = '5';

  it('Should create issue and validate it successfully', () => {
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
  });
});
