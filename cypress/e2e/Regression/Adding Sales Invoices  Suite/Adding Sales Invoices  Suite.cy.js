/// <reference types="cypress" />
require('cypress-xpath')

describe('Adding Sales Invoices Suite ', function () {
const randomNumber = Math.floor(Math.random() * 1000000);
const itemName = `item ${randomNumber}`;
const uom = 'Nos';
const draftStatus = 'مسودة';
const submittedStatus = 'معتمد';

  it('TC01_create New Sales Invoice And Save Only ',function () {

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


cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:40000}).should('exist').should('be.visible').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();

cy.log('click on sales Tab ');
cy.get('#module-anchor-Selling',{timeout:180000}).should('be.visible').as('salesTab_5')
cy.get('@salesTab_5').click({force:true});

cy.log('click on sales invoices Opt ');
cy.get('#sidebar-selling-invoice',{timeout:180000}).should('exist').as('salesInvoicesTab');
cy.get('@salesInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');

cy.log(' filter sales invoices to exclude return notes ');
cy.get('.filter-icon.active',{timeout:180000}).eq(1).should('exist').as('filterIcon');
cy.get('@filterIcon').click({force:true});

cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').type("مرتجع");
cy.get('.filter-field-select',{timeout:180000}).should('be.visible').click({force:true});
cy.get('#is_return',{timeout:180000}).should('exist').select('No');


cy.log(' filter sales invoices to exclude debit notes ');
cy.contains('إضافة فلتر',{timeout:180000}).should('exist').click();
cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').eq(1).type("مدين");
cy.get('.filter-field-select',{timeout:180000}).should('be.visible').eq(1).click({force:true});
cy.get('#is_debit_note',{timeout:180000}).should('exist').eq(0).select('No');
cy.log('click on apply filter btn  ');
cy.get('.btn.btn-primary.btn-xs.apply-filters',{timeout:180000}).should('be.visible').eq(0).click();

cy.log('click on new sales invoice btn  ');
cy.contains('إضافة فاتورة المبيعات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المبيعات جديد',{timeout:180000});

cy.log('select customer ');
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(2).should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});

cy.log('enter item name at sales invoice ');


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
  
cy.log('click on save btn');
cy.get('[data-action_name="Save"]').eq(3).should('exist').should('not.be.disabled').click();
cy.contains('معاينة',{timeout:180000}).should('be.visible');

cy.log('get status of sales invoice ');
cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.red',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('salesInvoiceStatus');

cy.get('@salesInvoiceStatus').then(value => {
  cy.log(`sales invoice status is  : ${value}`)});

  cy.log(' verify that the status of created sales invoice is draft مسودة ')
  cy.get('@salesInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(draftStatus);
});

});
/*********************************************************************************************************************************************** */
it.skip('TC02_create New Sales Invoice And Submit ',function () {

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

cy.log('click on sales Tab ');
cy.get('#module-anchor-Selling',{timeout:180000}).should('be.visible').as('salesTab_5')
cy.get('@salesTab_5').click({force:true});

cy.log('click on sales invoices Opt ');
cy.get('#sidebar-selling-invoice',{timeout:180000}).should('exist').as('salesInvoicesTab');
cy.get('@salesInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');

cy.log(' filter sales invoices to exclude return notes ');
cy.get('.filter-icon.active',{timeout:180000}).eq(0).should('exist').as('filterIcon');
cy.get('@filterIcon').click({force:true});
// cy.get('.list_filter.row',{timeout:180000}).should('exist').click();
cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').type("مرتجع");
cy.get('.filter-field-select',{timeout:180000}).should('be.visible').click({force:true});
cy.get('#is_return',{timeout:180000}).should('exist').select('No');

cy.log(' filter sales invoices to exclude debit notes ');
cy.contains('إضافة فلتر',{timeout:180000}).should('exist').click();
// cy.get('.list_filter.row',{timeout:180000}).should('exist').click();
cy.get('.list_filter.row',{timeout:180000}).should('exist').find('[role="combobox"]').eq(1).type("مدين");
cy.get('.filter-field-select',{timeout:180000}).should('be.visible').eq(1).click({force:true});
cy.get('#is_debit_note',{timeout:180000}).should('exist').eq(0).select('No');
cy.log('click on apply filter btn  ');
cy.get('.btn.btn-primary.btn-xs.apply-filters',{timeout:180000}).should('be.visible').eq(0).click();

cy.log('click on new sales invoice btn  ');
cy.contains('إضافة فاتورة المبيعات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المبيعات جديد',{timeout:180000});

cy.log('select customer ');
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at sales invoice ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName);
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock ',{timeout:180000}).should('exist').click();
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true }

);

