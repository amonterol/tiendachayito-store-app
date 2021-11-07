/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Categories from "../../../models/Category";
import Products from "../../../models/Product";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const { name } = req.body;

    const newCategory = await Categories.findOneAndUpdate(
      { _id: id },
      { name }
    );
    res.json({
      msg: "Exito! La categoría ha sido actualizada.",
      category: {
        ...newCategory._doc,
        name,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res
        .status(400)
        .json({
          err: "Solo el usuario administrador puede acceder esta función.",
        });

    const { id } = req.query;

    const products = await Products.findOne({ category: id });
    if (products)
      return res.status(400).json({
        err: "Por favor elimine todos los productos relacionados con esta categoría antes de eliminarla.",
      });

    await Categories.findByIdAndDelete(id);

    res.json({ msg: "Exito! La categoría ha sido eliminada" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
