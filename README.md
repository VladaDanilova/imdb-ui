Automation tests for the main search bar on the IMDB homepage, which lets users search for Movies, TV Shows, etc. and serves them with a list of results.

# How-to run tests:

## Clone a repository
Save project directly from the GitHub or use $ git clone

## Install Cypress
Install Cypress via npm:
```
cd /your/project/path
```
```
npm install cypress --save-dev
```
More infromation about other ways of installation can be found in the [documentation](https://docs.cypress.io/guides/getting-started/installing-cypress#What-you-ll-learn)

## Open the App
Now you can open Cypress from your project root one of the following ways:
Using npx

Note: npx is included with npm > v5.2 or can be installed separately.
```
npx cypress open
```
Or by using yarn
```
yarn run cypress open
```
The long way with the full path
```
./node_modules/.bin/cypress open
```
Or with the shortcut using npm bin
```
$(npm bin)/cypress open
```
After a moment, the Cypress Launchpad will open.  
Choose E2E Testing -> Chrome -> Start E2E Testing in Chrome.  
Then click on the search.cy.js. You will see running tests.  

# What did I choose to test, and why?
When I was writing tests I had such plan:  
1. Do positive tests to check that all items of the search work correctly  
User should be able to make a search by entering a text.  
User should be able to make a search by writing a text and clicking search button.  
User should be able to make a search by clicking on the first suggestion.  
User should be able to clear the search field.  
User should be able to change categories.  
User should be able to open Advanced Search.  
2. Do tests using test design techniques  
User should be able to misspell the word and have right search results.  
User should be able to use numbers, special characters, emojies and have right search results.  
User should be able to use different case sensitivity and have right search results.  
User should be able to use whitespaces around the text and have right search results.  
User should be able to use another language and have right search results.  
3. Do negative tests to check how the search will react  
User should be able to have an empty search and receive the message about no results.  
User should be able to have a huge text for search and receive the message about error.  

# How are your files structured, and why?
The project has a standard structure.  
After adding a new project, Cypress will automatically scaffold out a suggested folder structure.  
Test files are located in cypress/e2e by default.  
Fixtures are used as external pieces of static data that can be used by tests. Fixture files are located in cypress/fixtures by default.  
File where you add your commonly used functions and custom Commands is located in cypress/support.  
When we first time open Cypress Test Runner, it creates a cypress.config.js file at the root of the project. It is used to pass any configuration values we require.  
Also I added folder for objects where I store web elements.  

# How else might you have done things?
TypeScript can be used instead of JavaScript because TypeScript uses concepts like types and interfaces to describe data being used.  

# How might you expand on these tests in future?
I would add more tests for:  
1. a suggestion field and results to check relevance of responses  
2. checking search behaviour with different language site settings  
3. checking search behaviour with logged in user (search history)  

# How did you overcome any technical challenges you encountered?
I had a challenge with writing parametrized tests because I needed to send several inputs and I had no idea how I can do it. The problem was solved by reading information about fixtures.  
Also it was not always been easy to write selectors by using Cypress suggestions, so I used Developer Tools in the browser.  
