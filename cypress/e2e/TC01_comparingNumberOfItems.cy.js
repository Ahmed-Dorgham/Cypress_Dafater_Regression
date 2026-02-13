/// <reference types="cypress" />
require('cypress-xpath')

describe('Comparing items Module ', function () {

  it('TC01_comparingNumberOfItems',function () {

    cy.log('open dafater 4');
    cy.visit('https://saber-v4.dafater.biz/index.html');

 cy.log('enter user name');
cy.get('#login_email , #login_id')
.type("Administrator", { force: true });

cy.log('enter user name');
cy.get('#login_password, #pass')
.type("cdWeewshgcfd", { force: true });

cy.log('click on login btn ');
cy.get("#login_btn").click();


// ignore JS exception 

Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Script error') ||
    err.message.includes('cross origin')
  ) {
    return false; 
  }
});


cy.log('click on close welcome msg ');
cy.get('.modal.scroll-styler.in',{timeout:50000}).as('welcomeMsg');
cy.get('@welcomeMsg').should('be.visible');
cy.get('@welcomeMsg').click() ;


cy.log('click on burger icon to show sidebar menu ');
cy.get('#show-sidebar',{timeout:30000})
.should('be.visible').click() ;

cy.log('click on warehouse Tab ');
cy.get('#module-anchor-Stock',{timeout:20000}).should('be.visible').as('anchorStock');
cy.get('@anchorStock').click() ;

cy.log('click on items Tab ');
cy.get('#sidebar-stock-item',{timeout:20000})
.should('be.visible').click() ;

cy.log('click on burger icon to close sidebar menu ');
cy.get('[class="sidebar-submenu active"]',{timeout:20000})
.find('[src="/lib/images/new-ui/menu-back.svg"]',{timeout:20000})
.scrollIntoView()
.click({force:true}) ;

cy.log('get number of all items before syncing');
cy.get('.item-all',{timeout:30000}).should('be.visible').as('items');
cy.get('@items').invoke('text').as('numberOfAllItemsBeforeSyncing') ;

cy.get('@numberOfAllItemsBeforeSyncing').then(value => {
  cy.log(`Number of all items before syncing: ${value}`)});

  

cy.get('.item-all', { timeout: 30000 })
  .should('be.visible')
  .invoke('text')
  .then(beforeText => {
    const beforeNum = Number(beforeText.replace(/\D/g, '')) || 0;


   cy.log('switch to dafater 5');
cy.visit('https://saber-v5.dafater.biz');
cy.origin('https://saber-v5.dafater.biz', {  args: { beforeNum } }, ({ beforeNum }) => {

   cy.log('enter user name');
cy.get('#login_email , #login_id')
.type("Administrator",{timeout:20000,  force: true });

cy.log('enter user name');
cy.get('#login_password, #pass')
.type("Admin123456", { force: true });

cy.log('click on login btn ');
cy.get("#login_btn").click();


cy.log('wait overlay to be disappeared');
cy.get('body').then($body => {
  if ($body.find('.freeze-message-container').length) {
    cy.get('.freeze-message-container', { timeout: 120000 })
      .should('not.be.visible');
  }
});

// ignore Js exception 

 Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('setAttribute')) {
    return false; // ignore the app error
  }
});


cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:40000}).should('be.visible').as('burgerIcon_4');
cy.get('@burgerIcon_4').click();


cy.log('click on warehouse Tab ');
cy.get('#module-anchor-Stock',{timeout:20000}).should('be.visible').as('stockTab_4')
cy.get('@stockTab_4').click({force:true});



cy.log('click on items Tab ');
cy.get('#sidebar-stock-item',{timeout:40000}).should('exist').as('itemsTab');
cy.get('@itemsTab').click({force:true});


// cy.log('click on burger icon to close sidebar menu ');
// cy.get('[id="module-icon-stock"]',{timeout:400000}).should('be.visible').and('not.be.disabled').as('stockTab_5');
// cy.get('@stockTab_5').find('[alt= "back-icon"]',{timeout:400000}).should('be.visible').as('burgerIcon_5');
// cy.get('@burgerIcon_5').scrollIntoView();
// cy.get('@burgerIcon_5',{timeout:400000}).should('be.visible').click({force:true}) ;


// cy.get('body').then($body => {
//   if ($body.find('.freeze-message-container').length) {
//     cy.get('.freeze-message-container', { timeout: 120000 })
//       .should('not.be.visible'); // wait until overlay is gone
//   }
// });
// cy.get('.freeze-message-container', { timeout: 120000 })
//   .should('not.be.visible');

cy.log('Wait until items are rendered');

cy.get('.Item-listview-card', { timeout: 180000 })  // wait up to 3 min
  .should($cards => {
    expect($cards.length).to.be.greaterThan(0);  // retry until list has items
  });
  
cy.log('get number of all items After syncing');
cy.get('.Item-listview-card',{timeout:400000})
.should('exist',{timeout:180000})
.children('.list-indicators__item-indicator',{timeout:400000})
.should('exist',{timeout:180000})
// .should('have.length.greaterThan', 0,{timeout:180000})
.first().should('exist',{timeout:180000})
.children('span').should('exist',{timeout:180000})
.invoke('text').as('numberOfAllItemsAfterSyncing') ;


cy.get('@numberOfAllItemsAfterSyncing').then(value => {
  cy.log(`Number of items after syncing: ${value}`);
});


  cy.get('@numberOfAllItemsAfterSyncing').then(after => {
    const afterClean = (after || '').toString().trim();
    const afterNum = Number(afterClean.replace(/\D/g, '')) || 0;
    cy.log(`Before: ${beforeNum}, After: ${afterNum}`);
    expect(afterNum).to.eq(beforeNum);
  });
  })
});

 });
});
