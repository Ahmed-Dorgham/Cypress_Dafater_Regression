/// <reference types="cypress" />
require('cypress-xpath')

describe('Adding Purchase Receipt Suite ', function () {
const randomNumber = Math.floor(Math.random() * 1000000);
const itemName = `item ${randomNumber}`;
const uom = 'Nos';
const draftStatus = 'مسودة';
const submittedStatus = 'معتمد';

it('TC01_create New Delivery Note And Submit',function () {

 cy.log('open dafater 5');
    cy.visit('http://temp-qc-tmp.dafater.biz/#login');

   cy.log('enter user name');
cy.get('#login_email , #login_id').type("Administrator",{timeout:180000,  force: true });

cy.log('enter user name');
cy.get('#login_password, #pass')
.type("AsDedpoEweWwerd", { force: true });

cy.log('click on login btn ');
cy.get("#login_btn").click();

cy.log('wait overlay to be disappeared');
cy.get('body').then($body => {
  if ($body.find('.freeze-message-container').length) {
    cy.get('.freeze-message-container', { timeout: 180000 })
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
cy.get('[id="show-sidebar"]',{timeout:40000}).should('exist').should('be.visible').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();

cy.log('click on warehouse Tab ');
cy.get('#module-anchor-Stock',{timeout:180000}).should('be.visible').as('stockTab_5')
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
cy.get('#item_code').should('be.visible',{timeout:400000}).first().clear()
.type(itemName);

cy.log('click on save btn');
cy.get('[data-action_name="Save"]').should('exist').should('not.be.disabled').click();

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

cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:180000}).should('exist').should('be.visible').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();

cy.log('click on sales Tab ');
cy.get('#module-anchor-Selling',{timeout:180000}).should('be.visible').as('salesTab_5')
cy.get('@salesTab_5').click({force:true});

cy.log('open prices list page  ');
cy.get('#sidebar-selling-price-lists',{timeout:180000}).should('be.visible').as('pricesList_5')
cy.get('@pricesList_5').click({force:true});

cy.log('open standard selling list ');
cy.get('[title ="Standard Selling"]',{timeout:180000}).should('be.visible').click({force:true});

cy.log('open items prices table');
cy.contains('إضافة و تعديل الأسعار',{timeout:180000}).should('exist').should('not.be.disabled').click({force:true});

cy.log('click on add item price btn');
cy.contains('إضافة سعر الصنف',{timeout:180000}).should('exist').should('be.visible').click();
cy.get('h4.modal-title',{timeout:180000}).should('exist').should('be.visible').eq(1).click();

cy.log('click on view complete screen btn');
cy.get('[class ="btn btn-secondary btn-sm "]',{timeout:180000}).eq(1).should('exist').should('be.visible').click();
cy.get('h4.modal-title',{timeout:180000}).should('not.be.visible').eq(1);

cy.log('enter item name into selling price list');
cy.get('[id="item_code"][data-doctype="Item Price"]',{timeout:180000}).eq(0).should('exist').click({force:true}).clear({force:true});
cy.get('[id="item_code"][data-doctype="Item Price"]').eq(0).should('exist').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});
cy.get('[id="uom"][data-doctype="Item Price"]',{timeout:180000}).eq(0).should('exist').click({force:true}).clear({force:true});
cy.get('[id="uom"][data-doctype="Item Price"]').eq(0).should('exist').type(uom,{force:true});

cy.log('enter item price into selling price list');
cy.get('[id="price_list_rate"][data-doctype="Item Price"]').eq(0).should('be.visible',{timeout:180000}).click();
cy.get('[id="price_list_rate"][data-doctype="Item Price"]').eq(0).should('be.visible',{timeout:180000}).clear();
cy.get('[id="price_list_rate"][data-doctype="Item Price"]').eq(0).should('be.visible',{timeout:180000}).click().type("100");

cy.log('select selling price list');
cy.get('[id="price_list"][data-doctype="Item Price"]',{timeout:180000}).eq(0).should('exist').click();
cy.get('[title="البيع القياسية"]',{timeout:180000}).eq(2).should('exist').should('be.visible').click();

cy.log('click on save btn');
cy.get('[data-action_name="Save"]').should('exist').eq(2).should('not.be.disabled').click();

cy.log(`entered item name is ${itemName}`);
cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:40000}).should('exist').should('be.visible').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();

cy.log('click on warehouse Tab ');
cy.get('#module-anchor-Stock',{timeout:180000}).should('be.visible').as('stockTab_5')
cy.get('@stockTab_5').click({force:true});

cy.log('click on purchase receipt opt ');
cy.get('#sidebar-stock-purchase-receipt',{timeout:180000}).should('exist').as('purchaseReceiptTab');
cy.get('@purchaseReceiptTab').click({force:true});
cy.contains("إضافة سند إستلام",{timeout:300000}).should('be.visible');

cy.log('click on new purchase receipt btn  ');
cy.contains('إضافة سند إستلام',{timeout:180000}).should('be.visible').click();
cy.contains('سند إستلام جديد',{timeout:180000});

cy.log('select Supplier ');
cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).eq(1).should('be.visible').click({force:true});
cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).eq(1).should('be.visible').click({force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at purchase receipt doc ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]', { timeout: 30000 }).eq(1).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(1).should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(1).should('be.visible').click({force:true}).clear();
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(1).should('be.visible').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(2).should('exist').should('be.visible').click({force:true});
// cy.contains('إلغاء',{timeout:180000}).eq(0).should('exist').should('be.visible').scrollIntoView({force:true}).should('be.visible');

cy.contains('حفظ واعتماد', { timeout: 180000 }).should('not.be.visible');

// cy.log('get status of purchase receipt ');
// cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.orange',{timeout:180000}).eq(0).should('exist').should('be.visible')
// .invoke('text').as('purchaseReceiptStatusBeforeCreatingRelatedSalesInvoice');

// cy.get('@purchaseReceiptStatusBeforeCreatingRelatedSalesInvoice').then(value => {
//   cy.log(`status of  purchase Receipt  : ${value}`)});

cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:40000}).should('exist').should('be.visible').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();


