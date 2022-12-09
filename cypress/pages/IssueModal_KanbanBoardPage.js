
class KanbanBoardPage {
    constructor() {
        this.issue = '[data-testid="list-issue"]';
        this.typePartialSelector = '[data-testid="icon:'
        this.board = '#root';
        this.issueDetailPage = '[data-testid="modal:issue-details"]';
    }
    checkIfCreatedIssueIsVisible(title) {
        cy.contains(title).should('be.visible');
    }

    checkIfCreatedIssueIsNotVisible(title) {
        cy.contains(title).should('not.exist');
    }

    checkIfIssueIsFirstOnTheKanbanBoard(title) {
        cy.get(this.issue).first().within(() => {
            cy.get('p').invoke('text').should('contain', title);
        })
    }

    checkIfFirstIssueHasType(type) {
        cy.get(this.issue).first().within(() => {
            cy.get(this.typePartialSelector + type.toLowerCase() + "\"]").should('be.visible');
        })
    }

    checkIfFirstIssueHasPriority(priority) {
        cy.get(this.issue).first().within(() => {
            cy.get(this.typePartialSelector + priority.toLowerCase() + "\"]").should('be.visible');
        })
    }

    openIssueWithTitle(title) {
        cy.contains(title).click();
        cy.get(this.issueDetailPage).should('be.visible');
    }
}

export default new KanbanBoardPage();
// let issue = new KanbanBoardPage (); (it is the same than previous row)