/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach((game) => {
        const infoGame = document.createElement("div")
        infoGame.classList.add("game-card")
        infoGame.innerHTML = `
            <img class="game-img" src="${game.img}"/> 
            <p>${game.name} </p> 
            <p>${game.description}</p>
            <p>${game.backers}</p>
        `
        gamesContainer.appendChild(infoGame);
    });
}
addGamesToPage(GAMES_JSON)


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const tot_contri = GAMES_JSON.reduce((acc, game) => { 
    return acc + game.backers
}, 0)


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <p>${tot_contri.toLocaleString('en-US')}</p>
`


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const tot_raised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged
}, 0)

// set inner HTML using template literal
raisedCard.innerHTML = `
    <p>$${tot_raised.toLocaleString('en-US')}</p>
`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totNumGames = GAMES_JSON.reduce((acc, games) => { // reduce(function, 0)
    return acc + 1;
}, 0)
gamesCard.innerHTML = `<p id="total-games">${totNumGames.toLocaleString('en-US')}</p>`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const UnfundedOnly = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal}
    )
    addGamesToPage(UnfundedOnly)
}

    // use filter() to get a list of games that have not yet met their goal
    function filterFundedOnly () {
        deleteChildElements(gamesContainer);
        const fundedOnly = GAMES_JSON.filter((game) => {
            return game.pledged > game.goal}
        )
        addGamesToPage(fundedOnly)
        }

// show all games
function showAllGames() {
    addGamesToPage(GAMES_JSON);   
        deleteChildElements(gamesContainer);
    
        // add all games from the JSON data to the DOM
        addGamesToPage(GAMES_JSON)
    }
    showAllGames();
    
    // select each button in the "Our Games" section
    const unfundedBtn = document.getElementById("unfunded-btn");
    const fundedBtn = document.getElementById("funded-btn");
    const allBtn = document.getElementById("all-btn");
   
// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly)
fundedBtn.addEventListener('click', filterFundedOnly)
allBtn.addEventListener('click', showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unFundedGames = GAMES_JSON.reduce((acc, games) => {
    if (games.pledged < games.goal) {
        return acc + 1
    } else { 
        return acc
    }
}, 0)
console.log(unFundedGames)

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${tot_raised.toLocaleString()} has been raised across ${totNumGames} game${totNumGames > 1 ? 's' : ''}.Currently, ${unFundedGames} game${unFundedGames === 1 ? '' : 's'} remain unfunded.`
;

// create a new DOM element containing the template string and append it to the description container
const newElem = document.createElement("p")
newElem.innerHTML = displayStr
descriptionContainer.appendChild(newElem);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topFoundedGame, runnerUpGame, ...other] = sortedGames;

const topdisplay = `
    <p>${topFoundedGame.name}</p>
`
const newP = document.createElement("p")
newP.innerHTML = topdisplay
// create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.appendChild(newP)

// do the same for the runner up item
const howToReadMindsElement = document.createElement("p"); 
howToReadMindsElement.textContent = runnerUpGame.name;
secondGameContainer.appendChild(howToReadMindsElement);