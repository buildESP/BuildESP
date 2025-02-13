const { Exchange, Item, User } = require('../models/associations');

// create an exchange
exports.createExchange = async (req, res) => {
  try {
    const { item_id, lender_user_id, borrow_user_id, start_date, end_date, status } = req.body;

    // Ensure the item exists
    const item = await Item.findByPk(item_id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Ensure the lender user exists
    const lender = await User.findByPk(lender_user_id);
    if (!lender) {
      return res.status(404).json({ message: 'Lender user not found' });
    }

    // Ensure the borrow user exists
    const borrower = await User.findByPk(borrow_user_id);
    if (!borrower) {
      return res.status(404).json({ message: 'Borrower user not found' });
    }

    // Create the exchange
    const newExchange = await Exchange.create({
      item_id,
      lender_user_id,
      borrow_user_id,
      start_date,
      end_date,
      status,
    });

    res.status(201).json({ message: 'Exchange created successfully', exchange: newExchange });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during exchange creation' });
  }
};

// get all exchanges
exports.getExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.findAll({
      include: [
        { model: Item, as: 'item' },
        { model: User, as: 'lender_user' },
        { model: User, as: 'borrow_user' },
      ],
    });
    res.status(200).json(exchanges);
  } catch (error) {
    console.error('Error fetching exchanges:', error);
    res.status(500).json({ error: 'Error during fetching exchanges', details: error.message });
  }
};

// get exchange by ID
exports.getExchangeById = async (req, res) => {
  try {
    const exchangeId = req.params.exchange_id;

    const exchange = await Exchange.findByPk(exchangeId, {
      include: [
        { model: Item, as: 'item' },
        { model: User, as: 'lender_user' },
        { model: User, as: 'borrow_user' },
      ],
    });

    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }

    res.status(200).json(exchange);
  } catch (error) {
    console.error('Error fetching exchange by ID:', error);
    res.status(500).json({ error: 'Error during fetching exchange', details: error.message });
  }
};

// update exchange
exports.updateExchange = async (req, res) => {
  try {
    const exchangeId = req.params.exchange_id;
    const { item_id, lender_user_id, borrow_user_id, start_date, end_date, status } = req.body;

    const exchange = await Exchange.findByPk(exchangeId);

    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }

    // Ensure the item exists
    const item = await Item.findByPk(item_id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Ensure the lender user exists
    const lender = await User.findByPk(lender_user_id);
    if (!lender) {
      return res.status(404).json({ message: 'Lender user not found' });
    }

    // Ensure the borrower user exists
    const borrower = await User.findByPk(borrow_user_id);
    if (!borrower) {
      return res.status(404).json({ message: 'Borrower user not found' });
    }

    await exchange.update({
      item_id,
      lender_user_id,
      borrow_user_id,
      start_date,
      end_date,
      status,
    });

    res.status(200).json({ message: 'Exchange updated successfully', exchange });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during exchange update' });
  }
};

// delete exchange
exports.deleteExchange = async (req, res) => {
  try {
    const exchangeId = req.params.exchange_id;
    const exchange = await Exchange.findByPk(exchangeId);

    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }

    await exchange.destroy();
    res.status(200).json({ message: 'Exchange deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during exchange deletion' });
  }
};
