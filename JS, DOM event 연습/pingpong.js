const p1 = {
    num: [1,'one'],
    playScore : 0,
    setScore : 0,
    button : document.querySelector('#p1Button'),
    playDisplay: document.querySelector('#p1Display'),
    setDisplay : document.querySelector('#p1SetDisplay'),
    input : document.querySelector('#p1Input'),
    btnTag : 'tag is-primary'

}

const p2 = {
    num: [2,'two'],
    playScore : 0,
    setScore : 0,
    button : document.querySelector('#p2Button'),
    playDisplay: document.querySelector('#p2Display'),
    setDisplay : document.querySelector('#p2SetDisplay'),
    input : document.querySelector('#p2Input'),
    btnTag : 'tag is-info'
}

const setPlayerName = document.querySelector('#playersNameBtn');
setPlayerName.addEventListener('click', function(){
    for (let p of [p1,p2]) {
        const inputValue = p.input.value
        p.button.innerText = `+ 1 ${inputValue}`;
    }
})


const playResetBtn = document.querySelector('#playResetBtn');

let isGameOver = false;

let winningScore = 3;
let winningScoreSelect = document.querySelector('#playTo');
let endSetScore = 3;

winningScoreSelect.addEventListener('change', function(){
    winningScore = parseInt(this.value)
    reset();
})

function ctrlColorBtn (player, opponent) {
    isGameOver= true;
    player.playDisplay.classList.add('has-text-success')
    opponent.playDisplay.classList.add('has-text-danger')
    player.button.disabled = true;
    opponent.button.disabled = true;
}

function updateScores (player, opponent) {
    if (!isGameOver) {
        player.playScore += 1; }
        if (player.playScore === winningScore) {
            ctrlColorBtn(player, opponent);
            player.setScore += 1;
            player.setDisplay.textContent = player.setScore;
            if (player.setScore === endSetScore) {
                alert(`Congratulation! ${player.input.value} is the king of pingpong!`)
                playResetBtn.disabled = true;
                ctrlColorBtn (player, opponent);
            }
        } 
        player.playDisplay.textContent = player.playScore;
}



const latestContainer = document.querySelector('#latestLine')
const latestScore = document.createElement('span')

function createTag(p) {
        latestContainer.append(latestScore)
        latestScore.setAttribute('class',`${p.btnTag}`)
        latestScore.classList.add("ml-2")
        latestScore.innerText = `+1 ${p.input.value}`
        if (p.input.value === "") {
            latestScore.innerText = `+ 1 Player ${p.num[1]}`
        }
        
}
  

p1Button.addEventListener('click',function(){
    updateScores(p1,p2)
    createTag(p1);
    
})
p2Button.addEventListener('click',function(){
    updateScores(p2,p1)
    createTag(p2);
})


function reset() {
    isGameOver = false;
    for (let p of [p1,p2]) {
        p.playScore = 0;
        p.playDisplay.textContent = 0;
        p.playDisplay.classList.remove('has-text-success', 'has-text-danger')
        p.button.disabled = false;
    }
}

playResetBtn.addEventListener('click',reset);

function setReset() {
    reset()
    for (let p of [p1,p2]) {
        p.setScore = 0;
        p.setDisplay.textContent = 0
        p.setDisplay.classList.remove('has-text-success', 'has-text-danger')
        p.input.value = "";
        p.button.innerText= `+${p.num[0]} Player ${p.num[1]}`;
        latestScore.setAttribute('class', "")
        latestScore.innerText="";
    }
    playResetBtn.disabled = false;
}

setBtn.addEventListener('click',setReset);