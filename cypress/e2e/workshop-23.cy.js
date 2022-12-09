/**
 * Workshop #23
 *   
 * What to do: Automate more functionality in Jira clone according to given below time tracking test cases.
 * 
 * You can create new issue for testing in the beforeEach step or use already existing issues from
 * the board. If needed, you can combine several test cases into one “it” block (for example, 
 * create, edit and delete estimation steps can be all in one test).
 *  
 * At the end don’t forget to commit your tests to repository, using git workflow:
 * git add . 
 * git commit -m “Workshop 23 or some other comment”
 * git push
 *  
 */

import IssueModalCreate from "../pages/IssueModal_Create";
import IssueDetailModal from "../pages/IssueModal_WS #22";
import { faker } from '@faker-js/faker';
import Common from "../pages/IssueModal_Common";
import KanbanBoardPage from "../pages/IssueModal_KanbanBoardPage";

describe('Create new FOR_TEST issue for tests in beforeEach()', () => {
  beforeEach(() => {
    cy.visit('/');
    IssueModalCreate.clickNewIssueButton();
    IssueModalCreate.editTitle("FOR_TEST");
    IssueModalCreate.clickCreateIssueButton();
  });

    // Task #1 User can add estimation to recently created issue, 
    //         User updates estimation, that was previously added to issue
    //         User removes estimation, that was previously added to issue

  it('Task 1: add, update and remove estimation', () => {
    const estimation_1 = "5";
    const estimation_2 = "7";

    KanbanBoardPage.openIssueWithTitle("FOR_TEST");
    
  //add estimation
    IssueDetailModal.editEstimation(estimation_1);
    IssueDetailModal.verifyEstimationIsVisibleInTimeTracking(estimation_1);

  //edit estimation
    IssueDetailModal.editEstimation(estimation_2);
    IssueDetailModal.verifyEstimationIsVisibleInTimeTracking(estimation_2);

  //remove estimation
    IssueDetailModal.removeEstimation();
    IssueDetailModal.verifyEstimationIsNotVisibleInTimeTracking();
      
  });

    // Task #2 User logs spent time to recently created issue 
    //         User removes logged spent time from recently created issue

  it('Task 2: add, edit and remove tracked time', () => {
    const tracked_1 = "3";
    const tracked_2 = "4";
  
    KanbanBoardPage.openIssueWithTitle("FOR_TEST");
    IssueDetailModal.verifyTrackedTimeIsVisible("No time logged");

  //add tracked time
    IssueDetailModal.editTrackingTime(tracked_1);
    IssueDetailModal.verifyTrackedTimeIsVisible(tracked_1);

  //edit tracked time
    IssueDetailModal.editTrackingTime(tracked_2);
    IssueDetailModal.verifyTrackedTimeIsVisible(tracked_2);

  //remove estimation
    IssueDetailModal.removeTrackingTime();
    IssueDetailModal.verifyTrackedTimeIsVisible("No time logged");
        
    });

   });