function showPage(page) {
  document.querySelectorAll(".page").forEach(function(section) {
    section.classList.remove("active");
  });

  document.getElementById(page).classList.add("active");

  document.getElementById("sidebar").classList.remove("open");
}

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("open");
}

async function loadProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();

  document.getElementById("productCount").textContent =
    products.length;

  document.getElementById("productList").innerHTML =
    products.map(function(product) {
      return `
        <div class="product">

          <div class="product-image">
            🛍️
          </div>

          <h3>${product.name}</h3>

          <p>${product.category}</p>

          <p>Supplier: $${product.cost}</p>

          <p>Suggested price: $${product.price}</p>

          <p class="score">
            AI Score: ${product.score}/100
          </p>

        </div>
      `;
    }).join("");
}

async function loadOrders() {
  const response = await fetch("/api/orders");
  const orders = await response.json();

  document.getElementById("orderCount").textContent =
    orders.length;

  document.getElementById("ordersList").innerHTML =
    orders.map(function(order) {
      return `
        <div class="order">

          <div>
            <strong>${order.id}</strong>
            <br>
            ${order.product}
          </div>

          <div>
            <strong>$${order.amount}</strong>
            <br>
            ${order.status}
          </div>

        </div>
      `;
    }).join("");
}

async function analyzeProduct() {
  const name =
    document.getElementById("productName").value;

  const cost =
    document.getElementById("productCost").value;

  const price =
    document.getElementById("productPrice").value;

  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      cost: cost,
      price: price
    })
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  document.getElementById("analysisResult").innerHTML = `
    <div class="result">

      <h2>${data.product}</h2>

      <p>Supplier cost: $${data.cost}</p>
      <p>Selling price: $${data.price}</p>
      <p>Estimated profit: $${data.profit}</p>
      <p>Profit margin: ${data.margin}%</p>
      <p>AI score: ${data.score}/100</p>

      <br>

      <strong>
        ${data.score >= 85
          ? "🔥 Strong product to test"
          : "⚠️ Test carefully"}
      </strong>

    </div>
  `;
}

async function generateDescription() {
  const name =
    document.getElementById("writerName").value;

  const category =
    document.getElementById("writerCategory").value;

  const response = await fetch(
    "/api/generate-description",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        category: category
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  document.getElementById("writerResult").innerHTML = `
    <div class="result">

      <h2>${data.title}</h2>

      <br>

      <p>${data.description}</p>

    </div>
  `;
}

function calculateProfit() {
  const cost =
    Number(document.getElementById("calcCost").value);

  const price =
    Number(document.getElementById("calcPrice").value);

  const ads =
    Number(document.getElementById("calcAds").value) || 0;

  if (!cost || !price) {
    alert("Enter supplier cost and selling price.");
    return;
  }

  const profit = price - cost - ads;
  const margin = (profit / price) * 100;

  document.getElementById("calcResult").innerHTML = `
    <div class="result">

      <h2>$${profit.toFixed(2)}</h2>

      <p>Estimated profit after ads</p>

      <br>

      <p>
        Profit margin: ${margin.toFixed(1)}%
      </p>

    </div>
  `;
}

loadProducts();
loadOrders();
