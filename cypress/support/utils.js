export function describeSection(text, fn) {
  cy.log(text)
  fn()
}