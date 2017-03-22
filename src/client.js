const characterRequest = new XMLHttpRequest();
const characterListRequest = new XMLHttpRequest();
const inputRequest = new XMLHttpRequest();
const url = '/character?id=';
const characterListUrl = '/characters';
// Response when a specific character's details is requested from the server.
characterRequest.onreadystatechange = () => {
  if (characterRequest.readyState === XMLHttpRequest.DONE
    && characterRequest.status === 200) {
    const character = JSON.parse(characterRequest.responseText);

    let output = '';

    output += `<h2>${character.name}</h2>`;
    output += `<h3><i>${character.class}</i></h3>`;
    output += `<li>Strength: ${character.str}</li>`;
    output += `<li>Dexterity: ${character.dex}</li>`;
    output += `<li>Consitution: ${character.con}</li>`;
    output += `<li>Intelligence: ${character.int}</li>`;
    output += `<li>Wisdom: ${character.wis}</li>`;
    output += `<li>Charisma: ${character.cha}</li>`;
    output += `<li>Power: ${character.power}</li>`;
    output += `<li>Alignment1: ${character.alignment1}</li>`;
    output += `<li>Alignment2: ${character.alignment2}</li>`;
    output += `<p>Description: ${character.description}</p>`;

    document.getElementById('output').innerHTML = output;
    document.getElementById('output').className = '';
    document.getElementById('characters').className = 'hidden';
    document.getElementById('input').className = 'hidden';
  }
};
// Reponse when asking for just the listing of characters
characterListRequest.onreadystatechange = () => {
  if (characterListRequest.readyState === XMLHttpRequest.DONE
    && characterListRequest.status === 200) {
    const characterList = JSON.parse(characterListRequest.responseText);

    let output = '';
    for (let i = 0; i < characterList.length; ++i) {
      output += `<li class="button characterButton"  onclick="RequestCharacter(${
       characterList[i].id})">${characterList[i].name}</li>`;
    }

    document.getElementById('characters').innerHTML = output;
    document.getElementById('output').className = 'hidden';
    document.getElementById('characters').className = '';
    document.getElementById('input').className = 'hidden';
  }
};
function RequestCharacter(id) {
  characterRequest.open('GET', url + id, true);
  characterRequest.setRequestHeader('Accept', 'application/json');
  characterRequest.send();
}
function GetRadio(name) {
  if (document.getElementById(`${name}1`).checked) {
    return document.getElementById(`${name}1`).value;
  }
  if (document.getElementById(`${name}2`).checked) {
    return document.getElementById(`${name}2`).value;
  }
  return document.getElementById(`${name}0`).value;
}

function UpdateList() {
  characterListRequest.open('GET', characterListUrl, true);
  characterListRequest.setRequestHeader('Accept', 'text/plain');
  characterListRequest.send();
}

function AddCharacter() {
  let output = '';

  output += `name=${document.getElementById('f_name').value}&`;
  output += `class=${document.getElementById('f_class').value}&`;
  output += `str=${GetRadio('f_str_')}&`;
  output += `dex=${GetRadio('f_dex_')}&`;
  output += `con=${GetRadio('f_con_')}&`;
  output += `int=${GetRadio('f_int_')}&`;
  output += `wis=${GetRadio('f_wis_')}&`;
  output += `cha=${GetRadio('f_cha_')}&`;
  output += `power=${GetRadio('f_power_')}&`;
  output += `alignment1=${GetRadio('f_align1_')}&`;
  output += `alignment2=${GetRadio('f_align2_')}&`;
  output += `description=${document.getElementById('f_desc').value}&`;
  inputRequest.open('POST', '/input');
  inputRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  inputRequest.setRequestHeader('Accept', 'text/plain');
  inputRequest.setRequestHeader('Accept', 'text/*');
  inputRequest.setRequestHeader('Accept', '*/*');
  inputRequest.send(output);

  UpdateList();
}

function OpenForm() {
  document.getElementById('output').className = 'hidden';
  document.getElementById('characters').className = 'hidden';
  document.getElementById('input').className = '';
}


UpdateList();
