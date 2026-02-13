/// <reference types="cypress" />
require('cypress-xpath')

describe('Adding Purchase Invoices Suite ', function () {
const randomNumber = Math.floor(Math.random() * 1000000);
const itemName = `item ${randomNumber}`;
const uom = 'Nos';
const draftStatus = 'مسودة';
const submittedStatus = 'معتمد';

  it('TC01_create New Purchase Invoice And Submit ',function () {

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
cy.get('[id="show-sidebar"]',{timeout:180000}).should('exist').should('be.visible').as('burgerIcon_5');
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
cy.get('#item_code').should('be.visible',{timeout:400000}).first().clear().type(itemName);

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

cy.log('open standard buying list ');
cy.get('[title ="Standard Buying"]',{timeout:180000}).should('be.visible').click({force:true});

cy.log('open items prices table');
cy.contains('إضافة و تعديل الأسعار',{timeout:180000}).should('exist').should('not.be.disabled').click({force:true});

cy.log('click on add item price btn');
cy.contains('إضافة سعر الصنف',{timeout:180000}).should('exist').should('be.visible').click();
cy.get('h4.modal-title',{timeout:180000}).should('exist').should('be.visible').eq(1).click();

cy.log('click on view complete screen btn');
cy.get('[class ="btn btn-secondary btn-sm "]',{timeout:180000}).eq(1).should('exist').should('be.visible').click();
cy.get('h4.modal-title',{timeout:180000}).should('not.be.visible').eq(1);

cy.log('enter item name into Buying price list');
cy.get('[id="item_code"][data-doctype="Item Price"]',{timeout:180000}).eq(0).should('exist').click({force:true}).clear({force:true});
cy.get('[id="item_code"][data-doctype="Item Price"]').eq(0).should('exist').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});
cy.get('[id="uom"][data-doctype="Item Price"]',{timeout:180000}).eq(0).should('exist').click({force:true}).clear({force:true});
cy.get('[id="uom"][data-doctype="Item Price"]').eq(0).should('exist').type(uom,{force:true});

cy.get('[id="price_list_rate"][data-doctype="Item Price"]').eq(0).should('be.visible',{timeout:180000}).click();
cy.get('[id="price_list_rate"][data-doctype="Item Price"]').eq(0).should('be.visible',{timeout:180000}).clear();
cy.get('[id="price_list_rate"][data-doctype="Item Price"]').eq(0).should('be.visible',{timeout:180000}).click().type("100");

cy.log('select selling price list');
cy.get('[id="price_list"][data-doctype="Item Price"]',{timeout:180000}).eq(0).should('exist').click().type('شراء');
cy.get('p[title="شراء القياسية"]',{timeout:180000}).eq(0).should('exist').should('be.visible').click();

cy.log('click on save btn');
cy.get('[data-action_name="Save"]:not([hidden])',{timeout:180000}).eq(2).should('exist').should('not.be.disabled').click();

cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:40000}).should('exist').should('be.visible').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();

cy.log('click on purchase Tab ');
cy.get('#module-anchor-Buying',{timeout:180000}).should('be.visible').as('purchaseTab_5')
cy.get('@purchaseTab_5').click({force:true});

cy.log('click on purchase invoices Opt ');
cy.get('#sidebar-purchases-invoice',{timeout:180000}).should('exist').as('purchaseInvoicesTab');
cy.get('@purchaseInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');

// cy.log(' filter sales invoices to exclude return notes ');
// cy.get('.filter-icon.active',{timeout:180000}).eq(1).should('exist').as('filterIcon');
// cy.get('@filterIcon').click({force:true});

// cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').type("مرتجع");
// cy.get('.filter-field-select',{timeout:180000}).should('be.visible').click({force:true});
// cy.get('#is_return',{timeout:180000}).should('exist').select('No');


