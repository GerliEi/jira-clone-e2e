
class Common {
   
    ensureValueIsEdited (selector, value){
        cy.get(selector).should('have.value', value);
    }
    
    ensureErrorMessageIsVisible(message){
        cy.get('div').should('be.visible');
    }
    }

export default new Common();
// let issue = new Common (); (it is the same than previous row)