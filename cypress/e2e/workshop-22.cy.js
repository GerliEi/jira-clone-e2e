/**
 * Workshop #22
 *  Task #1
 * 
 * Your task: Delete recently created issue. Create new issue for tests in beforeEach().
 * 
 * What to do exactly:
 * 1. Create new spec file for workshop 22.
 * 2. Create new test: open recently created issue (issue that was created in the beforeEach()
 *    section is always first in the backlog column) and delete it.
 * 
 * Expected result: Issue is deleted and not displayed on the Jira board.
 *  
 *  Task #2
 * 
 * Your task: start deletion process for recently created issue, but cancel it.
 * 
 * What to do exactly:
 * 1. Create new test in the same spec file: open recently created issue, click to delete it, 
 *    but cancel action in the confirmation dialogue.
 * 
 * Expected result: IIssue is not deleted, it is still displayed on the board, deletion 
 * confirmation dialogue is not visible.
 * 
 *  Task #3
 * 
 * Your task: Push your newly created spec file with all today’s tests to your repository master.
 * 
 * Expected result: Code is committed to the repository and new test run is visible 
 * in the Circle CI/CD and in Cypress cloud dashboard. 
 */

import IssueModalCreate from "../pages/IssueModal_Create";
import IssueDetailModal from "../pages/IssueModal_WS #22";
import { faker } from '@faker-js/faker';
import Common from "../pages/IssueModal_Common";
import KanbanBoardPage from "../pages/IssueModal_KanbanBoardPage";

describe('Create new DELETE_IT issue for tests in beforeEach()', () => {
  beforeEach(() => {
    cy.visit('/');
    IssueModalCreate.clickNewIssueButton();
    IssueModalCreate.editTitle("DELETE_IT");
    IssueModalCreate.clickCreateIssueButton();
  });

    // Task #1 Open recently created issue and delete it, validate Kanban board

  it('Deleting recent issue, validating', () => {
    KanbanBoardPage.openIssueWithTitle("DELETE_IT");
    IssueDetailModal.deleteIssue();
    IssueDetailModal.confirmDeletion(true);
    KanbanBoardPage.checkIfCreatedIssueIsNotVisible("DELETE_IT");
      
  });

    // Task #2 Open recently created issue and delete it, click to delete it, 
    // but cancel action, validate Kanban board

    it('Cancel of deletion of recent issue, validating', () => {
      KanbanBoardPage.openIssueWithTitle("DELETE_IT");
      IssueDetailModal.deleteIssue();
      IssueDetailModal.confirmDeletion(false);
      KanbanBoardPage.checkIfCreatedIssueIsVisible("DELETE_IT");
  });

   });