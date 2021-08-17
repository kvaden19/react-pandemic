// GAMEPLAY
    // Choose player order based on highest ranking city card
    // WHILE (outbreaks < 8 AND all disease.cubes > 0 AND playerCards not empty AND ! all disease.cured)
        // Set active player
        // For 4 actions:
            // Show player menu of options:
                // Drive
                // Direct Flight
                // Charter Flight
                // Shuttle Flight
                // Build Station
                // Treat
                // Share
                // Cure
        // Pop 2 items off playerCards into player.hand
            // if epidemic then handle:
                // get item from "opposite" side of array
                // infectionRate ++
                // randomize infectionDiscard, push onto infectionDeck, empty infectionDiscard
        // Pop infectionRate items off infectionDeck into infectionDiscard
            // city.cubes ++
    // Handle win or loss