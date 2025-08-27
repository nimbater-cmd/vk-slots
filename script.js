const symbols = ['🍒', '🍋', '🔔', '⭐', '🍉', '🍇', '7️⃣', '💎'];
let balance = 0;
const spinCost = 10;

const balanceEl = document.getElementById('balance');
const reels = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];
const spinBtn = document.getElementById('spin-btn');
const resultEl = document.getElementById('result');

VK.init();

VK.Auth.getLoginStatus(function (response) {
  if (response.session) {
    balance = 100;
    balanceEl.textContent = balance;
  } else {
    VK.Auth.login(function (res) {
      if (res.session) {
        balance = 100;
        balanceEl.textContent = balance;
      }
    });
  }
});

function spin() {
  if (balance < spinCost) {
    resultEl.textContent = "❌ Недостаточно монет!";
    return;
  }

  balance -= spinCost;
  balanceEl.textContent = balance;
  resultEl.textContent = "Крутим...";
  spinBtn.disabled = true;

  const spins = [randomSymbol(), randomSymbol(), randomSymbol()];

  let steps = 0;
  const interval = setInterval(() => {
    reels[0].textContent = randomSymbol();
    reels[1].textContent = randomSymbol();
    reels[2].textContent = randomSymbol();
    steps++;

    if (steps >= 10) {
      clearInterval(interval);
      reels[0].textContent = spins[0];
      reels[1].textContent = spins[1];
      reels[2].textContent = spins[2];
      checkWin(spins);
      spinBtn.disabled = false;
    }
  }, 100);
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function checkWin(symbols) {
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
    let winAmount = 50;
    if (symbols[0] === '7️⃣') winAmount = 200;
    if (symbols[0] === '💎') winAmount = 500;
    balance += winAmount;
    resultEl.innerHTML = `🎉 Вы выиграли <b>${winAmount}</b> монет!`;
  } else {
    resultEl.textContent = "Повезёт в следующий раз!";
  }
  balanceEl.textContent = balance;
}