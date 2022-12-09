/**
 * Workshop #20
 *  Task #1
 * 
 * Your task: observe Jira app and try to add new issue (click on “Create issue” button on issue 
 * creation page) without any fields changed. Locate mandatory fields and create new spec file
 * and test for that case.
 * 
 * What to do exactly:
 * 1. Create new issue when no information is added to mandatory fields
 * 2. Validate system gives appropriate error message (mandatory fields are in error state)
 * 
 * Expected result: Issue is not created, system showed error message and fields are in error state.

 *  Task #2
 * 
 * Your task: continue within the same spec file
 * 
 * What to do exactly:
 * 1. Choose issue type “Task”
 * 2. Fill all needed mandatory fields with a help of  random data plugin
 * 3. Create new issue. 
 * 
 * Expected result: Issue is created, issue is visible on the board. Validated issue information is correct (on the board).
 * Additional: validated that issue icon is Task icon.
 * 
 *  Task #3
 * 
 * Your task: continue within the same spec file
 * 
 * What to do exactly:
 * 1. Create issue with type “Bug”, priority “Highest”, reporter “Pickle Rick”
 * 2. All the rest mandatory data should be filled in with random data plugin.
 * 
 * Expected result: Issue is created, issue is visible on the board. Validated issue information is correct (on the board).
 * Additional: validated that issue icon is Bug icon. 
 * 
 *  Task #4
 * 
 * Your task: Push your newly created spec file with all today’s tests to your repository master. 
 * Use corresponding git commands.
 * 
 * Expected result: Code is committed to the repository and new test run is visible 
 * in the Circle CI/CD and in Cypress cloud dashboard. 
 */

import IssueModalCreate from "../pages/IssueModal_Create";
import { faker } from '@faker-js/faker';
import Common from "../pages/IssueModal_Common";
import KanbanBoardPage from "../pages/IssueModal_KanbanBoardPage";

describe('Create new issue for tests in beforeEach()', () => {
  beforeEach(() => {
    cy.visit('/');
  });

    // Task #1 Create new issue without filling mandatory fields, validate error message

  const errorMessage = 'This field is required';

  it('Creating new issue, mandatory fields missing', () => {
      IssueModalCreate.clickNewIssueButton();
      IssueModalCreate.clickCreateIssueButtonWithError();
      IssueModalCreate.checkTitleFieldIsInErrorState();
      Common.ensureErrorMessageIsVisible(errorMessage);
  });

    // Task #2 Create new issue with type “Task” filling mandatory fields, validate Kanban board

  const dataTask2 = {
      type: "Task",
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph()
  }

  it('Creating new issue, type "Task", validating Kanban Board', () => {
      IssueModalCreate.clickNewIssueButton();
      IssueModalCreate.selectIssueType(dataTask2.type);
      IssueModalCreate.editTitle(dataTask2.title);
      IssueModalCreate.writeDescription(dataTask2.description);
      IssueModalCreate.clickCreateIssueButton();

      KanbanBoardPage.checkIfCreatedIssueIsVisible(dataTask2.title);
      KanbanBoardPage.checkIfIssueIsFirstOnTheKanbanBoard(dataTask2.title);
      KanbanBoardPage.checkIfFirstIssueHasType(dataTask2.type);
  });

    // Task #3 Create new issue with type “Bug,” priority “Highest,” reporter “Pickle Rick,” validate Kanban board

    const dataTask3 = {
      type: "Bug",
      priority: "Highest",
      priority2: "arrow-up",
      reporter: "Pickle Rick",
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph()
  }

  it('Creating new issue, type “Bug,” priority “Highest,” reporter “Pickle Rick,” validating Kanban Board', () => {
      IssueModalCreate.clickNewIssueButton();
      IssueModalCreate.selectIssueType(dataTask3.type);
      IssueModalCreate.selectPriority(dataTask3.priority);
      IssueModalCreate.selectReporter(dataTask3.reporter);
      IssueModalCreate.editTitle(dataTask3.title);
      IssueModalCreate.writeDescription(dataTask3.description);
      IssueModalCreate.selectIssueType(dataTask3.type);
      IssueModalCreate.clickCreateIssueButton();

      KanbanBoardPage.checkIfCreatedIssueIsVisible(dataTask3.title);
      KanbanBoardPage.checkIfIssueIsFirstOnTheKanbanBoard(dataTask3.title);
      KanbanBoardPage.checkIfFirstIssueHasType(dataTask3.type);
      KanbanBoardPage.checkIfFirstIssueHasPriority(dataTask3.priority2);
  });

  it('Select and open first issue on backlog column', () => {
    cy.get('[data-testid="board-list:backlog"] p').first().click();
  });

   });