cy.log('get status of sales invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('salesInvoiceStatus');

cy.get('@salesInvoiceStatus').then(value => {
  cy.log(`sales invoice status is  : ${value}`)});

  cy.log(' verify that the status of created sales invoice is submitted معتمد ')
  cy.get('@salesInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});
});

/****************************************************************************************************************************************************** */
it.skip('TC03_create New Sales Invoice From Sales Order ',function () {

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

cy.log('click on sales Tab ');
cy.get('#module-anchor-Selling',{timeout:180000}).should('be.visible').as('salesTab_5')
cy.get('@salesTab_5').click({force:true});

cy.log('click on sales orders option ');
cy.get('#sidebar-selling-sales-orders',{timeout:180000}).should('exist').as('salesOrdersTab');
cy.get('@salesOrdersTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');


cy.log('click on new sales invoice btn  ');
cy.contains('إضافة أمر مبيعات',{timeout:180000}).should('be.visible').click();
cy.contains('أمر مبيعات جديد',{timeout:180000});

cy.log('select customer ');
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click({force:true});
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click({force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at sales order ');
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

cy.log('get status of sales order before creating related sales invoice ');
cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.orange',{timeout:180000}).eq(0).should('exist').should('be.visible')
.invoke('text').as('salesorderStatusBeforeCreatingRelatedSalesInvoice');

cy.get('@salesorderStatusBeforeCreatingRelatedSalesInvoice').then(value => {
  cy.log(`status of sales order before creating related sales invoice is  : ${value}`)});

cy.log('click on create btn then choose sales invoice opt');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).scrollIntoView({ force: true }).should('be.visible');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).should('exist').should('be.visible').click({force:true});
cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).eq(3).should('exist').should('be.visible').click({force:true});

cy.contains('مدفوعة عن طريق نقاط البيع',{timeout:180000}).should('exist').should('be.visible');
cy.log('uncheck update stock checkbox');
cy.get('#update_stock', { timeout: 180000 }).scrollIntoView().should('be.visible').click();


cy.log('click on save and submit btn');
cy.get('button.save-submit-action.toolbar-btn', { timeout: 180000 }).eq(4).scrollIntoView().should('be.visible').click();  
cy.get('button.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(1).should('exist').should('be.visible').click({ force: true });
// cy.contains('واجهة',{timeout:180000}).should('exist').should('be.visible');
cy.get('.label.label-success',{timeout:180000}).scrollIntoView();

cy.log('get status of sales invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('salesInvoiceStatus');

cy.get('@salesInvoiceStatus').then(value => {
  cy.log(`sales invoice status is  : ${value}`)});

  cy.log(' verify that the status of created sales invoice is submitted معتمد ')
  cy.get('@salesInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});

});


it.skip('TC04_create Credit Note From Sales Invoice ',function () {

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

cy.log('click on sales Tab ');
cy.get('#module-anchor-Selling',{timeout:180000}).should('be.visible').as('salesTab_5')
cy.get('@salesTab_5').click({force:true});

cy.log('click on sales invoices Opt ');
cy.get('#sidebar-selling-invoice',{timeout:180000}).should('exist').as('salesInvoicesTab');
cy.get('@salesInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');

cy.log('click on new sales invoice btn  ');
cy.contains('إضافة فاتورة المبيعات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المبيعات جديد',{timeout:180000});

cy.log('select customer ');
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at sales invoice ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName);
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock ',{timeout:180000}).should('exist').click();
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true }

);

cy.log('get status of sales invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('salesInvoiceStatus');

cy.get('@salesInvoiceStatus').then(value => {
  cy.log(`sales invoice status is  : ${value}`)});

  cy.log(' verify that the status of created sales invoice is submitted معتمد ')
  cy.get('@salesInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});

cy.log('click on create btn then choose credit note opt');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).scrollIntoView({ force: true }).should('be.visible');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).should('exist').should('be.visible').click({force:true});
cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).eq(2).should('exist').should('be.visible').click({force:true});

