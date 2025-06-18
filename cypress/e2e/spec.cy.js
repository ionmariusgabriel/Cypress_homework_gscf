describe('template spec', () => {
  beforeEach(() => {
    logInWithCustomer("Harry Potter")
  })

  afterEach(() => {
    cy.get('.logout').click()
  })

  it('passes', () => {
    cy.get('[ng-click="deposit()"]').click()
    deposit(100)
    validateDepositedAmount(100)
    deposit(10)
    validateDepositedAmount(110)
    deposit(5)
    validateDepositedAmount(115)
  })

  function logInWithCustomer(customer){
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
    cy.get('[ng-click="customer()"]').click()
    cy.get('[id="userSelect"]').select(customer)
    cy.get('form.ng-valid > .btn').click()
  }

  function deposit(amount) {
    cy.get('.form-control').type(amount)
    cy.get('[type="submit"]').click()
    cy.get('[ng-show="message"]').should('have.text', 'Deposit Successful')
  }

  function validateDepositedAmount(amount) {
    cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('have.text', amount)
  }
})