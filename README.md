# CokeStore Billing App

CokeStore Billing App is a web application designed to manage billing operations for a store. The app includes functionalities to search for products, add new products dynamically, and print bills. All data is stored and managed locally using MongoDB Compass.

## Features

- Home Page with an overview and quick links
- Search functionality allows users to search by name or number & also number is unique
- Dynamic addition of products to the list
- Bill printing functionality
- Data storage and retrieval using MongoDB (via Mongoose)

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using MongoDB Compass for local database management)
- **Other Library:** Moment for timezone

## Screenshots

### Home Page
![Home Page](./images/home-page.png)
![Screenshot (47)](https://github.com/kmusheer/CokeStore-Billing/assets/99362063/6f4a6f7f-4842-4df8-ac5d-722d2129d6df)

### Search Page
![Search Page](./images/search-page.png)
![Screenshot (48)](https://github.com/kmusheer/CokeStore-Billing/assets/99362063/d012cbb3-1a4e-4295-96ef-841695911b77)

### Search Results
![Search Results](./images/search-results.png)
![Screenshot (49)](https://github.com/kmusheer/CokeStore-Billing/assets/99362063/84abcd93-50b7-4209-afa9-937ced470b5d)

## USAGE

### Home Page
- Provides an overview and links to different functionalities.

### Search User Detail with all purchase data
- Navigate to the search page and enter the name or unique number to search for user details.
- The search results will be displayed dynamically.

### Add New Products
- If a product is not listed, you can add it dynamically using the provided form by clicking the 'Add Row' button.

### Print Bill and Send data into backEnd
- After finalizing the products, use the print functionality to print the bill. It will be directly saved into the database when you click the print button.


## API Endpoints

- **GET /menus/search**: Fetch all User by query search
- **GET /searchbyId/:id**: Fetch a User by ID
- **POST /menus**: Add a new User whenit purchase a products
- **PATCH /menus**: Update a User purchase details



## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/CokeStoreBillingApp.git
   cd CokeStoreBillingApp



## Data Model Example

### User

```json
{
    "_id": "6612e0a249a7a161a52e7c23",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "UserCreatedDate": "2024-04-07T18:06:26.310+00:00",
    "menu": [
        {
            "purchasedate": "2024-04-07T18:06:26.310+00:00",
            "totalAmount": 220,
            "items": [
                {
                    "item": "Diet Coke",
                    "volume": "300 ml",
                    "Quantity": 3,
                    "price": 40,
                    "Amount": 120
                },
                {
                    "item": "Dynamic Row",
                    "volume": "300 ml",
                    "Quantity": 2,
                    "price": 50,
                    "Amount": 100
                }
            ]
        },
        {
            "purchasedate": "2024-02-03T15:46:26.310+00:00",
            "totalAmount": 1200,
            "items": [
                {
                    "item": "Another Item",
                    "volume": "200 ml",
                    "Quantity": 2,
                    "price": 300,
                    "Amount": 200
                },
                {
                    "item": "Yet Another Item",
                    "volume": "4000 ml",
                    "Quantity": 1,
                    "price": 600,
                    "Amount": 1000
                }
            ]
        }
    ],
    "AlltotalAmount": 20080
}
