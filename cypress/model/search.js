export class Search {
    static searchInput = 'input[id="suggestion-search"]'
    static searchButton = '[id="suggestion-search-button"]'
    static resultsTitle = '[data-testid="find-results-section-title"]'
    static firstSuggestion = '[id="react-autowhatever-1--item-0"]'
    static searchedResult = '[id="widget-nav"]'
    static searchedResultNoData = '[id="__next"]'
    static resultHeader = 'h3[class="ipc-title__text"]'
    static advancedResultHeader = '[id="header"]'
    static noInputMessage = 'Search IMDb by typing a word or phrase in the search box at the top of this page.'
    static hugeInputMessage = 'Something went wrong. Please reload the page and try again.'
}

export function selectCategory(category) {
    cy.get('[for="navbar-search-category-select"]').click()
    return cy.get('[data-menu-id="navbar-search-category-select"]').contains(`${category}`).click()
}