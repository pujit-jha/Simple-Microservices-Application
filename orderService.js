const express = require('express');
const app = express();
app.use(express.json());

let ordersDb = {};

app.post('/receive_order', (req, res) => {
    const { name, order_id } = req.body;

    if (!name || !order_id) {
        return res.status(400).json({ error: "Missing name or order_id" });
    }

    if (ordersDb[name]) {
        ordersDb[name].push(order_id);
    } else {
        ordersDb[name] = [order_id];
    }

    return res.json({ message: `Order ${order_id} placed successfully for ${name}!` });
});

app.get('/get_orders/:name', (req, res) => {
    const { name } = req.params;

    if (ordersDb[name]) {
        return res.json({ name, orders: ordersDb[name] });
    }
    return res.status(404).json({ message: `No orders found for ${name}` });
});

app.get('/all_orders', (req, res) => {
    res.json(ordersDb);
});

app.listen(5002, '0.0.0.0', () => {
    console.log('Order service running on port 5002');
});

