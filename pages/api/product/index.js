/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Products from "../../../models/Product";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.category !== "all")
      this.query.find({ category: queryObj.category });

    if (queryObj.title !== "all")
      this.query.find({ title: { $regex: queryObj.title } });

    this.query.find();
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const products = await features.query;

    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

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

    const newProduct = new Products({
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
    });

    await newProduct.save();
    res.json({ msg: "¡Éxito! El producto ha sido creado." });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
