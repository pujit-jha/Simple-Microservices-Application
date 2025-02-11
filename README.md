# Simple Microservices Application

This project demonstrates two simple Node.js services: one for receiving orders (`orderService.js`) and another for placing orders (`placeOrderService.js`). The two services communicate via HTTP, where the **Place Order Service** sends a request to the **Order Service** to handle incoming orders.

## Files

### 1. `orderService.js`
This service listens on **port 5002** and provides endpoints to:
- **`POST /receive_order`**: Receives an order for a specific user. If the user has already placed orders, the new order is appended to their list.
- **`GET /get_orders/:name`**: Retrieves all orders for a given user by name.

### 2. `placeOrderService.js`
This service listens on **port 5001** and provides an endpoint to:
- **`POST /place_order`**: Sends a user's order to the **Order Service** by making an HTTP request to `/receive_order` on `orderService.js`.

## Installation

Clone the repository or copy the provided files to your local system.

Open the terminal in the project folder and run the following commands to initialize the project and install dependencies:

```bash
npm init -y
npm install express axios
```

## Running the Services

Start the **Order Service** (on port **5002**):
```bash
node orderService.js
```

Start the **Place Order Service** (on port **5001**):
```bash
node placeOrderService.js
```

## Testing

To test the communication between the services:

1. Open **Postman** or use **curl** to send a **POST** request to `http://localhost:5001/place_order` with the following JSON payload:

```json
{
  "name": "John",
  "order_id": "12345"
}
```

This will trigger the **Place Order Service**, which sends the order data to the **Order Service** for storage.

2. You can verify the stored orders by sending a **GET** request to `http://localhost:5002/get_orders/John` to check the orders for the user "John".

## Example Usage

### Place an Order (POST Request)
```bash
curl -X POST http://localhost:5001/place_order -H "Content-Type: application/json" -d '{"name": "John", "order_id": "12345"}'
```

### Retrieve Orders for John (GET Request)
```bash
curl http://localhost:5002/get_orders/John
```
