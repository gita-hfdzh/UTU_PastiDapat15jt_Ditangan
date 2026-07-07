const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/checkout
// @access  Public
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      shippingAddress,
      orderItems,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const order = new Order({
        customerName,
        customerEmail,
        shippingAddress,
        orderItems,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json({
        success: true,
        message: 'Pesanan berhasil dibuat',
        orderId: createdOrder._id,
      });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server Error: Unable to create order' });
  }
};

module.exports = {
  createOrder,
};
