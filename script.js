const cryptoData = {
  Bitcoin: 10000,
  Ethereum: 3000,
  Ripple: 500,
  Crypto1: 2000,
  CryptoB: 50000,
  Litecoin: 250,
  Cardano: 1500,
  Polkadot: 800,
  Stellar: 300,
  Chainlink: 2200,
  Uniswap: 1000,
  Dogecoin: 0.5,
  Solana: 1300,
  Monero: 400,
  Tezos: 350,
  Cosmos: 900,
  Aave: 500,
  Maker: 2500,
  Compound: 750,
  Yearn: 9000
};

let balance = 100000;
let wishlist = [];
let holdings = {};

function navigate(page) {
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('wishlistPage').style.display = 'none';
  document.getElementById('holdingsPage').style.display = 'none';
  document.getElementById(`${page}Page`).style.display = 'block';

  if (page === 'home') {
    renderHomePage();
  } else if (page === 'wishlist') {
    renderWishlistPage();
  } else if (page === 'holdings') {
    renderHoldingsPage();
  }
}

function renderHomePage() {
  const homePage = document.getElementById('homePage');
  homePage.innerHTML = '';

  Object.keys(cryptoData).forEach(token => {
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement('p');
    name.textContent = token;

    const price = document.createElement('p');
    price.textContent = `$${cryptoData[token]}`;

    const purchaseBtn = document.createElement('button');
    purchaseBtn.textContent = 'Purchase';
    purchaseBtn.addEventListener('click', () => {
      const amount = parseInt(prompt(`How many ${token} tokens do you want to buy?`));
      if (!isNaN(amount) && amount > 0 && balance >= amount * cryptoData[token]) {
        balance -= amount * cryptoData[token];
        if (holdings[token]) {
          holdings[token] += amount;
        } else {
          holdings[token] = amount;
        }
        alert(`You have successfully purchased ${amount} ${token} tokens.`);
        document.getElementById('balance').textContent = `Balance: $${balance}`;
        renderHoldingsPage();
      } else {
        alert('Invalid input or insufficient balance.');
      }
    });

    const wishlistBtn = document.createElement('button');
    wishlistBtn.textContent = 'Add to Wishlist';
    wishlistBtn.addEventListener('click', () => {
      if (!wishlist.includes(token)) {
        wishlist.push(token);
        alert('Successfully added to your wishlist.');
        renderWishlistPage();
      } else {
        alert('This token is already in your wishlist.');
      }
    });

    const profitLoss = document.createElement('p');
    profitLoss.textContent = '';

    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(purchaseBtn);
    card.appendChild(wishlistBtn);
    homePage.appendChild(card);
  });
}

function renderWishlistPage() {
  const wishlistPage = document.getElementById('wishlistPage');
  wishlistPage.innerHTML = '';

  if (wishlist.length === 0) {
    wishlistPage.textContent = 'Wishlist is empty.';
  } else {
    wishlist.forEach(token => {
      const card = document.createElement('div');
      card.classList.add('card');

      const name = document.createElement('p');
      name.textContent = token;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove from wishlist';
      removeBtn.addEventListener('click', () => {
        wishlist = wishlist.filter(item => item !== token);
        alert(`Successfully removed ${token} from your wishlist.`);
        renderWishlistPage();
      });

      const purchaseBtn = document.createElement('button');
      purchaseBtn.textContent = 'Purchase';
      purchaseBtn.addEventListener('click', () => {
        const amount = parseInt(prompt(`How many ${token} tokens do you want to buy?`));
        if (!isNaN(amount) && amount > 0 && balance >= amount * cryptoData[token]) {
          balance -= amount * cryptoData[token];
          if (holdings[token]) {
            holdings[token] += amount;
          } else {
            holdings[token] = amount;
          }
          alert(`You have successfully purchased ${amount} ${token} tokens.`);
          wishlist = wishlist.filter(item => item !== token);
          document.getElementById('balance').textContent = `Balance: $${balance}`;
          renderHoldingsPage();
          renderWishlistPage();
        } else {
          alert('Invalid input or insufficient balance.');
        }
      });

      const profitLoss = document.createElement('p');
      profitLoss.textContent = '';

      card.appendChild(name);
      card.appendChild(removeBtn);
      card.appendChild(purchaseBtn);
      card.appendChild(profitLoss);
      wishlistPage.appendChild(card);
    });
  }
}

function renderHoldingsPage() {
  const holdingsPage = document.getElementById('holdingsPage');
  holdingsPage.innerHTML = '';

  let totalHoldingsValue = 0;

  Object.keys(holdings).forEach(token => {
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement('p');
    name.textContent = token;

    const quantity = document.createElement('p');
    quantity.textContent = `Quantity: ${holdings[token]}`;

    const purchasePrice = document.createElement('p');
    const purchaseValue = holdings[token] * cryptoData[token];
    purchasePrice.textContent = `Purchase Price: $${purchaseValue}`;

    const currentPrice = cryptoData[token];
    const sellingPrice = document.createElement('p');
    const sellingValue = holdings[token] * currentPrice;
    sellingPrice.textContent = `Selling Price: $${sellingValue}`;

    const profitLoss = document.createElement('p');
    const profitLossValue = sellingValue - purchaseValue;
    profitLoss.textContent = `Profit/Loss: $${profitLossValue}`;

    totalHoldingsValue += sellingValue;

    const sellBtn = document.createElement('button');
    sellBtn.textContent = 'Sell';
    sellBtn.addEventListener('click', () => {
      const amount = parseInt(prompt(`How many ${token} tokens do you want to sell?`));
      if (!isNaN(amount) && amount > 0 && holdings[token] >= amount) {
        balance += amount * cryptoData[token];
        holdings[token] -= amount;
        alert(`You have successfully sold ${amount} ${token} tokens.`);
        document.getElementById('balance').textContent = `Balance: $${balance}`;
        renderHoldingsPage();
      } else {
        alert('Invalid input or insufficient holdings.');
      }
    });

    card.appendChild(name);
    card.appendChild(quantity);
    card.appendChild(purchasePrice);
    card.appendChild(sellingPrice);
    card.appendChild(profitLoss);
    card.appendChild(sellBtn);
    holdingsPage.appendChild(card);
  });

  // Display total holdings value
  const totalHoldings = document.createElement('p');
  totalHoldings.textContent = `Total Holdings Value: $${totalHoldingsValue}`;
  holdingsPage.appendChild(totalHoldings);
}

navigate('home');
