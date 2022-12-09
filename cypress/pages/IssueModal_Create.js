
    // Look at detail steps at the page „issue-create-2.cy.js“

class IssueModalCreate {
    constructor() {
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueType = '[data-testid="select:type"]';
        this.issueTitle = 'input[name="title"]';
        this.issueDescription = '.ql-editor';
        this.issueReporter = '[data-testid="select:reporterId"]';
        this.issueAssignee = '[data-testid="select:userIds"]';
        this.issuePriority = '[data-testid="select:priority"]';
        this.issueBacklog = '[data-testid="board-list:backlog"]';
        this.issueList = '[data-testid="list-issue"]';
        this.newIssueButton = '[data-testid="icon:plus"]';
        this.createButton = 'button[type="submit"]';
    }
        // open create issue window
    getIssueModal() {
        return cy.get(this.issueModal);
    }
    
    clickNewIssueButton() {
        cy.get(this.newIssueButton).click();
        cy.get(this.issueModal).should('be.visible');
    }

    selectIssueType(issueType) {
        cy.get(this.issueType).invoke('text').then((extractedText) => {
            if (extractedText != issueType) {
                cy.get(this.issueType).click('bottomRight');
                cy.get(`[data-testid="select-option:${issueType}"]`)
                .trigger('mouseover')
                .trigger('click');
            }
        })
    }

    editTitle(title) {
        cy.wait(1000);
        cy.get(this.issueTitle).type(title);
    }

    selectAssignee(assigneeName) {
        cy.get(this.issueAssignee).click('bottomRight');
        cy.get(`[data-testid="select-option:${assigneeName}"]`).click();
    }

    selectReporter(reporterName) {
        cy.get(this.issueReporter).click('bottomRight');
        cy.get(`[data-testid="select-option:${reporterName}"]`).click();
    }

    selectPriority(priority) {
        cy.get(this.issuePriority).click('bottomRight');
        cy.get(`[data-testid="select-option:${priority}"]`).click();
    }

    writeDescription(description) {
        cy.get(this.issueDescription).type(description);
    }

    createIssue(issueDetails) {
        this.getIssueModal().within(() => {
            this.selectIssueType(issueDetails.type);
            this.editTitle(issueDetails.title);
            this.writeDescription(issueDetails.description);
            this.selectReporter(issueDetails.reporter);
            this.selectAssignee(issueDetails.assignee);
            cy.get(this.createButton).click();
        });
    }

    createIssueWithNewIssueButton(issueDetails) {
        this.clickNewIssueButton();
        this.selectIssueType(issueDetails.type);
        this.editTitle(issueDetails.title);
        this.writeDescription(issueDetails.description);
        this.selectReporter(issueDetails.reporter);
        this.selectAssignee(issueDetails.assignee);
        this.clickCreateIssueButton();
    }

    clickCreateIssueButton() {
        cy.get(this.createButton).click();
        cy.get(this.issueModal).should('not.exist');
    }

        // If there is a error message then issue modal should exist
    clickCreateIssueButtonWithError() {
        cy.get(this.createButton).click();
        cy.get(this.issueModal).should('exist');
    }

    checkIfIssueIsCreated(expectedAmountIssues, issueDetails) {
        cy.get(this.issueModal).should('not.exist');
        cy.contains('Issue has been successfully created.').should('not.exist');

        cy.get(this.issueBacklog).should('be.visible').and('have.length', '1').within(() => {
            cy.get(this.issueList)
                .should('have.length', expectedAmountIssues)
                .first()
                .find('p')
                .contains(issueDetails.title);
            cy.get(`[data-testid="avatar:${issueDetails.assignee}"]`).should('be.visible');
        });
    }


    checkIfIssueTitleIsCorrect(issueTitle) {
        cy.get(this.issueBacklog).should('be.visible').within(() => {
            cy.get(this.issueList)
                .first()
                .find('p').invoke('text')
                .should('contain', issueTitle);
        });
    }

    checkTitleFieldIsInErrorState() {
        cy.get(this.issueTitle).scrollIntoView().should('have.css', 'border').and('contain', 'rgb(225, 60, 60)');
    }
}

export default new IssueModalCreate();
// let issue = new IssueModalCreate (); (it is the same than previous row)