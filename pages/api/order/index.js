/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/Order";
import Products from "../../../models/Product";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      await getOrders(req, res);
      break;
  }
};

const getOrders = async (req, res) => {
  try {
    const result = await auth(req, res);

    let orders;
    if (result.role !== "admin") {
      orders = await Orders.find({ user: result.id })
        .populate("user", "-password")
        .exec();
    } else {
      orders = await Orders.find().populate("user", "-password");
    }

    res.json({ orders });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { provincia, canton, distrito, address, phone, cart, total } =
      req.body;

    const newOrder = new Orders({
      user: result.id,
      provincia,
      canton,
      distrito,
      address,
      phone,
      cart,
      total,
    });

    console.log(newOrder.provincia, newOrder.canton, newOrder.distrito);

    cart.filter((item) => {
      return sold(item._id, item.quantity, item.stock, item.sold);
    });

    await newOrder.save();

    res.json({
      msg: "Order success! We will contact you to confirm the order.",
      newOrder,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const sold = async (id, quantity, oldInStock, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      stock: oldInStock - quantity,
      sold: quantity + oldSold,
    }
  );
};
