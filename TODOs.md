# React Pandemic

## TODOs

### Render & Style Components & Test (4)
- Make DiseaseStatus prettier
    - DiseaseStatus should show disease cured and eradicated
- Make Footer prettier
- Make Warning prettier
- Write turn alert modal
- Write card-draw modal
- Write cards-in-hand component
- Player Card should have a button to show hand
- Refactor UI: Action menus should become dropdowns off Player Card

https://flatuicolors.com/palette/ca

### Design Map (2)
- Design Map (inc city markers, player markers, disease markers)
- Map overlaps footer on laptop screen

### Initialize Everything (1)
- Initialize cities

********** MVP Complete **********

### Tweaks
- Either generalize setup for # of epidemics or remove the epidemic dropdown
- Check for eradicated disease and implications
- Check for player hand > 7 and implications
- Allow destination selection by clicking map rather than entering name
- Some things may need to get refactored with promises. Seems like state variable updates aren't as fast relative to other code.
- Infection rate isn't quite right. Needs to be an array of [2, 2, 3, 3, 3, 4] or something

### Cosmetic Stuff
- Player Setup:
    - Show color instead of text
    - Wipe form between players
    - Colors should pop off the options array once chosen

#### Future Work
- Validation & Error checking
- 7 Player subclasses
- 5 Event subclasses