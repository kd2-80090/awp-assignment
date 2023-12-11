import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./style.css"

function ProductList() {
  const url = "http://localhost:5000/products"

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({ productid: "", producttitle: "", price: "", stock: "" });



  const FetchRecords = () => {
    axios.get(url).then((result) => {
      setProducts(result.data);
    });
  }

  const DeleteRecord = (productid) => {
    console.log(`${productid} record is about to get deleted`);
    var deleteUrl = url + "/" + productid;
    axios.delete(deleteUrl)
      .then((result) => {
        if (result.data.affectedRows !== undefined &&
          result.data.affectedRows > 0) {
          FetchRecords();
        }
      });
  }

  const OnTextChanged = (args) => {
    var copyOfProduct = { ...product };
    copyOfProduct[args.target.name] = args.target.value;
    setProduct(copyOfProduct);
  }

  const AddRecord = () => {
    debugger;
    axios.post(url, product).then((result) => {
      if (result.data.affectedRows !== undefined &&
        result.data.affectedRows > 0) {
        FetchRecords();
        Reset();
      }
    });
  }

  

  const EditData = (productid) => {
    for (var i = 0; i < products.length; i++) {
      if (products[i].productid === productid) {
        var productToEdit = { ...products[i] };
        setProduct(productToEdit);
        break;
      }
    }
  }

  const UpdateRecord = () => {
    const updateUrl = url + "/" + product.productid;
    axios.put(updateUrl, product)
      .then((result) => {
        if (result.data.affectedRows !== undefined &&
          result.data.affectedRows > 0) {
          FetchRecords();  //to fetch new records after updated data
          Reset();
        }
      });
  }


  const Reset = () => {
    setProduct({ productid: "", producttitle: "", price: "", stock: "" });
  }

  useEffect(() => {FetchRecords()},[]);

  return (

    <div className="container">
      <div>
        <table >
          <tbody>
            <tr className="a">
              <td >
                <img src="http://localhost:3000/logo.png" className="logo" alt="logo" />
              </td>
              <td className="b" >
                <h2>Product</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table-responsive">
        <center>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Product Id</td>
                <td>
                  <input type="text" name="productid"
                    value={product.productid}
                    onChange={OnTextChanged}>
                  </input>
                </td>
              </tr>
              <tr>
                <td>Product Title</td>
                <td>
                  <input type="text" name="producttitle"
                    value={product.producttitle}
                    onChange={OnTextChanged}>
                  </input>
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input type="text" name="price"
                    value={product.price}
                    onChange={OnTextChanged}>
                  </input>
                </td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>
                  <input type="number" name="stock"
                    value={product.stock}
                    onChange={OnTextChanged}>
                  </input>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button id="btn" className="btn btn-primary"
                    onClick={AddRecord}>
                    Submit
                  </button>{" "}
                  <button id="btn" className="btn btn-secondary"
                    onClick={Reset}>
                    Reset
                  </button> {" "}
                  <button id="btn" className="btn btn-info  "
                    onClick={UpdateRecord}>
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </center>

        <center>
          <table className="table">
            <thead className="table table-dark">
              <tr>
                <th>Product ID</th>
                <th>Product Title</th>
                <th>Price</th>
                <th>Stock</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody >
              {
                products.map((product) => {
                  return (
                    <tr key={product.productid}>
                      <td>{product.productid}</td>
                      <td>{product.producttitle}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td><button id="btn" className="btn btn-warning"
                        onClick={() => { EditData(product.productid) }}>
                        Edit
                      </button> {" "}
                      </td>
                      <td>
                        <button id="btn" className="btn btn-danger"
                          onClick={() => { DeleteRecord(product.productid) }}>
                          Delete
                        </button>
                      </td>
                    </tr>)
                })
              }
            </tbody>
          </table>
        </center>
      </div>
    </div>);
}

export default ProductList;