const htmlHandler = require('./htmlResponses.js');

// Creating an example character to start so it's clear how they work.
const characters = [];
const exampleCharacter = {
  name: 'Billy Bob',
  class: 'Rogue',
  str: 'HIGH',
  dex: 'LOW',
  con: 'AVERAGE',
  int: 'HIGH',
  wis: 'LOW',
  cha: 'HIGH',
  power: 'LOW',
  alignment1: 'NEUTRAL',
  alignment2: 'CHAOTIC',
  description: 'Billy Bob is a farm worker who steals crops from his boss.',
};
characters.push(exampleCharacter);  // Characters can just be pushed the to array for now.

// Gets the list of all characters.  Filters that list to certain query's if queries were used.
const getCharacterList = (request, response, returnBody, urlParsed) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  if (!returnBody) {
    response.end();
    return;
  }

  const queryList = urlParsed.query;
  const length = characters.length;

  const keys = Object.keys(queryList);

  let output = '[ ';// Spare space to take note of later.
  for (let i = 0; i < length; ++i) {
    let toBeAdded = true;
    // check if any queries that exist are being met.
    for (let j = 0; j < keys.length; ++j) {
      // Queries will NOT be case sensitive
      if (characters[i][keys[j]].toLowerCase() !== queryList[keys[j]].toLowerCase()) {
        toBeAdded = false;
        break;
      }
    }

    if (toBeAdded) {
      output += (`{"id": "${i}","name": "${characters[i].name}"},`);
    }
  }
  output = `${output.substring(0, output.length - 1)}]`;// Need to make sure that the comma
  // is removed afterwards.  If there are no results, then the spare space mentioned
  // previously will get eaten instead and it'll just be an empty array.
  response.end(output);
};

// Gets a specific character's data by ID.
const getCharacter = (request, response, returnBody, id) => {
  const idInt = parseInt(id, 10);

  // Send a 400 if the user doesn't ask for data within bounds.
  if (idInt >= characters.length || idInt < 0) {
    htmlHandler.badRequest(request, response, returnBody);
    return;
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });

  if (!returnBody) {
    response.end();
  }

  response.write(JSON.stringify(characters[idInt]));
  response.end();
};

// Adds a character's data to the matrix.
const addCharacter = (request, response, characterInfo) => {
  // character object created from scratch to keep data at minimum.
  const newCharacter = {};
  newCharacter.name = characterInfo.name;
  newCharacter.class = characterInfo.class;
  newCharacter.str = characterInfo.str;
  newCharacter.dex = characterInfo.dex;
  newCharacter.con = characterInfo.con;
  newCharacter.int = characterInfo.int;
  newCharacter.wis = characterInfo.wis;
  newCharacter.cha = characterInfo.cha;
  newCharacter.power = characterInfo.power;
  newCharacter.alignment1 = characterInfo.alignment1;
  newCharacter.alignment2 = characterInfo.alignment2;
  newCharacter.description = characterInfo.description;

  characters.push(newCharacter);
};

module.exports.getCharacterList = getCharacterList;
module.exports.getCharacter = getCharacter;
module.exports.addCharacter = addCharacter;
