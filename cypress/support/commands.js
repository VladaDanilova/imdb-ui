Cypress.Commands.add("selectCategory", (category) => {
  cy.get('[for="navbar-search-category-select"]').click()
  return cy.get('[data-menu-id="navbar-search-category-select"]').contains(`${category}`).click()
})
