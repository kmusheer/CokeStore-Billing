

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the user details from sessionStorage
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    // console.log('userDetails', userDetails)

    // Display the user details
    if (userDetails) {
        const userDetailsContainer = document.getElementById("userDetails");
        // Use the retrieved id to fetch user data from the database
        fetchUserData(userDetails._id, userDetailsContainer);
    } else {
        console.error('User details not found in sessionStorage');
    }
});

function fetchUserData(id, userDetailsContainer) {
    // Make an API request to fetch user data using the id
    fetch(`http://localhost:8000/menus/searchbyId/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(userData => {
            // Display the fetched user data
            // console.log('User Data:', userData);
            const formattedUserCreatedDate = formatDate(userData.UserCreatedDate);

            // Display the user details including formattedUserCreatedDate
            // <p><strong>ID:</strong> ${userData._id}</p>
            userDetailsContainer.innerHTML = `
                <div class="user-card">
                    <p><strong>Name: <span class="strong_name">${userData.name}<span></strong></p>
                    <p><strong>Email:</strong> ${userData.email}</p>
                    <p><strong>Phone:</strong> ${userData.phone}</p>
                    <p><strong>User Created Date:</strong> ${formattedUserCreatedDate}</p>
                </div>
            `;

            // Now you can call the generateTable function passing userData and formattedUserCreatedDate
            generateTable(userData);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

// Function to format the date
function formatDate(date) {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const hours = date.substring(11, 13);
    const minutes = date.substring(14, 16);
    const seconds = date.substring(17, 19);

    return `${day}-${month}-${year} AT ${hours}:${minutes}:${seconds}`;
}


// Function to generate the table with user data
function generateTable(userData) {
    const tableBody = document.querySelector("#userDataTable tbody");
    const tfoot = document.getElementById("userTableFooter");

    // Clear existing table body content
    tableBody.innerHTML = "";

    // Add a single header row for "Date", "Item", "Volume", "Quantity", "Price", "Amount", and "Purchase Amount"
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Date</th>
        <th>Item</th>
        <th>Volume</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Amount</th>
        <th>Purchase Amount</th>
        `;
    tableBody.appendChild(headerRow);

    // Iterate through each purchase in userData and create table rows
    userData.menu.forEach(purchase => {

        const formattedDate = formatDate(purchase.purchasedate);

        // Iterate through each item in the purchase
        purchase.items.forEach((item, index) => {
            const row = document.createElement("tr");

            // Add Date cell for the first item in the purchase
            if (index === 0) {
                const dateCell = document.createElement("td");
                dateCell.className = "strong"
                dateCell.setAttribute("rowspan", purchase.items.length);
                dateCell.textContent = formattedDate;
                row.appendChild(dateCell);
            }

            // Add Item, Volume, Quantity, Price, and Amount cells for each item
            row.innerHTML += `
        <td>${item.item}</td>
        <td>${item.volume}</td>
        <td>${item.Quantity}</td>
        <td>${item.price}</td>
        <td>${item.Amount}</td>
    `;

            // Add Purchase Amount cell for the last item in the purchase
            if (index === purchase.items.length - 1) {
                const purchaseAmountCell = document.createElement("td");
                purchaseAmountCell.className = "strong"
                purchaseAmountCell.textContent = purchase.purchaseAmount;
                row.appendChild(purchaseAmountCell);
            }

            tableBody.appendChild(row);

        });

        const tdWithRowspan = document.querySelectorAll('td[rowspan]');

        // Iterate through each <td> element with rowspan attribute
        tdWithRowspan.forEach(td => {
            // Get the rowspan value as a number
            const rowspan = parseInt(td.getAttribute('rowspan'));

            // If rowspan is NaN or 1, skip to the next <td>
            if (isNaN(rowspan) || rowspan === 0) {
                return;
            }

            // Get the parent <tr> element of the <td>
            const parentTr = td.parentNode;

            // Get the index of the parent <tr> within its parent <table>
            const rowIndex = Array.from(parentTr.parentNode.children).indexOf(parentTr);

            // Calculate the index of the last row spanned by the <td>
            const lastRowIndex = rowIndex + rowspan - 1;

            // Select the last row spanned by the <td> using its index
            const lastRow = parentTr.parentNode.children[lastRowIndex];

            // Add a class to the last row
            lastRow.classList.add('parent-rowspan-last');
        });
    });


    // Create the table footer
    const footerRow = document.createElement("tr");
    footerRow.innerHTML = `
        <td colspan="6" style="text-align: right; font-weight : bold">Total:</td>
        <td><mark id="totalAmount" style="font-weight : bold"></mark></td>
        `;
        // <td></td>
    tfoot.appendChild(footerRow);

    // Calculate and display the total amount
    const totalAmountCell = document.getElementById("totalAmount");
    const totalAmount = userData.AlltotalAmount;
    totalAmountCell.textContent = totalAmount;

    // Hide the table header
    document.querySelector("#userDataTable thead").style.display = "none";
}