// cy.log(' filter sales invoices to exclude debit notes ');
// cy.contains('إضافة فلتر',{timeout:180000}).should('exist').click();
// cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').eq(1).type("مدين");
// cy.get('.filter-field-select',{timeout:180000}).should('be.visible').eq(1).click({force:true});
// cy.get('#is_debit_note',{timeout:180000}).should('exist').eq(0).select('No');
// cy.log('click on apply filter btn  ');
// cy.get('.btn.btn-primary.btn-xs.apply-filters',{timeout:180000}).should('be.visible').eq(0).click();

cy.log('click on new purchase invoice btn  ');
cy.contains('إضافة فاتورة المشتريات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المشتريات جديد',{timeout:180000});

cy.log('select supplier ');
cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).eq(1).should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});

cy.log('enter item name at purchase invoice ');

cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 60000 }).scrollIntoView().should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('exist').should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock ',{timeout:180000}).should('exist').click({force:true});
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(2).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true });

cy.log('get status of purchase invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('purchaseInvoiceStatus');

cy.get('@purchaseInvoiceStatus').then(value => {
  cy.log(`purchase invoice status is  : ${value}`)});

  cy.log(' verify that the status of created purchase invoice is submitted معتمد ')
  cy.get('@purchaseInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);});

});
/*********************************************************************************************************************************************** */


/****************************************************************************************************************************************************** */
it.skip('TC02_create New Purchase Invoice From Purchase Order ',function () {

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

cy.log(`entered item name is ${itemName}`);

cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:40000}).should('exist').should('be.visible').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();

cy.log('click on purchase Tab ');
cy.get('#module-anchor-Buying',{timeout:180000}).should('be.visible').as('purchaseTab_5')
cy.get('@purchaseTab_5').click({force:true});

cy.log('click on purchase orders option ');
cy.get('#sidebar-purchases-purchase-orders',{timeout:180000}).should('exist').as('purchaseOrdersTab');
cy.get('@purchaseOrdersTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');

cy.log('click on new purchase order btn  ');
cy.contains('إضافة أمر الشراء',{timeout:180000}).should('be.visible').click();
cy.contains('إضافة أمر الشراء',{timeout:180000});

cy.log('select supplier ');
cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});

cy.log('enter item name at purchase invoice ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 60000 }).scrollIntoView().should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).should('exist').should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(0).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true });

cy.contains('حفظ واعتماد', { timeout: 180000 }).should('not.be.visible');

cy.log('get status of purchase order before creating related purchase invoice ');
cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.orange',{timeout:180000}).eq(0).should('exist').should('be.visible')
.invoke('text').as('purchaseOrderStatusBeforeCreatingRelatedPurchaseInvoice');

cy.get('@purchaseOrderStatusBeforeCreatingRelatedPurchaseInvoice').then(value => {
  cy.log(`status of purchase order before creating related puchase invoice is  : ${value}`)});

cy.log('click on create btn then choose sales invoice opt');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).scrollIntoView({ force: true }).should('be.visible');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).should('exist').should('be.visible').click({force:true});
cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).eq(3).should('exist').should('be.visible').click({force:true});

// cy.contains('مدفوعة عن طريق نقاط البيع',{timeout:180000}).should('exist').should('be.visible');
cy.log('uncheck update stock checkbox');
cy.get('#update_stock', { timeout: 180000 }).scrollIntoView().should('be.visible').click();


