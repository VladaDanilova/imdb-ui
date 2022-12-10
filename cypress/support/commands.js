Cypress.Commands.add("selectCategory", (category) => {
  cy.get('[for="navbar-search-category-select"]').click()
  return cy.get('[class="ipc-menu__items mdc-menu__items"]').contains(`${category}`).click()
})
