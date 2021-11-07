/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { imageUpload } from "../../utils/imageUpload";
import { postData, getData, putData } from "../../utils/fetchData";
import { useRouter } from "next/router";

const CreateProduct = () => {
  const initialState = {
    product_id: "",
    title: "",
    brand: "",
    price: 0,
    stock: 0,
    gender: "",
    category: "",
    description: "",
    content: "",
  };
  const [product, setProduct] = useState(initialState);
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
  } = product;

  const [images, setImages] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "No se ha cargado ningún archivo." },
      });

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "El tamaño de la imagen excede 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "El formato del imagen debe ser png o jpeg.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Seleccione 5 imágenes o menos." },
      });
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "Solo el usuario administrador puede acceder esta función.",
        },
      });

    if (!product_id)
      return res
        .status(400)
        .json({ err: "El SKU del producto es un campo requerido." });

    if (!title)
      return res
        .status(400)
        .json({ err: "El TITLE del producto es un campo requerido." });

    if (!brand)
      return res
        .status(400)
        .json({ err: "La MARCA del producto es un campo requerido." });
    if (!price)
      return res
        .status(400)
        .json({ err: "El PRECIO del producto es un campo requerido." });
    if (!stock)
      return res
        .status(400)
        .json({ err: "La CANTIDAD del producto es un campo requerido." });
    if (!gender)
      return res
        .status(400)
        .json({ err: "El GENERO del producto es un campo requerido." });
    if (category === "all")
      return res
        .status(400)
        .json({ err: "La CATEGORIA del producto es un campo requerido." });
    if (!description)
      return res
        .status(400)
        .json({ err: "La DESCRIPCION del producto es un campo requerido." });
    if (!content)
      return res
        .status(400)
        .json({ err: "El CONTENIDO del producto es un campo requerido." });
    if (images.length === 0)
      return res
        .status(400)
        .json({ err: "La IMAGEN del producto es un campo requerido." });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "product",
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <div className="create-product">
      <Head>
        <title>Products Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="product_id"
            value={product_id}
            placeholder="Sku"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />

          <input
            type="text"
            name="title"
            value={title}
            placeholder="Nombre"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            name="brand"
            value={brand}
            placeholder="Marca"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                placeholder="Precio"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="price">In Stock</label>
              <input
                type="number"
                name="stock"
                value={stock}
                min="1"
                placeholder="Cantidad"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="input-group-prepend px-0 my-2">
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={handleChangeInput}
              className="custom-select text-capitalize"
            >
              <option value="">Seleccione una categoría para el género</option>
              <option value="noaplica">Telas</option>
              <option value="noaplica">Accesorios</option>
              <option value="caballeros">Caballeros</option>
              <option value="damas">Damas</option>
              <option value="nina">Niña</option>
              <option value="nino">Niño</option>
            </select>
          </div>
          <div className="input-group-prepend px-0 my-2">
            <select
              name="category"
              id="category"
              value={category}
              onChange={handleChangeInput}
              className="custom-select text-capitalize"
            >
              <option value="all">Categorías</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="4"
            placeholder="Descripción"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={description}
          />

          <textarea
            name="content"
            id="content"
            cols="30"
            rows="6"
            placeholder="Detalle"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={content}
          />

          <button type="submit" className="btn btn-info my-2 px-4">
            {onEdit ? "Update" : "Create"}
          </button>
        </div>

        <div className="col-md-6 my-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="custom-file border rounded">
              <input
                type="file"
                className="custom-file-input"
                onChange={handleUploadInput}
                multiple
                accept="image/*"
              />
            </div>
          </div>

          <div className="row img-up mx-0">
            {images.map((img, index) => (
              <div key={index} className="file_img my-1">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail rounded"
                />

                <span onClick={() => deleteImage(index)}>X</span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