cy.log('click on save and submit btn');
cy.get('button.save-submit-action.toolbar-btn', { timeout: 180000 }).eq(4).scrollIntoView().should('be.visible').click();  
cy.get('button.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(2).should('exist').should('be.visible').click({ force: true });
// cy.contains('واجهة',{timeout:180000}).should('exist').should('be.visible');
cy.get('.label.label-success',{timeout:180000}).scrollIntoView();

cy.log('get status of purchase invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('purchaseInvoiceStatus');

cy.get('@purchaseInvoiceStatus').then(value => {
  cy.log(`purchase invoice status is  : ${value}`)});

  cy.log(' verify that the status of created purchase invoice is submitted معتمد ')
  cy.get('@purchaseInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);});

});

/********* End Of Test Case ********************************/
it.skip('TC03_create Debit Note From Purchase Invoice ',function () {

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

cy.log('click on purchase Tab ');
cy.get('#module-anchor-Buying',{timeout:180000}).should('be.visible').as('purchaseTab_5')
cy.get('@purchaseTab_5').click({force:true});

cy.log('click on purchase invoices Opt ');
cy.get('#sidebar-purchases-invoice',{timeout:180000}).should('exist').as('purchaseInvoicesTab');
cy.get('@purchaseInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');

// cy.log(' filter sales invoices to exclude return notes ');
// cy.get('.filter-icon.active',{timeout:180000}).eq(1).should('exist').as('filterIcon');
// cy.get('@filterIcon').click({force:true});

// cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').type("مرتجع");
// cy.get('.filter-field-select',{timeout:180000}).should('be.visible').click({force:true});
// cy.get('#is_return',{timeout:180000}).should('exist').select('No');


// cy.log(' filter sales invoices to exclude debit notes ');
// cy.contains('إضافة فلتر',{timeout:180000}).should('exist').click();
// cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').eq(1).type("مدين");
// cy.get('.filter-field-select',{timeout:180000}).should('be.visible').eq(1).click({force:true});
// cy.get('#is_debit_note',{timeout:180000}).should('exist').eq(0).select('No');
// cy.log('click on apply filter btn  ');
// cy.get('.btn.btn-primary.btn-xs.apply-filters',{timeout:180000}).should('be.visible').eq(0).click();

cy.log('click on new purchase invoice btn  ');
cy.contains('إضافة فاتورة المشتريات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المشتريات جديد',{timeout:180000});

cy.log('select supplier ');
cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click();
// cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).scrollIntoView().should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});

cy.log('enter item name at purchase invoice ');

cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 60000 }).scrollIntoView().should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('exist').should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock ',{timeout:180000}).should('exist').click({force:true});
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(0).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true });

cy.log('get status of purchase invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('purchaseInvoiceStatus');

cy.get('@purchaseInvoiceStatus').then(value => {
  cy.log(`purchase invoice status is  : ${value}`)});

  cy.log(' verify that the status of created purchase invoice is submitted معتمد ')
  cy.get('@purchaseInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});

cy.get('use[href="#icon-close-alt"]',{timeout:180000}).eq(3).should('exist').should('be.visible').should('not.be.disabled').click();
cy.log('click on create btn then choose debit note opt');
// cy.get('button[class="btn btn-default toolbar-btn"]',{timeout:180000}).eq(1).should('be.visible');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).eq(0).should('be.visible').click();
cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).eq(1).should('exist').should('be.visible').click({force:true});
// cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).scrollIntoView().should('be.visible').click({force:true});
// cy.contains('مدفوع',{timeout:180000}).should('exist').should('be.visible');

// cy.log(' select reason at credit note page ');
// cy.get('#reason',{timeout:180000}).should('exist').select(2);

cy.log('click on save and submit btn');
cy.get('button.save-submit-action.toolbar-btn', { timeout: 180000 }).eq(3).scrollIntoView().should('be.visible').click();  
cy.get('button.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(2).should('exist').should('be.visible').click({ force: true });
// cy.contains('واجهة',{timeout:180000}).should('exist').should('be.visible');
cy.get('.label.label-success',{timeout:180000}).scrollIntoView();

cy.log('get status of debit note ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('debitNoteStatus');

cy.get('@debitNoteStatus').then(value => {
  cy.log(`purchase invoice Status is  : ${value}`)});

  cy.log(' verify that the status of created debit note  is submitted معتمد ')
  cy.get('@debitNoteStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);});

});

/********* End Of Test Case ********************************/


it.skip('TC04_create Payment For Purchase Invoice',function () {
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

cy.log('click on purchase Tab ');
cy.get('#module-anchor-Buying',{timeout:180000}).should('be.visible').as('purchaseTab_5')
cy.get('@purchaseTab_5').click({force:true});

cy.log('click on purchase invoices Opt ');
cy.get('#sidebar-purchases-invoice',{timeout:180000}).should('exist').as('purchaseInvoicesTab');
cy.get('@purchaseInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');

// cy.log(' filter sales invoices to exclude return notes ');
// cy.get('.filter-icon.active',{timeout:180000}).eq(1).should('exist').as('filterIcon');
// cy.get('@filterIcon').click({force:true});

// cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').type("مرتجع");
// cy.get('.filter-field-select',{timeout:180000}).should('be.visible').click({force:true});
// cy.get('#is_return',{timeout:180000}).should('exist').select('No');


// cy.log(' filter sales invoices to exclude debit notes ');
// cy.contains('إضافة فلتر',{timeout:180000}).should('exist').click();
// cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').eq(1).type("مدين");
// cy.get('.filter-field-select',{timeout:180000}).should('be.visible').eq(1).click({force:true});
// cy.get('#is_debit_note',{timeout:180000}).should('exist').eq(0).select('No');
// cy.log('click on apply filter btn  ');
// cy.get('.btn.btn-primary.btn-xs.apply-filters',{timeout:180000}).should('be.visible').eq(0).click();

cy.log('click on new purchase invoice btn  ');
cy.contains('إضافة فاتورة المشتريات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المشتريات جديد',{timeout:180000});

cy.log('select supplier ');
cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click();
// cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).scrollIntoView().should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});

cy.log('enter item name at purchase invoice ');

cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 60000 }).scrollIntoView().should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('exist').should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock ',{timeout:180000}).should('exist').click({force:true});
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(0).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true });

