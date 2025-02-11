const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const ORDER_SERVICE_URL = 'http://10.0.2.102:5002';  // Address of the Order Service VM

app.post('/place_order', async (req, res) => {
    const { name, order_id } = req.body;

    if (!name || !order_id) {
        return res.status(400).json({ error: "Missing name or order_id" });
    }

    try {
        const response = await axios.post(`${ORDER_SERVICE_URL}/receive_order`, req.body);
        return res.json(response.data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/get_orders/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const response = await axios.get(`${ORDER_SERVICE_URL}/get_orders/${name}`);
        return res.json(response.data);
    } catch (error) {
        return res.status(404).json({ message: `No orders found for ${name}` });
    }
});

app.listen(5001, '0.0.0.0', () => {
    console.log('Place Order service running on port 5001');
});

