const Purchase = require('../models/Purchase');
const { newPurchase } = require('../services/purchase');

const create = async (req, res) => {
  try {
    const resultPurchase = await newPurchase(req);
    //falta modificar estado de compra dependiendo del reesult

    if (resultPurchase === 'PURCHASE_OK')
      return res.status(201).json({ message: 'Compra generada' });
    if (resultPurchase === 'INVALID_PURCHASE')
      return res.status(400).json({ message: 'Upps, algo salió mal' });
    if (resultPurchase === 'PRBLEMS_WITH_PROCCESSING_PURCHASE')
      return res.sendStatus(500);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

const all = async (req, res) => {
  try {
    const data = await Purchase.find({ users: req.id });
    res.json({ message: `todas tus compras`, data });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = { all, create };