cy.log('get status of purchase invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('purchaseInvoiceStatus');

cy.get('@purchaseInvoiceStatus').then(value => {
  cy.log(`purchase invoice status is  : ${value}`)});

  cy.log(' verify that the status of created purchase invoice is submitted معتمد ')
  cy.get('@purchaseInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});

cy.get('use[href="#icon-close-alt"]',{timeout:180000}).eq(3).should('exist').should('be.visible').should('not.be.disabled').click();
cy.log('click on create btn then choose payment opt');
// cy.get('button[class="btn btn-default toolbar-btn"]',{timeout:180000}).eq(1).should('be.visible');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).eq(0).should('be.visible').click();
cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).eq(2).should('exist').should('be.visible').click();
// cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).scrollIntoView().should('be.visible').click({force:true});
// cy.contains('مدفوع',{timeout:180000}).should('exist').should('be.visible');

// cy.log(' select reason at credit note page ');
// cy.get('#reason',{timeout:180000}).should('exist').select(2);

cy.log('enter refernece number');
cy.get('input[data-fieldname="reference_no"]').scrollIntoView().should('be.visible').type(randomNumber,{timeout:180000,  force: true });


cy.log('click on save and submit btn');
cy.get('button[class="btn btn-inverse btn-sm save-submit-action toolbar-btn"]', { timeout: 180000 }).eq(0).should('exist').click();  
cy.get('button.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(2).should('exist').should('be.visible').click({ force: true });
// cy.contains('واجهة',{timeout:180000}).should('exist').should('be.visible');
cy.get('.label.label-success',{timeout:180000}).scrollIntoView();

cy.log('get status of payment note ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('paymentNoteStatus');

cy.get('@paymentNoteStatus').then(value => {
  cy.log(`purchase invoice Status is  : ${value}`)});

  cy.log(' verify that the status of created payment note is submitted معتمد ')
  cy.get('@paymentNoteStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);});




});
/********* End Of Test Case ********************************/
it.skip('TC05_create New Purchase Invoice From Purchase Receipt',function () {

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

cy.log('click on new delivery note btn  ');
cy.contains('إضافة سند إستلام',{timeout:180000}).should('be.visible').click();
cy.contains('سند إستلام جديد',{timeout:180000});

cy.log('select Supplier ');
cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click({force:true});
cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click({force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at purchase receipt doc ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(0).should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(0).should('be.visible').click({force:true}).clear();
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(0).should('be.visible').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).should('exist').should('be.visible').click({force:true});
// cy.contains('إلغاء',{timeout:180000}).eq(0).should('exist').should('be.visible').scrollIntoView({force:true}).should('be.visible');

cy.contains('حفظ واعتماد', { timeout: 180000 }).should('not.be.visible');

cy.log('get status of purchase receipt ');
cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.orange',{timeout:180000}).eq(0).should('exist').should('be.visible')
.invoke('text').as('purchaseReceiptStatusBeforeCreatingRelatedSalesInvoice');

cy.get('@purchaseReceiptStatusBeforeCreatingRelatedSalesInvoice').then(value => {
  cy.log(`status of  purchase Receipt is : ${value}`)});


cy.log('click on create btn then choose purchase invoice opt');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).scrollIntoView({ force: true }).should('be.visible');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).should('exist').should('be.visible').click({force:true});
cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).eq(3).should('exist').should('be.visible').click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock', { timeout: 180000 }).scrollIntoView().should('be.visible').click();

cy.log('click on save and submit btn');
cy.get('button.save-submit-action.toolbar-btn', { timeout: 180000 }).eq(4).scrollIntoView().should('be.visible').click();  
cy.get('button.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(1).should('exist').should('be.visible').click({ force: true });
// cy.contains('واجهة',{timeout:180000}).should('exist').should('be.visible');
cy.get('.label.label-success',{timeout:180000}).scrollIntoView();

cy.log('get status of purchase invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('purchaseInvoiceStatus');

cy.get('@purchaseInvoiceStatus').then(value => {
  cy.log(`purchase invoice status is  : ${value}`)});

  cy.log(' verify that the status of created purchase invoice is submitted معتمد ')
  cy.get('@purchaseInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);});

});
/******************************************* End Of Test Case************************************************************ */

it('TC06_create New Purchase Invoice And Check In General Ledger Report',function () {

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

cy.log(`entered item name is ${itemName}`);
cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:40000}).should('exist').should('be.visible').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();

cy.log('click on purchase Tab ');
cy.get('#module-anchor-Buying',{timeout:180000}).should('be.visible').as('purchaseTab_5')
cy.get('@purchaseTab_5').click({force:true});

cy.log('click on purchase invoices Opt ');
cy.get('#sidebar-purchases-invoice',{timeout:180000}).should('exist').as('purchaseInvoicesTab');
cy.get('@purchaseInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');

// cy.log(' filter sales invoices to exclude return notes ');
// cy.get('.filter-icon.active',{timeout:180000}).eq(1).should('exist').as('filterIcon');
// cy.get('@filterIcon').click({force:true});

// cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').type("مرتجع");
// cy.get('.filter-field-select',{timeout:180000}).should('be.visible').click({force:true});
// cy.get('#is_return',{timeout:180000}).should('exist').select('No');


// cy.log(' filter sales invoices to exclude debit notes ');
// cy.contains('إضافة فلتر',{timeout:180000}).should('exist').click();
// cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').eq(1).type("مدين");
// cy.get('.filter-field-select',{timeout:180000}).should('be.visible').eq(1).click({force:true});
// cy.get('#is_debit_note',{timeout:180000}).should('exist').eq(0).select('No');
// cy.log('click on apply filter btn  ');
// cy.get('.btn.btn-primary.btn-xs.apply-filters',{timeout:180000}).should('be.visible').eq(0).click();

cy.log('click on new purchase invoice btn  ');
cy.contains('إضافة فاتورة المشتريات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المشتريات جديد',{timeout:180000});

cy.log('select supplier ');
cy.get('[data-target="Supplier"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});

cy.log('enter item name at purchase invoice ');

cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 60000 }).scrollIntoView().should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('exist').should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock ',{timeout:180000}).should('exist').click({force:true});
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(0).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true });