cy.contains('مدفوعة عن طريق نقاط البيع',{timeout:180000}).should('exist').should('be.visible');

cy.log(' select reason at credit note page ');
cy.get('#reason',{timeout:180000}).should('exist').select(2);

cy.log('click on save and submit btn');
cy.get('button.save-submit-action.toolbar-btn', { timeout: 180000 }).eq(3).scrollIntoView().should('be.visible').click();  
cy.get('button.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(1).should('exist').should('be.visible').click({ force: true });
// cy.contains('واجهة',{timeout:180000}).should('exist').should('be.visible');
cy.get('.label.label-success',{timeout:180000}).scrollIntoView();

cy.log('get status of credit note ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('creditNoteStatus');

cy.get('@creditNoteStatus').then(value => {
  cy.log(`credi tNote Status is  : ${value}`)});

  cy.log(' verify that the status of created credit note is submitted معتمد ')
  cy.get('@creditNoteStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});

});

it.skip('TC05_create Payment For Sales Invoice ',function () {

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

cy.log('click on sales Tab ');
cy.get('#module-anchor-Selling',{timeout:180000}).should('be.visible').as('salesTab_5')
cy.get('@salesTab_5').click({force:true});

cy.log('click on sales invoices Opt ');
cy.get('#sidebar-selling-invoice',{timeout:180000}).should('exist').as('salesInvoicesTab');
cy.get('@salesInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');

cy.log('click on new sales invoice btn  ');
cy.contains('إضافة فاتورة المبيعات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المبيعات جديد',{timeout:180000});

cy.log('select customer ');
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at sales invoice ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName);
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock ',{timeout:180000}).should('exist').click();
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true }

);

cy.log('get status of sales invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('salesInvoiceStatus');

cy.get('@salesInvoiceStatus').then(value => {
  cy.log(`sales invoice status is  : ${value}`)});

  cy.log(' verify that the status of created sales invoice is submitted معتمد ')
  cy.get('@salesInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});

cy.log('click on create btn then choose payment opt');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).scrollIntoView({ force: true }).should('be.visible');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).should('exist').should('be.visible').click({force:true});
cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).eq(1).should('exist').should('be.visible').click({force:true});

cy.contains('نوع الدفع',{timeout:180000}).should('exist').should('be.visible');

cy.log('enter refernece number');
cy.get('input[data-fieldname="reference_no"]').scrollIntoView().should('be.visible').type(randomNumber,{timeout:180000,  force: true });

