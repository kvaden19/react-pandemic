// This might all be getting moved into App? These variables may all be state variables. 
// Define variables:
    let startingHand = 0;
    let numberEpidemics = 0;
    let numberOutbreaks = 0;
    let infectionRate = 2;
    let masterCities = [];
    let infectionDiscard = [];
    let playerDiscard = [];

// Interactive setup (1)
    // Wrap Modal in a form
        // On submit, hold # of players in state
        // set startingHand to 2, 3, or 4
        // Loop through # of players (use onCloseModal and onOpenModal to cycle through)
            // Prompt: What is Player X's name?
            // Prompt: Choose color (dropdown of colors)
            // construct Player object
    // Last Modal / form: How many Epidemics? (dropdown of options 4, 5, 6)
        // set epidemics to 4, 5, 6
    // Do I really need Materialize CSS?

// Game setup (1)
    // Construct all City objects (just do NA to start)
        // Set atlanta.research == true
        // Set all player.locations to atlanta
    // Set up 4 disease objects
        // Colors red, blue, yellow, black
        // Cured and Eradicated set to false
        // Cubes = 96
    // Push all City objects onto masterCities array; rank by population
        // let infectionDeck = a copy of masterCities
        // let playerCards = copy of masterCities
        // randomize both
    // for (3, 2, 1):
        // pop off 3 items from infectionCards; add to infectionDiscard
        // add # disease cubes to each
    // pop startingHand number of strings off playerCards and onto player.hand
    // shuffle in Epidemic cards
        // divide playerCards into difficulty # of subarrays
        // push one 'epidemic' string onto each array and randomize
        // combine subarrays