/// <reference types="cypress" />
require('cypress-xpath')

describe('Adding Items Suite ', function () {
  it('TC01_create New Sales And Purchase Item ',function () {
const randomNumber = Math.floor(Math.random() * 1000000);
const itemName = `item ${randomNumber}`;

    cy.log('open dafater 5');
    cy.visit('http://temp-qc-tmp.dafater.biz/#login');

   cy.log('enter user name');
cy.get('#login_email , #login_id').type("Administrator",{timeout:20000,  force: true });

cy.log('enter user name');
cy.get('#login_password, #pass')
.type("AsDedpoEweWwerd", { force: true });

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

cy.log('click on warehouse Tab ');
cy.get('#module-anchor-Stock',{timeout:20000}).should('be.visible').as('stockTab_5')
cy.get('@stockTab_5').click({force:true});


cy.log('click on items Tab ');
cy.get('#sidebar-stock-item',{timeout:40000}).should('exist').as('itemsTab');
cy.get('@itemsTab').click({force:true});

cy.log('number of all items at list view before creating new item');
cy.get('.Item-listview-card',{timeout:400000}).should('exist',{timeout:180000})
.children('.list-indicators__item-indicator',{timeout:400000})
.should('exist',{timeout:180000}).first().should('exist',{timeout:180000})
.children('span').should('exist',{timeout:180000})
.invoke('text').as('numberOfAllItemsBeforeCreatingNewOne') ;

cy.get('@numberOfAllItemsBeforeCreatingNewOne').then(value => {
  cy.log(`Number of all items before creating new one : ${value}`)});

cy.log('click on new item btn');
cy.get('[id="page-List/Item/List"]').should('exist')
.find('.btn.btn-default.btn-sm.primary-action.toolbar-btn').click({ force: true });


cy.get('[class="modal-dialog"]').should('be.visible')
.find('.btn.btn-secondary.btn-sm').eq(0)
.should('be.visible',{timeout:180000}).should('not.be.disabled').click();

cy.log(`entered item name is ${itemName}`);
cy.get('#item_code').should('be.visible',{timeout:400000}).first()
.type(itemName, { force: true });

cy.log('click on save btn');
cy.get('[data-action_name="Save"]').should('be.visible').should('not.be.disabled').click();

cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.blue').should('be.visible',{timeout:400000});

cy.get('.ellipsis.title-text').should('be.visible',{timeout:400000})
.eq(3).invoke('text').as('CreatedItemName') ;

cy.get('@CreatedItemName').then(value => {
  cy.log(`created item name is  : ${value}`)});

  cy.log(' verify that created item name is same as entered item name ')
  cy.get('@CreatedItemName').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(itemName);
});

  });

 //test 2 

  it('TC02_create New Sales Item',function () {
    
const randomNumber = Math.floor(Math.random() * 1000000);
const itemName = `item ${randomNumber}`;

    cy.log('open dafater 5');
    cy.visit('http://temp-qc-tmp.dafater.biz/#login');

   cy.log('enter user name');
cy.get('#login_email , #login_id').type("Administrator",{timeout:20000,  force: true });

cy.log('enter user name');
cy.get('#login_password, #pass').type("AsDedpoEweWwerd", { force: true });

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

cy.log('click on warehouse Tab ');
cy.get('#module-anchor-Stock',{timeout:20000}).should('be.visible').as('stockTab_5')
cy.get('@stockTab_5').click({force:true});

cy.log('click on items Tab ');
cy.get('#sidebar-stock-item',{timeout:40000}).should('exist').as('itemsTab');
cy.get('@itemsTab').click({force:true});

cy.log('number of sales items only at list view before creating new sales item');
cy.get('.Item-listview-card',{timeout:400000}).should('exist',{timeout:180000})
.children('.list-indicators__item-indicator',{timeout:400000})
.should('exist',{timeout:180000}).eq(1)
.should('exist',{timeout:180000}).children('span').should('exist',{timeout:180000})
.invoke('text').as('numberOfAllSalesItemsBeforeCreatingNewOne') ;


cy.get('@numberOfAllSalesItemsBeforeCreatingNewOne').then(value => {
  cy.log(`Number of all sales items before creating new one : ${value}`)});

cy.log('click on new item btn');
cy.get('[id="page-List/Item/List"]').should('exist').find('.btn.btn-default.btn-sm.primary-action.toolbar-btn').click({ force: true });

cy.get('[class="modal-dialog"]').should('be.visible')
.find('.btn.btn-secondary.btn-sm').eq(0)
.should('be.visible',{timeout:180000}).should('not.be.disabled').click();

cy.log(`entered item name is  ${itemName}`);
cy.get('#item_code').should('be.visible',{timeout:400000}).first().type(itemName, { force: true });

cy.log('unselect is purchase item checkbox');
cy.get('#item-purchasing_tab-tab').should('exist',{timeout:400000}).click({ force: true });

cy.get('#item-purchasing_tab-tab').should('exist',{timeout:400000}).click({ force: true });

cy.get('#is_purchase_item').should('be.visible',{timeout:400000}).click();

cy.log('click on save btn');
cy.get('[data-action_name="Save"]').should('exist').should('not.be.disabled').click();

cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.blue').should('be.visible',{timeout:400000});

cy.log('get name of created item');
cy.get('.ellipsis.title-text').should('be.visible',{timeout:400000})
.eq(3).invoke('text').as('CreatedSalesItemName') ;

cy.get('@CreatedSalesItemName').then(value => {
  cy.log(`created sales item name is  : ${value}`)});

  cy.log(' verify that created item name is same as entered item name ')
  cy.get('@CreatedSalesItemName').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(itemName);
});
  });
