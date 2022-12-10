describe('IMDB Search', () => {

  // test data
  const paramsCategories = require('../fixtures/categories.json');
  const paramsInput = require('../fixtures/input.json');
  const hugeInput = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,'

  beforeEach(() => {
    cy.visit('/')
  })

  it('can clear a text', () => {
      // write and clear the text
      cy.get('input[id="suggestion-search"]').type('test text').clear()
      // write a new text
      cy.get('input[id="suggestion-search"]').type('star wars')
      // click search button
      cy.get('[id="suggestion-search-button"]').click()
      // check that search results have the new text
      cy.get('[data-testid="find-results-section-title"]').contains('star wars', { matchCase: false })
  });

  it('can search by clicking search button', () => {
      // write a text
      cy.get('input[id="suggestion-search"]').type('star wars')
      // click search button
      cy.get('[id="suggestion-search-button"]').click()
      // check that there is the searched item
      cy.get('[data-testid="find-results-section-title"]').contains('star wars', { matchCase: false })
  });

  it('can search by clicking a suggestion', () => {
      // write a text
      cy.get('input[id="suggestion-search"]').type('star wars')
      // click on the first result
      cy.get('[id="react-autowhatever-1--item-0"]').click()
      // check that there is the searched item
      cy.get('h1').contains('star wars', { matchCase: false })
  });

  // check search with different inputs
  paramsInput.forEach((test) => {
      it('can find all with different inputs', () => {
        // enter text for the search
        cy.get('input[id="suggestion-search"]').type(test.input + '{enter}')
        // check that there is the searched item
        cy.get('[data-testid="find-results-section-title"]').contains(test.output, { matchCase: false })
  })
  });

  it('can find all with no input', () => {
      // enter whitespace for the search
      cy.get('input[id="suggestion-search"]').type(' {enter}')
      // check that there is a message
      cy.get('[id="__next"]').contains('Search IMDb by typing a word or phrase in the search box at the top of this page.', { matchCase: false })
  });

  it('can find all with a lot of characters', () => {
      // enter a huge text for the search
      cy.get('input[id="suggestion-search"]').type(hugeInput + ' {enter}')
      // check that there is a message
      cy.get('span').contains('Something went wrong. Please reload the page and try again.', { matchCase: false })
  });

  // check search with different categories
  paramsCategories.forEach((test) => {
      it('can find different categories', () => {
        // select a category
        cy.selectCategory(test.category)
        // enter text for the search
        cy.get('input[id="suggestion-search"]').type(test.name + '{enter}')
        // check that there is a title block
        cy.get('h3[class="ipc-title__text"]').contains(test.header)
        // check that there is the searched item
        cy.get('[data-testid='+test.content+']').contains(test.name, { matchCase: false })
      });
  });

  it('can open Advanced Search', () => {
      // select Advanced Search
      cy.selectCategory("Advanced Search")
      // check the header of the result
      cy.get('[id="header"]').contains("Advanced Search")
  });

})
