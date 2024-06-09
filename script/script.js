
const drinks = [
    { id: "DC", name: "Diet Coke", ml: 300, price: 40 },
    { id: "VC", name: "Vanilla Coke", ml: 300, price: 80 },
    { id: "CC", name: "Coca Cola", ml: 250, price: 20 },
    { id: "ZSC", name: "Zero Sugar Coke", ml: 250, price: 35 }
];
const menuContainer = document.getElementById("menu");

drinks.forEach(drink => {
    const drinkElement = createDrinkElement(drink);
    menuContainer.appendChild(drinkElement);
});

// Initialize quantities and bills
const quantities = {};
const bills = {};

const nameInputs = [document.getElementById("name1"), document.getElementById("name2")];
const emailInputs = [document.getElementById("email1"), document.getElementById("email2")];
const phoneInputs = [document.getElementById("phone1"), document.getElementById("phone2")];

nameInputs[0].addEventListener("change", updatePersonalDetails);
emailInputs[0].addEventListener("change", updatePersonalDetails);
phoneInputs[0].addEventListener("change", updatePersonalDetails);

function updatePersonalDetails() {
    nameInputs[1].innerHTML = nameInputs[0].value;
    emailInputs[1].innerHTML = emailInputs[0].value;
    phoneInputs[1].innerHTML = phoneInputs[0].value;
}

// Billing
drinks.forEach(drink => {
    const inputElement = document.getElementById(drink.id);

    inputElement.addEventListener("change", function () {
        const quantity = parseInt(this.value) || 0;
        const volume = drink.ml; // Accessing volume from drinks array

        quantities[drink.id] = quantity;
        bills[drink.id] = quantity > 0 ? createBillRow(drink, quantity, volume) : "";

        showBill();
    });
});

function createDrinkElement(drink) {
    const drinkElement = document.createElement("div");
    drinkElement.className = "Coke";

    drinkElement.innerHTML = `
        <h2 class="title">${drink.name} <div class="ml">${drink.ml}</div></h2>
        <div class="price">₹${drink.price}</div>
        <form class="input" id="qtyReset">
            <input class="enter" min="1" max="40" type="number" name="" id="${drink.id}">
        </form>
    `;

    return drinkElement;
}

function addDynamicRow() {
    const dynamicRowId = `dynamicRow${Object.keys(bills).length + 1}`;

    // Check if a row with the same ID already exists
    if (!document.getElementById(dynamicRowId)) {
        const dynamicRow = document.createElement("form");
        dynamicRow.className = "Coke";
        dynamicRow.id = "dynamicFieldRow";

        dynamicRow.innerHTML = `
            <div class="input">
                <input class="nameInput dynamic_input" type="text" placeholder="Enter Name" id="name_${dynamicRowId}">
            </div>
            <div class="volume">
                <select class="volumeInput dynamic_input" id="volume_${dynamicRowId}">
                <option value="400">400ml</option>
                <option value="350">350ml</option>
                <option value="300">300ml</option>
                <option value="250">250ml</option>
                </select>
            </div>
            <div class="price">₹<input class="priceInput dynamic_input" type="number" min="1" value="50" id="price_${dynamicRowId}"></div>
            <div class="input">
                <input class="enter" min="1" max="40" type="number" name="" id="${dynamicRowId}">
            </div>
        `;

        menuContainer.appendChild(dynamicRow);

        const dynamicRowInput = dynamicRow.querySelector(".enter");
        const nameInput = dynamicRow.querySelector(".nameInput");
        const priceInput = dynamicRow.querySelector(".priceInput");
        const volumeInput = dynamicRow.querySelector(".volumeInput");

        dynamicRowInput.addEventListener("change", function () {
            const quantity = parseInt(this.value) || 0;
            const price = parseInt(priceInput.value) || 0;
            const name = nameInput.value || "Dynamic Row";
            const volume = parseInt(volumeInput.value) || 300; // Extract volume from the volumeInput

            quantities[dynamicRowId] = quantity;
            bills[dynamicRowId] = quantity > 0 ? createBillRow({ name: name, price: price }, quantity, volume) : "";

            showBill();
        });
    }
}

function createBillRow(drink, quantity, volume) {
    const total = drink.price * quantity;
    return `<tr><td>${drink.name}</td><td>${volume} ml</td><td> ₹ ${drink.price}</td><td>${quantity}</td><td>${drink.price}x${quantity} = ${total}</td></tr>`;
}

function showBill() {
    const billTable = document.getElementById("bill");
    const amountElement = document.getElementById("Amount");

    billTable.innerHTML = Object.values(bills).join("");

    const existingRows = Object.entries(quantities).reduce((total, [drinkId, quantity]) => {
        const drink = drinks.find(drink => drink.id === drinkId) || { price: 0 };
        return total + (drink.price * quantity);
    }, 0);

    const dynamicRowsTotal = Object.entries(bills).reduce((total, [rowId, row]) => {
        // Extract quantity from the bills object using rowId
        const quantity = rowId in quantities ? quantities[rowId] : 0;

        // Extract price from the HTML structure
        const priceInput = document.getElementById(`price_${rowId}`);
        const priceTextWithCurrency = priceInput ? priceInput.value : '₹0';
        const priceTextWithoutCurrency = priceTextWithCurrency.replace(/[^\d.]/g, ''); // Remove non-numeric characters
        const price = parseFloat(priceTextWithoutCurrency) || 0; // Parse the cleaned priceText into a float
        return total + (price * quantity);
    }, 0);

    const totalAmount = existingRows + dynamicRowsTotal;

    amountElement.innerHTML = totalAmount;
}

