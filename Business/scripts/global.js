
//#region "Variables"

var gameStarted = false;
var diceRolled = false;
var isChanceOn = false;
var gameOver = false;

var diceVal1 = 0;
var diceVal2 = 0;
var diceValTotal = diceVal1 + diceVal2;
var consecutiveDoubles = 0;

var currPlayer = 0;
var nmbrOfPlayers = 2;

var board = [];
var players = [];
var logs = [];

var chances = [];
var chests = [];

//#endregion "Variables"

//#region "Constants"

const rupeeSym = "&#x20b9;";
const propertyColorGroups = [[],[1,3],[6,8,9],[11,13,14],[16,18,19],[21,23,24],[26,27,29],[31,32,34],[37,39]];

//#endregion "Constants"


function removeDuplicates(arr)
{
    return arr.filter((value,index)=> arr.indexOf(value) === index);
}