cy.log('click on save and submit btn');
cy.get('button.save-submit-action.toolbar-btn', { timeout: 180000 }).eq(4).scrollIntoView().should('be.visible').click();  
cy.get('button.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(1).should('exist').should('be.visible').click({ force: true });
// cy.contains('واجهة',{timeout:180000}).should('exist').should('be.visible');
cy.get('.label.label-success',{timeout:180000}).scrollIntoView();

cy.log('get status of payment reuest ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('paymentRequestStatus');

cy.get('@paymentRequestStatus').then(value => {
  cy.log(`payment Request Status is  : ${value}`)});

  cy.log(' verify that the status of created payment request is submitted معتمد ')
  cy.get('@paymentRequestStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});

});

it.skip('TC06_create New Sales Invoice From Delivery Note',function () {

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

cy.log('click on new purchase receipt btn  ');
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
  cy.log(`status of  purchase Receipt  : ${value}`)});

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
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click({force:true});
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click({force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at delivery note doc type ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click({force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(0).should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(0).should('be.visible').click({force:true}).clear();
cy.get('input[data-fieldname="item_code"][placeholder="رمز الصنف"]',{timeout:180000}).eq(0).should('be.visible').type(itemName,{force:true});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});
  
cy.log('click on save and submit btn');
cy.get('button.save-submit-action.toolbar-btn', { timeout: 180000 }).eq(5).scrollIntoView().should('be.visible').click(); 
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(2).should('exist').click({force:true});
// cy.contains('إلغاء',{timeout:180000}).eq(0).should('exist').should('be.visible').scrollIntoView({force:true}).should('be.visible');

cy.contains('حفظ واعتماد', { timeout: 180000 }).should('not.be.visible');

cy.log('get status of sales order before creating related sales invoice ');
cy.get('.indicator-pill.no-indicator-dot.whitespace-nowrap.orange',{timeout:180000}).should('exist').should('not.contain.text', 'لم يتم الحفظ')
.invoke('text').as('salesorderStatusBeforeCreatingRelatedSalesInvoice');

cy.get('@salesorderStatusBeforeCreatingRelatedSalesInvoice').then(value => {
  cy.log(`status of delivery note before creating related sales invoice is  : ${value}`)});

cy.log('click on create btn then choose sales invoice opt');
cy.get('button[class="btn toolbar-btn btn-primary"]',{timeout:180000}).eq(1).should('exist').should('be.visible').click({force:true});
cy.get('a[href="#"][onclick="return false;"][class="dropdown-item"]',{timeout:180000}).eq(14).should('exist').should('be.visible').click({force:true});

cy.contains('مدفوعة عن طريق نقاط البيع',{timeout:180000}).should('exist').should('be.visible');
cy.log('uncheck update stock checkbox');
cy.get('#update_stock', { timeout: 180000 }).scrollIntoView().should('be.visible').click();


cy.log('click on save and submit btn');
cy.get('button.save-submit-action.toolbar-btn', { timeout: 180000 }).eq(6).scrollIntoView().should('be.visible').click();  
cy.get('button.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).eq(3).should('exist').click({ force: true });
// cy.contains('واجهة',{timeout:180000}).should('exist').should('be.visible');
cy.get('.label.label-success',{timeout:180000}).eq(2).should('be.visible');

cy.log('get status of sales invoice ');
cy.get('.label.label-success',{timeout:180000}).eq(2).should('exist').should('be.visible')
.invoke('text').as('salesInvoiceStatus');

cy.get('@salesInvoiceStatus').then(value => {
  cy.log(`sales invoice status is  : ${value}`)});

  cy.log(' verify that the status of created sales invoice is submitted معتمد ')
  cy.get('@salesInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});

});


it.skip('TC07_create New Sales Invoice And Check In Gross Profit Report',function () {

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

cy.log('click on sales Tab ');
cy.get('#module-anchor-Selling',{timeout:180000}).should('be.visible').as('salesTab_5')
cy.get('@salesTab_5').click({force:true});

cy.log('click on sales invoices Opt ');
cy.get('#sidebar-selling-invoice',{timeout:180000}).should('exist').as('salesInvoicesTab');
cy.get('@salesInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');


cy.log('click on new sales invoice btn  ');
cy.contains('إضافة فاتورة المبيعات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المبيعات جديد',{timeout:180000});

cy.log('select customer ');
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at sales invoice ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName);
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock ',{timeout:180000}).should('exist').click();
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true }

);

cy.log('get status of sales invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('salesInvoiceStatus');

cy.get('@salesInvoiceStatus').then(value => {
  cy.log(`sales invoice status is  : ${value}`)});

  cy.log(' verify that the status of created sales invoice is submitted معتمد ')
  cy.get('@salesInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});
cy.log('get total amount of sales invoice ');
cy.get('div[data-fieldname="total"]',{timeout:180000}).eq(0).find('span[dir="rtl"]').scrollIntoView().should('be.visible')
.invoke('text').as('salesInvoiceSTotalAmount');

cy.get('@salesInvoiceSTotalAmount').then(value => {
  cy.log(`sales InvoiceS Total Amount is  : ${value}`)});


cy.log('get name of sales invoice ');
cy.get('h3[class="ellipsis title-text"]',{timeout:180000}).eq(3).should('exist')
.invoke('text').as('salesInvoiceSName');

cy.get('@salesInvoiceSName').then(value => {
  cy.log(`sales InvoiceS name is  : ${value}`)});



cy.log('click on burger icon to show sidebar menu ');
cy.get('[id="show-sidebar"]',{timeout:40000}).should('exist').should('be.visible').as('burgerIcon_5');
cy.get('@burgerIcon_5').click();


cy.log('open reports page ');
cy.get('[id="module-anchor-reports"]',{timeout:40000}).should('exist').as('reportsTab_5');
cy.get('@reportsTab_5').click();


cy.log('open accounts section  ');
cy.get('[href="#reports__accounts"]',{timeout:40000}).should('exist').as('accountsTab_5');
cy.get('@accountsTab_5').click();


cy.log('open gross profit report');
cy.get('[href="/app/query-report/Gross Profit"]',{timeout:40000}).should('exist').as('grossProfitReport_5');
cy.get('@grossProfitReport_5').click();

cy.log('select company');
cy.get('button[class="btn btn-default toolbar-btn"]',{timeout:180000}).eq(2).should('exist');
cy.get('input[class="input-with-feedback form-control input-xs reqd"]:not([hidden])',{timeout:180000}).eq(0).focus().click().clear({force:true}).type("BusinessClouds (Demo)",{timeout:180000,  force: true });

cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })



cy.log('enter sales invoice name');
cy.get('@salesInvoiceSName').then((salesInvoiceSName) => {
cy.get('div[data-fieldname="sales_invoice"]:not([hidden])',{timeout:180000}).click({force:true}).type(salesInvoiceSName.trim());
});
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 }).click();


  /******** end of TC **************** */
});



