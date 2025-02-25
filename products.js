fetch("products.json")
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById("product-list");

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>£${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">
                    Add to Cart
                </button>
            `;

            productList.appendChild(productDiv);
        });
    })
    .catch(error => console.log("Error loading products:", error));