function validateForm() {
    const nameInput = document.getElementById('name1');
    const emailInput = document.getElementById('email1');
    const phoneInput = document.getElementById('phone1');

    if (nameInput.value.trim() === '' || phoneInput.value.trim() === '') {
        alert('Name and Number are required!');
        return false; // Prevent form submission
    }

    return true; // Allow form submission
}


function PrintBill() {
    if (!validateForm()) {
        return; // Stop further execution if form is invalid
    }

    sendBillData();

    var Box1 = document.getElementById("dissolve-1")
    var Box2 = document.getElementById("dissolve-2")
    var box3 = document.getElementById("print")
    var subhead = document.getElementById("subhead")
    var printBtn = document.getElementById("printBtn")
    // var footer = document.querySelector('.Footer');
    var btn = document.getElementById("btn")
    Box1.style.display = "none";
    Box2.style.display = "none";
    subhead.style.display = 'none';
    printBtn.style.display = 'none';
    box3.classList.append = "New";
    // btn.style.display= "none"
    document.body.innerHTML;
    print();
    Box1.style.display = "block";
    Box2.style.display = "block";
    subhead.style.display = 'block';
    printBtn.style.display = 'block';
    box3.style.margin = "margin: 0px auto;"
    // btn.style.display= "block";
    var menuContainer = document.getElementById("menu");

    // Clear dynamic rows
    // menuContainer.innerHTML = '';
    setTimeout(() => {
        window.location.reload(true)
    }, 1000);
}

function sendBillData() {
    const name = document.getElementById('name2').textContent;
    const email = document.getElementById('email2').textContent;
    const phone = document.getElementById('phone2').textContent; // Assuming you have an element with id 'phone' for phone number

    // Get all rows in the bill table
    const rows = document.querySelectorAll('#bill tr');

    // Initialize an array to store menu items
    const menuItems = [];
    let totalAmount = 0;

    rows.forEach(row => {
        const columns = row.querySelectorAll('td');
        const menuItem = columns[0].textContent;
        const volume = columns[1].textContent;
        const priceTextWithCurrency = columns[2].textContent;
        const quantity = parseInt(columns[3].textContent); // Adjust index if volume is added to the table

        const priceTextWithoutCurrency = priceTextWithCurrency.replace(/[^\d.]/g, '');
        const price = parseFloat(priceTextWithoutCurrency);
        const amount = quantity * price; // Adjust the calculation considering volume

        // Add the item to the menuItems array
        menuItems.push({ item: menuItem, volume: volume, Quantity: quantity, price: price, Amount: amount });
        totalAmount += amount; // Update totalAmount
    });

    // Create the data object to be sent to the backend
    const postData = {
        name: name,
        email: email,
        phone: phone,
        menu: [
            {
                totalAmount: totalAmount,
                items: menuItems
            }
        ],
        AlltotalAmount: 10 // Assuming this is the total amount for all purchases
    };

    // Send the data to the backend via a POST request
    fetch('http://localhost:8000/menus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}





async function searchBills() {
    const searchValue = document.getElementById("searchInput").value.trim();
    try {
        const response = await fetch(`http://localhost:8000/menus/search?query=${searchValue}`);
        const searchResults = await response.json();
        const searchResultsContainer = document.getElementById("searchResults");
        searchResultsContainer.innerHTML = "";
        
        if (!response.ok) {
            searchResultsContainer.innerHTML = "No results found.";
            const modal = document.getElementById("popupModal");
            modal.style.display = "block"; // Display the modal
            throw new Error('Failed to fetch search results');
        }
         if (Array.isArray(searchResults) && searchResults.length > 0) {
            searchResults.forEach(result => {
                const resultElement = document.createElement("div");
                resultElement.innerHTML = `<a href="#" class="searchResult" onclick="displayUserDetails('${result._id}','${result.name}', '${result.email}', '${result.phone}')">${result.name}</a>`;
                searchResultsContainer.appendChild(resultElement);
            });
        } else {
            searchResultsContainer.innerHTML = "No results found.";
            const modal = document.getElementById("popupModal");
            modal.style.display = "block"; // Display the modal
        }
        const modal = document.getElementById("popupModal");
        modal.style.display = "block";
        document.getElementById("searchInput").value="";
    } catch (error) {
        console.error('Error:', error.message);
    }
   
}


function closeModal() {
    const modal = document.getElementById("popupModal");
    modal.style.display = "none";
}

function displayUserDetails(_id, name, email, phone) {
    // Store the selected user's details in sessionStorage
    const userDetails = { _id, name, email, phone };
    sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
    // Navigate to the userDetails.html page
    window.location.href = 'userDetails.html';
}
