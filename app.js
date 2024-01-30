var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var coinsData = [];
let curPage = 1;

const pageSize = 10;
const apiUrl = `${proxyUrl}${baseUrl}`;

async function renderTable(page = 1) {
  await getData();

  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  const pageData = coinsData.slice(start, end);

  const tableRows = pageData.map(coin => {
    return `<tr>
              <td>${parseFloat(coin.btcPrice).toFixed(6)}</td>
              <td>${coin.rank}</td>
              <td>${coin.tier}</td>
              <td>${coin.name}</td>
              <td>$${Math.round(coin.price)} Billion</td>
              <td>${coin.symbol}</td>
            </tr>`;
  });

  document.getElementById("data").innerHTML = tableRows.join('');
}

function previousPage() {
  if (curPage > 1) {
    curPage--;
    renderTable(curPage);
  }
}

function nextPage() {
  if (curPage * pageSize < coinsData.length) {
    curPage++;
    renderTable(curPage);
  }
}

async function getData() {
  const response = await fetch(apiUrl);
  const coins = await response.json();
  coinsData = coins.data.coins;
}

function searchCoins() {
  const input = document.getElementById("myInput").value.toLowerCase();
  const filteredCoins = coinsData.filter(coin => coin.name.toLowerCase().includes(input));

  // Render the filtered data
  const tableRows = filteredCoins.map(coin => {
    return `<tr>
              <td>${parseFloat(coin.btcPrice).toFixed(6)}</td>
              <td>${coin.rank}</td>
              <td>${coin.tier}</td>
              <td>${coin.name}</td>
              <td>$${Math.round(coin.price)} Billion</td>
              <td>${coin.symbol}</td>
            </tr>`;
  });

  document.getElementById("data").innerHTML = tableRows.join('');
}

document.getElementById('nextButton').addEventListener('click', nextPage);
document.getElementById('prevButton').addEventListener('click', previousPage);
document.getElementById('myInput').addEventListener('keyup', searchCoins);

renderTable();
