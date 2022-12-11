import { selectCategory } from '../support/utils'
import { describeSection } from '../support/utils'
import { Search } from '../objects/search'

// test data
const paramsCategories = require('../fixtures/categories.json')
const paramsInput = require('../fixtures/input.json')
const hugeInput = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,'

describe('IMDB Search', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should find search input', () => {
      cy.get(Search.searchInput).should('be.visible')
  })

  it('should clear a text', () => {
      cy.get(Search.searchInput).type('test text').clear()
      cy.get(Search.searchInput).type('star wars')
      cy.get(Search.searchButton).click()
      cy.get(Search.resultsTitle).contains('star wars', { matchCase: false })
  })

  it('should search by clicking search button', () => {
      cy.get(Search.searchInput).type('star wars')
      cy.get(Search.searchButton).click()
      cy.get(Search.resultsTitle).contains('star wars', { matchCase: false })
  })

  it('should search by clicking a suggestion', () => {
      cy.get(Search.searchInput).type('star wars')
      cy.get(Search.firstSuggestion).click()
      cy.get(Search.searchedResult).contains('star wars', { matchCase: false })
  })

  // check search with different inputs
  it('should find all ', () => {
      paramsInput.forEach((testData) => {
          describeSection(testData.description, () => {
              cy.get(Search.searchInput).type(testData.input + '{enter}')
              cy.get(Search.resultsTitle).contains(testData.output, { matchCase: false })
          })
      })
  })

  it('should find all with no input', () => {
      cy.get(Search.searchInput).type(' {enter}')
      cy.get(Search.searchedResultNoData).contains('Search IMDb by typing a word or phrase in the search box at the top of this page.', { matchCase: false })
  })

  it('should find all with a lot of characters', () => {
      cy.get(Search.searchInput).type(hugeInput + ' {enter}')
      cy.get(Search.searchedResultNoData).contains('Something went wrong. Please reload the page and try again.', { matchCase: false })
  })

  // check search with different categories
  it('should find different categories', () => {
      paramsCategories.forEach((testData) => {
          describeSection(testData.category, () => {
              selectCategory(testData.category)
              cy.get(Search.searchInput).type(testData.name + '{enter}')
              cy.get(Search.resultHeader).contains(testData.header)
              cy.get('[data-testid='+testData.content+']').contains(testData.name, { matchCase: false })
          })
      })
  })

  it('should open Advanced Search', () => {
      selectCategory("Advanced Search")
      cy.get(Search.advancedResultHeader).contains("Advanced Search")
  })

})