cy.log('click on delivery note opt ');
cy.get('#sidebar-stock-delivery-note',{timeout:180000}).should('exist').as('deliveryNoteTab');
cy.get('@deliveryNoteTab').click({force:true});
cy.contains("إضافة سند تسليم",{timeout:300000}).should('be.visible');


cy.log('click on new delivery note btn  ');
cy.contains('إضافة سند تسليم',{timeout:180000}).should('be.visible').click();
cy.contains('سند تسليم جديد',{timeout:180000});

cy.log('select customer ');
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(2).should('be.visible').click({force:true});
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(2).should('be.visible').click({force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at delivery note doc type ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]', { timeout: 30000 }).eq(1).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(1).should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(1).should('be.visible').click({force:true}).clear();
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(1).should('be.visible').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});
 

cy.log('click on save and submit btn');
cy.get('button.save-submit-action.toolbar-btn', { timeout: 180000 }).eq(11).scrollIntoView().should('be.visible').click(); 
cy.get('button[class="btn btn-primary btn-sm btn-modal-primary"]',{timeout:180000}).eq(3).should('exist').click({force:true});

// cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(2).should('exist').click({force:true});
// cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(2).should('exist').click({force:true});
// cy.contains('إلغاء',{timeout:180000}).eq(0).should('exist').should('be.visible').scrollIntoView({force:true}).should('be.visible');

cy.log('get status of delivery note ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('deliveryNoteStatus');

cy.contains('حفظ واعتماد', { timeout: 180000 }).should('not.be.visible');
cy.log('get status of sales order before creating related sales invoice ');
cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.orange',{timeout:180000}).should('exist').should('not.contain.text', 'لم يتم الحفظ')
.invoke('text').as('deliveryNoteStatusBeforeCreatingRelatedSalesInvoice');

cy.get('@deliveryNoteStatusBeforeCreatingRelatedSalesInvoice').then(value => {
  cy.log(`status of delivery note before creating related sales invoice is  : ${value}`)});


  cy.log(' verify that the status of created delivery note is submitted معتمد ')
  cy.get('@deliveryNoteStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);});

});
/******************************************* End Of Test Case************************************************************ */
  /******** end of Suite **************** */
});