it('TC08_create New Sales Invoice And Check In General Ledger Report',function () {

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

cy.log('click on sales Tab ');
cy.get('#module-anchor-Selling',{timeout:180000}).should('be.visible').as('salesTab_5')
cy.get('@salesTab_5').click({force:true});

cy.log('click on sales invoices Opt ');
cy.get('#sidebar-selling-invoice',{timeout:180000}).should('exist').as('salesInvoicesTab');
cy.get('@salesInvoicesTab').click({force:true});
cy.contains("مسودة",{timeout:300000}).should('be.visible');


cy.log('click on new sales invoice btn  ');
cy.contains('إضافة فاتورة المبيعات',{timeout:180000}).should('be.visible').click();
cy.contains('فاتورة المبيعات جديد',{timeout:180000});

cy.log('select customer ');
cy.get('[data-target="Customer"][placeholder=" "]',{timeout:180000}).eq(0).should('be.visible').click();
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').find('div').first().find('p').first({timeout: 180000 }).should('exist').should('be.visible').click({force:true});
  
cy.log('enter item name at sales invoice ');
cy.get('[data-fieldname="item_code"][class*="error bold"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('[data-fieldname="item_code"][class*="error bold"]',{timeout:180000}).should('exist').click();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]', { timeout: 30000 }).scrollIntoView({ force: true }).should('be.visible');
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName,{force:true});
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').click({force:true}).clear();
cy.get('input[data-fieldname="item_code"][placeholder="صنف"]',{timeout:180000}).should('be.visible').type(itemName);
cy.get('ul[role="listbox"]:not([hidden])', { timeout: 180000 }).should('exist').should('be.visible').find('div').first().find('p').first({timeout: 180000 })
 .should('have.attr', 'title', itemName).click({force:true});

cy.log('uncheck update stock checkbox');
cy.get('#update_stock ',{timeout:180000}).should('exist').click();
  
cy.log('click on save and submit btn');
cy.contains('حفظ واعتماد').should('exist').should('not.be.disabled').click();
cy.get('.btn.btn-primary.btn-sm.btn-modal-primary',{timeout:180000}).should('exist').should('be.visible').click();
cy.contains('واجهة',{timeout:60000}).should('exist');
cy.get('.label.label-success').scrollIntoView({ force: true });

cy.log('get status of sales invoice ');
cy.get('.label.label-success',{timeout:180000}).should('exist').should('be.visible')
.invoke('text').as('salesInvoiceStatus');

cy.get('@salesInvoiceStatus').then(value => {
  cy.log(`sales invoice status is  : ${value}`)});

  cy.log(' verify that the status of created sales invoice is submitted معتمد ')
  cy.get('@salesInvoiceStatus').then(name => {
  const cleanName = name.trim();
  expect(cleanName).to.contain(submittedStatus);
});
cy.log('get total amount of sales invoice ');
cy.get('div[data-fieldname="total"]',{timeout:180000}).eq(0).find('span[dir="rtl"]').scrollIntoView().should('be.visible')
.invoke('text').as('salesInvoiceTotalAmount');

cy.get('@salesInvoiceTotalAmount').then(value => {
  cy.log(`sales Invoice  Total Amount is  : ${value}`)});


cy.log('get grand total amount of sales invoice ');
cy.get('div[data-fieldname="grand_total"]',{timeout:180000}).eq(0).find('span[dir="rtl"]').scrollIntoView().should('be.visible')
.invoke('text').as('salesInvoiceSGrandTotalAmount');

cy.get('@salesInvoiceSGrandTotalAmount').then(value => {
  cy.log(`sales InvoiceS Grand Total Amount is  : ${value}`)});


cy.log('get name of sales invoice ');
cy.get('h3[class="ellipsis title-text"]',{timeout:180000}).eq(3).should('exist')
.invoke('text').as('salesInvoiceSName');

cy.get('@salesInvoiceSName').then(value => {
  cy.log(`sales InvoiceS name is  : ${value}`)});

cy.log('open general ledger report');
cy.get('button[class="btn btn-default toolbar-btn"]',{timeout:180000}).eq(2).should('exist').click();

cy.contains('موازنة دفتر الأستاذ').eq(0).should('be.visible').click();

cy.log('get value which exist at default debit account ');
cy.get('div[class="dt-cell__content dt-cell__content--col-3"]',{timeout:180000}).eq(2).should('exist')
.invoke('text').as('valueAtDefaultDebitAccountGL');

cy.get('@valueAtDefaultDebitAccountGL').then(value => {
  cy.log(`value which exist at default debit account is : ${value}`)});



cy.log('get value which exist at default income account ');
cy.get('div[class="dt-cell__content dt-cell__content--col-4"]',{timeout:180000}).eq(4).should('exist')
.invoke('text').as('valueAtDefaultIncomeAccountGL');

cy.get('@valueAtDefaultIncomeAccountGL').then(value => {
  cy.log(`value which exist at default income account is : ${value}`)});



cy.log("verify that Default Debit Account At GL has the same value of grand total Amount For Sales Invoice");

cy.get('@valueAtDefaultDebitAccountGL').then((debitGLValue) => {
  cy.get('@salesInvoiceSGrandTotalAmount').then((invoiceGrandTotal) => {

    const debitGL = debitGLValue.trim()
    const grandTotal = invoiceGrandTotal.trim()

    expect(debitGL).to.eq(grandTotal)
  })
})


cy.log("verify that Default income Account At GL has the same value of total Amount For Sales Invoice");
cy.get('@valueAtDefaultIncomeAccountGL').then((incomeGLValue) => {
  cy.get('@salesInvoiceTotalAmount').then((invoiceTotal) => {

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


