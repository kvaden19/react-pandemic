# React Pandemic

## TODOs

### Architecture Notes
    - There should only be ONE copy of each City OBJECT
    - The Infection Deck and Player Decks should be lists of the city names
    - When City method calls are needed, use the cityName to reference the object in masterCities
    - const n = this.state.masterCities.findIndex(city => city.cityName === card);

### Render & Style Components (6)
- Make Header prettier
- On launch, New Game button should show INSTEAD of player cards
- PlayerStatus should show playerName and markerColor
- Make PlayerStatus prettier
- One Counter should show Infection count
- One Counter should show Outbreak count
- Make Counters prettier
- DiseaseStatus should show disease cured and eradicated
- Make DiseaseStatus prettier
- Make Footer prettier
- Make Warning prettier
- Action Modal will need to sit at top of screen so player can see board

### Design Map (2)
- Design Map
- Map overlaps footer on laptop screen

### Initialize Everything (2)
- Initialize cities

********** MVP Complete **********

### Tweaks
- Either generalize setup for # of epidemics or remove the epidemic dropdown
- Check for eradicated disease and implications
- Check for player hand > 7 and implications
- Allow destination selection by clicking map rather than entering name

### Cosmetic Stuff
- Add markerColor to player object (during init and in object constructor itself)
- Player Info:
    - Show color instead of text
    - Wipe form between players
    - Colors should pop off the options array once chosen

#### Future Work
- Validation & Error checking
- 7 Player subclasses
- 5 Event subclasses