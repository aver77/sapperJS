'use strict'

window.addEventListener('DOMContentLoaded',() => {
    const table = document.querySelector('table'),
      tableTD = document.querySelectorAll('td'),
      restartTable = document.querySelector('.table__game-restart'),
      resultsTableofTable = document.querySelector('.table__game-getResults'),
      bombs = 1;
const resultsTable = document.createElement('div'),
      allTable = document.querySelector('.modal');
      resultsTable.classList.add('modal__info-text');
let clicks = 0,
    obj = {
        wins: 0,
        losses: 0
    };
console.dir(tableTD);

addBombs();

resultsTableofTable.addEventListener('click',(event) => {
    allTable.classList.toggle('hide');
})

table.addEventListener('click',(event) => {

    event.preventDefault();
    const target = event.target;
    if (target && target.nodeName == "TD" && !target.classList.contains('bomb'))
    {
        target.classList.add('green');
        clicks++;
    } 
    else if (target.classList.contains('bomb'))
    {
        tableTD.forEach(item => {
            if (item.nodeName == "TD" && item.classList.contains('bomb'))
            {
                item.classList.add('red');
            }
        })
        alert('Вы проиграли!');
        obj.losses++;
        setTimeout(() => {
            loseOrRestart();
        },1500);
    }
    countWins();
})

restartTable.addEventListener('click',loseOrRestart);

function loseOrRestart () {
    setWinsAndLosses(obj.wins,obj.losses);
    clicks = 0;
    tableTD.forEach(item => {
        if (item.nodeName == "TD" && item.classList.contains('green'))
        {
            item.classList.remove('green');
        }
        if (item.nodeName == "TD" && item.classList.contains('red'))
        {
            item.classList.remove('red');
        }
        if (item.nodeName == "TD" && item.classList.contains('bomb'))
        {
            item.classList.remove('bomb');
        }
    });

    addBombs();
}

function addBombs() {
    for (let i=0;i<bombs;i++)
    {
        let bombDigit = randomInteger(0,tableTD.length - 1)
        tableTD[bombDigit].classList.add('bomb');
        ////цвет должен быть не видным
    }
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function countWins () {
    if (clicks == 15) {
        alert('Вы выиграли!')
        obj.wins++;
    }
}

const winsFromHT = document.querySelector('.resultsTable-wins'),
      lossesFromHT = document.querySelector('.resultsTable-losses');
function setWinsAndLosses(wins,losses) {
    winsFromHT.innerHTML = wins;
    lossesFromHT.innerHTML = losses;
}

})