it.skip('TC03_create New Purchase Item',function () {
  const randomNumber = Math.floor(Math.random() * 1000000);
const itemName = `item ${randomNumber}`;
    cy.log('open dafater 5');
    cy.visit('http://temp-qc-tmp.dafater.biz/#login');

   cy.log('enter user name');
cy.get('#login_email , #login_id').type("Administrator",{timeout:20000,  force: true });

cy.log('enter user name');
cy.get('#login_password, #pass').type("AsDedpoEweWwerd", { force: true });

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

cy.log('click on warehouse Tab ');
cy.get('#module-anchor-Stock',{timeout:20000}).should('be.visible').as('stockTab_5')
cy.get('@stockTab_5').click({force:true});

cy.log('click on items Tab ');
cy.get('#sidebar-stock-item',{timeout:40000}).should('exist').as('itemsTab');
cy.get('@itemsTab').click({force:true});

cy.log('number of purchase items only at list view before creating new purchase item');
cy.get('.Item-listview-card',{timeout:400000}).should('exist',{timeout:180000})
.children('.list-indicators__item-indicator',{timeout:400000})
.should('exist',{timeout:180000}).eq(2)
.should('exist',{timeout:180000}).children('span').should('exist',{timeout:180000})
.invoke('text').as('numberOfAllPurchaseItemsBeforeCreatingNewOne') ;


cy.get('@numberOfAllPurchaseItemsBeforeCreatingNewOne').then(value => {
  cy.log(`Number of all purchase items before creating new one : ${value}`)});

cy.log('click on new item btn');
cy.get('[id="page-List/Item/List"]').should('exist').find('.btn.btn-default.btn-sm.primary-action.toolbar-btn').click({ force: true });

cy.get('[class="modal-dialog"]').should('be.visible')
.find('.btn.btn-secondary.btn-sm').eq(0)
.should('be.visible',{timeout:180000}).should('not.be.disabled').click();


cy.log(`entered item name is ${itemName}`);
cy.get('#item_code').should('be.visible',{timeout:400000}).first().type(itemName, { force: true });

cy.log('unselect is purchase item checkbox');
cy.get('#item-sales_details-tab').should('exist',{timeout:400000}).click();
cy.get('#item-sales_details-tab').should('exist',{timeout:400000}).click();
cy.get('#is_sales_item').should('be.visible',{timeout:400000}).click();

cy.log('click on save btn');
cy.get('[data-action_name="Save"]').should('exist').should('not.be.disabled').click();

cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.blue').should('be.visible',{timeout:400000});

cy.log('get name of created item');
cy.get('.ellipsis.title-text').should('be.visible',{timeout:400000})
.eq(3).invoke('text').as('CreatedPurchaseItemName') ;

cy.get('@CreatedPurchaseItemName').then(value => {
  cy.log(`created purchase item name is  : ${value}`)});

  cy.log(' verify that created item name is same as entered item name ')
  cy.get('@CreatedPurchaseItemName').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(itemName);
});
  }); 

}); 


