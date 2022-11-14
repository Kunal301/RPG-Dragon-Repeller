// let xp = 0;
let health = 100;
let gold = 100;
let currentweapon = 0;
let fighting;
let monsterhealth;
let inventory = ['stick'];

//this is how we insert a property in css selectors
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats= document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
 
const weapons = [
    {
        name: 'sticky',
        power: 100
    },
    {
        name: 'sword',
        power: 150
    },
    {
        name: 'pistol',
        power: 200
    },
    {
        name: 'rifle',
        power: 300
    }
];

const locations = [
    {
        name: 'town square',
        "button text": ['Go to Store','Go to Cave', 'Fight Dragon'],
        'button functions': [goStore,goCave,fightDragon],
        text: 'You are in the town square. You see a sign that says \"store.\"'
    },
    {
        name : 'Store',
        "button text": ['Buy 10 health (10 gold)','Buy weapon (30 gold)', 'Go to town square'],
        'button functions': [buyHealth,buyWeapon,goTown],
        text: 'You enter the store'
    },
    {
        name : 'cave',
        "button text": ['Fight slime','Fight fanged beast', 'Go to store'],
        'button functions': [fightSlime,fightBeast,goStore],
        text: 'You enter the cave. You see some monsters'
    },
    {
        name : 'fight',
        "button text": ['Attack','Dodge', 'Run'],
        'button functions': [attack,dodge,goTown],
        text: 'You are fighting a monster.'
    },
    {
        name : 'kill monster',
        "button text": ['Go to town square','Go to town square', 'Go to town square'],
        'button functions': [goTown,goTown,easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold'
    },
    {
        name: 'lose',
        "button text": ['REPLAY?','REPLAY?', 'REPLAY?'],
        'button functions': [restart,restart,restart],
        text: 'You die.'
    },
    {
        name: 'win',
        "button text": ['REPLAY?','REPLAY?', 'REPLAY?'],
        'button functions': [restart,restart,restart],
        text: 'You defeat the dragon! YOU WIN THE GAME!. 😎'
    },
    {
        name: "easter egg",
        "button text": ['2','8', 'Go to town square?'],
        'button functions': [pickTwo,pickEight,goTown],
        text: 'You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!'
    }
];

const monsters = [
      {
        name: 'slime',
        level: 2,
        health: 15
    },
      {
        name: 'fanged beast',
        level: 8,
        health: 60
    },
      {
        name: 'dragon',
        level: 20,
        health: 300 
      }
];

//initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//this are the functions which will do the work of action

function Update(location)
{
    monsterStats.style.display = "none";
    button1.innerText = location['button text'][0];
    button2.innerText =location['button text'][1];
    button3.innerText = location['button text'][2];
    button1.onclick = location['button functions'][0];
    button2.onclick = location['button functions'][1];
    button3.onclick = location['button functions'][2];
    text.innerText = location.text;
}
goldText.innerText = gold;
function goTown()
{
   Update(locations[0]); 
}
function goStore()
{
  Update(locations[1]);
}
function goCave()
{
    Update(locations[2]);
    
}


function buyHealth()
{
    if(gold >= 10)
    {
    gold-=10;
    health +=10;
    goldText.innerText = gold;
    healthText.innerText = health;
    }
    else
    {
        goldText.innerText = 'Go to store';
    
        text.innerText = 'You do not have enough gold to buy health.';
    }
    
}
function buyWeapon()
{
    if(currentweapon < weapons.length-1)
   {
   if(gold >=30)
   {
    gold -= 30;
    currentweapon++; 
    goldText.innerText = gold;
    let newWeapon = weapons[currentweapon].name;
    text.innerText = 'You now have a '  + newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText += ' In your inventory you have: '  + inventory + ".";
   }
   else
   {
    text.innerText = 'you do not have enough gold to buy a weapon. ';
   }
   
   }
   else{
    text.innerText = 'You have the most powerful weapon! ';
    button2.innerText = 'Sell weapon for 15 gold. ';
    button2.onclick = sellWeapon;
}

function sellWeapon()
{
    if(inventory.length > 1)
    {
        gold +=15;
        goldText.innerText = gold;
        let currentweapon = inventory.shift();
        text.innerText = 'You sold a ' + currentweapon + ". ";
        text.innerText = text.innerText  + ' In your inventory you have: ' + inventory;
    }
    else
    {
        text.innerText = 'You are left with only 1 weapon in your inventory. You cannot sell that weapon. ';
    }
}
}

//fighting monsters


function fightSlime()
{
       fighting = 0;
       goFight();
}
function fightBeast()
{
      fighting = 1;
      goFight();
}

function fightDragon()
{
    fighting = 2;
    goFight();
}

function goFight()
{
    Update(locations[3]);
    monsterhealth = monsters[fighting].health;
    monsterStats.style.display = 'block'; 
    monsterHealthText.innerText = monsterhealth; 
    monsterNameText.innerText = monsters[fighting].name;
}

function attack()
{
   text.innerText = 'The ' + monsters[fighting].name; + " attacks. "; 
   text.innerText +=  ' You attack it with your ' + weapons[currentweapon].name ; + "."; 

   if(isMonsterHit())
   {
    health -= getMonsterAttackValue(monsters[fighting].level);
   }
   else
   {
    text.innerText += 'You miss.';
   }
   monsterhealth -= weapons[currentweapon].power + Math.floor(Math.random() * xp);
   healthText.innerText = health;
   if(health <=0)
   {
    lose();
   }
   else if(monsterhealth <=0)
   {
      fighting ===2 ? winGame() : defeatMonster();
   }

   if(Math.random() <= .1  && inventory.length !==1)
   {
        text.innerText += ' Your ' + inventory.pop() + " breaks ";
        currentweapon--;
   }

}
function getMonsterAttackValue(level)
{
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}
function dodge()
{
   text.innerText = 'You dodge the attack from the ' + monsters[fighting].name + ".";
}

function defeatMonster()
{
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    return hit;
}
function isMonsterHit()
{
    return Math.random() > .2 || health < 20;
}

function lose()
{
    Update(locations[5]);
}
function winGame()
{
    Update(location[6]);
}
function restart()
{
    xp = 0;
    health = 100;
    gold = 50;
    currentweapon = 0;
    inventory = ["stick"];
    goldText. innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();

}

function easterEgg()
{
    Update(locations[7]);
}
function pickTwo()
{
   pick(2);
}
function pickEight()
{
    pick(8);
}

function pick()
{
    let numbers = [];
    while(numbers.length < 10)
    {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = 'You picked ' + guess + ".   Here are the random numbers:\n";

for (let i = 0; i< 10; i++)
{
    text.innerText += numbers[i] + "\n";

}
if(numbers.indexOf(guess) !== -1)
{
    text.innerText += 'Right! You win 20 gold!'
gold += 20;
goldText.innerText = health;
}
else
{
    text.innerText += 'wrong! You lose 10 health!'
gold -=10;
goldText.innerText = health;
if(health <=0)
{
    lose();
}
}

}
