/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Products from "../../../models/Product";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);
    if (!product)
      return res
        .status(400)
        .json({ err: "El producto no se encuentra en la base de datos!" });

    res.json({ product });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res
        .status(400)
        .json({ err: "La autenticación del usuario no es válida." });

    const { id } = req.query;
    const {
      product_id,
      title,
      brand,
      price,
      stock,
      gender,
      category,
      description,
      content,
      images,
    } = req.body;

    if (!product_id)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "El SKU del producto es un campo requerido." },
      });
    if (!title)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "El NOMBRE del producto es un campo requerido." },
      });
    if (!brand)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "La MARCA del producto es un campo requerido." },
      });
    if (!price)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "El PRECIO del producto es un campo requerido." },
      });
    if (!stock)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "La CANTIDAD del producto es un campo requerido." },
      });
    if (!gender)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "El GENERO del producto es un campo requerido." },
      });
    if (category === "all")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "La CATEGORIA del producto es un campo requerido." },
      });
    if (!description)
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "La DESCRIPCION del producto es un campo requerido.",
        },
      });
    if (!content)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "El CONTENIDO del producto es un campo requerido." },
      });
    if (images.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "La IMAGEN del producto es un campo requerido." },
      });

    await Products.findOneAndUpdate(
      { _id: id },
      {
        title: title.toLowerCase(),
        product_id,
        title,
        brand,
        price,
        stock,
        gender,
        category,
        description,
        content,
        images,
      }
    );

    res.json({ msg: "¡Éxito!E producto ha sido actualizado" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin")
      return res
        .status(400)
        .json({ err: "La autenticación del usuario no es válida!." });

    const { id } = req.query;

    await Products.findByIdAndDelete(id);
    res.json({ msg: "El producto ha sido eliminado!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