cy.log('get status of purchase invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('purchaseInvoiceStatus');

cy.get('@purchaseInvoiceStatus').then(value => {
  cy.log(`purchase invoice status is  : ${value}`)});

  cy.log(' verify that the status of created purchase invoice is submitted معتمد ')
  cy.get('@purchaseInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);});






































cy.log('get total amount of purchase invoice ');
cy.get('div[data-fieldname="total"]',{timeout:180000}).eq(0).find('span[dir="rtl"]').scrollIntoView().should('be.visible')
.invoke('text').as('purchaseInvoiceTotalAmount');

cy.get('@purchaseInvoiceTotalAmount').then(value => {
  cy.log(`purchase Invoice  Total Amount is  : ${value}`)});

cy.log('get grand total amount of purchase invoice ');
cy.get('div[data-fieldname="grand_total"]',{timeout:180000}).eq(0).find('span[dir="rtl"]').scrollIntoView().should('be.visible')
.invoke('text').as('purchaseInvoiceSGrandTotalAmount');

cy.get('@purchaseInvoiceSGrandTotalAmount').then(value => {
  cy.log(`purchase InvoiceS Grand Total Amount is  : ${value}`)});


cy.log('get name of purchase invoice ');
cy.get('h3[class="ellipsis title-text"]',{timeout:180000}).eq(3).should('exist')
.invoke('text').as('purchaseInvoiceSName');

cy.get('@purchaseInvoiceSName').then(value => {
  cy.log(`purchase Invoices name is  : ${value}`)});


  cy.get('use[href="#icon-close-alt"]',{timeout:180000}).eq(3).should('exist').should('be.visible').should('not.be.disabled').click();
cy.log('open general ledger report');
cy.get('button[class="btn btn-default toolbar-btn"]',{timeout:180000}).eq(0).should('exist').click();

cy.contains('موازنة دفتر الأستاذ').eq(0).should('be.visible').click();

cy.log('get value which exist at default credit account ');
cy.get('div[class="dt-cell__content dt-cell__content--col-4"]',{timeout:180000}).eq(2).should('exist')
.invoke('text').as('valueAtDefaultCreditAccountGL');

cy.get('@valueAtDefaultCreditAccountGL').then(value => {
  cy.log(`value which exist at default Credit account is : ${value}`)});



cy.log('get value which exist at default expense account ');
cy.get('div[class="dt-cell__content dt-cell__content--col-3"]',{timeout:180000}).eq(4).should('exist')
.invoke('text').as('valueAtDefaultExpenseAccountGL');

cy.get('@valueAtDefaultExpenseAccountGL').then(value => {
  cy.log(`value which exist at default expense account is : ${value}`)});



cy.log("verify that Default Credit Account At GL has the same value of grand total Amount For purchase Invoice");

cy.get('@valueAtDefaultCreditAccountGL').then((debitGLValue) => {
  cy.get('@purchaseInvoiceSGrandTotalAmount').then((invoiceGrandTotal) => {

    const debitGL = debitGLValue.trim()
    const grandTotal = invoiceGrandTotal.trim()

    expect(debitGL).to.eq(grandTotal)
  })
})


cy.log("verify that Default expense Account At GL has the same value of total Amount For purchase Invoice");
cy.get('@valueAtDefaultExpenseAccountGL').then((incomeGLValue) => {
  cy.get('@purchaseInvoiceTotalAmount').then((invoiceTotal) => {

    const incomeGL = incomeGLValue.trim()
    const grandTotal = invoiceTotal.trim()

    expect(incomeGL).to.eq(grandTotal)
  })
})

// cy.get('[href="/app/query-report/Gross Profit"]',{timeout:40000}).should('exist').as('grossProfitReport_5');
// cy.get('@grossProfitReport_5').click();

// cy.log('select company');
// cy.get('button[class="btn btn-default toolbar-btn"]',{timeout:180000}).eq(2).should('exist');
// cy.get('input[class="input-with-feedback form-control input-xs reqd"]:not([hidden])',{timeout:180000}).eq(0).focus().click().clear({force:true}).type("BusinessClouds (Demo)",{timeout:180000,  force: true });

// cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })



// cy.log('enter sales invoice name');
// cy.get('@salesInvoiceSName').then((salesInvoiceSName) => {
// cy.get('div[data-fieldname="sales_invoice"]:not([hidden])',{timeout:180000}).click({force:true}).type(salesInvoiceSName.trim());
// });
// cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 }).click();


  /******** end of TC **************** */
});



  /******** end of Suite **************** */
});


