/// <reference types="cypress" />
require('cypress-xpath')

describe('Adding WareHouse Suite ', function () {
  it('TC01_create New WareHouse',function () {
const randomNumber = Math.floor(Math.random() * 1000000);
const wareHouseName = `wareHouse ${randomNumber}`;

    cy.log('open dafater 5');
    cy.visit('https://dafater-qc-1.dafater.biz/login#login');

   cy.log('enter user name');
cy.get('#login_email , #login_id').type("Administrator",{timeout:20000,  force: true });

cy.log('enter user name');
cy.get('#login_password, #pass')
.type("012345MM@@", { force: true });

cy.log('click on login btn ');
cy.get("#login_btn").click();


cy.log('wait overlay to be disappeared');
cy.get('body').then($body => {
  if ($body.find('.freeze-message-container').length) {
    cy.get('.freeze-message-container', { timeout: 120000 })
      .should('not.be.visible');
  }
});

// // ignore Js exception 

 Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('setAttribute')) {
    return false;
  }
});
cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:40000}).should('exist').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();

cy.log('click on wareHouse Tab ');
cy.get('#module-anchor-Stock',{timeout:20000}).should('be.visible').as('stockTab_5')
cy.get('@stockTab_5').click({force:true});

cy.log('click on wareHouse opt ');
cy.get('#sidebar-stock-warehouse',{timeout:40000}).should('exist').as('wareHouseTab');
cy.get('@wareHouseTab').click({force:true});

cy.log('get number of all wareHouses at list view before creating new one');
cy.get('.list-count').should('exist').should('not.contain', 'تحديث').invoke('text').as('numberOfAllWareHousesBeforeCreatingNewOne') ;
cy.get('@numberOfAllWareHousesBeforeCreatingNewOne').then(value => {
  cy.log(`Number of all wareHouses before creating new one : ${value}`)});

cy.log('click on new wareHouse btn');
cy.get('.btn.btn-default.btn-sm.primary-action.toolbar-btn').eq(2).should('exist').click({ force: true });

cy.log(`entered wareHouse name is ${wareHouseName}`);
cy.get('#warehouse_name').should('be.visible',{timeout:40000}).first()
.type(wareHouseName, { force: true });

cy.log('click on save btn');
cy.get('[data-action_name="Save"]').should('be.visible').should('not.be.disabled').click();

cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.blue').should('be.visible',{timeout:40000});

cy.get('.ellipsis.title-text').should('be.visible',{timeout:400000})
.eq(3).invoke('text').as('CreatedWareHouseName') ;

cy.get('@CreatedWareHouseName').then(value => {
  cy.log(`created wareHouse name is  : ${value}`)});

  cy.log(' verify that created WareHouse name is same as entered WareHouse name ')
  cy.get('@CreatedWareHouseName').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(wareHouseName);
// });

  });
});

});


