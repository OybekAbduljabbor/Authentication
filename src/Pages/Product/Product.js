import React, { useState, useEffect } from "react";
import "./Product.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import loadingAnimate from "../../Assets/Icons/loading.gif";

export function Product() {
  const token = useSelector((state) => state.reToken.token);
  const [data, setData] = React.useState([]);
  const [page, setPage] = useState(sessionStorage.getItem("page"));
  const [show_more, setShowMore] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      setLoading(true);
      axios(" https://toko.ox-sys.com/variations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setData(res.data.items);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

    return () => (isSubscribed = false);
  }, [token]);

  const result = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.barcode.toLowerCase().includes(search.toLowerCase())
    );
  });

  console.log(result);

  return (
    <div id="page-product">
      <h1>Maxsulotlar Jadvali</h1>
      <table border="1" id="table-product">
        <thead>
          <tr id="search-product">
            <td colSpan="4">
              <input
                type="text"
                placeholder="Search product Name or  BarCode"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                  setShowMore(10);
                }}
              />
            </td>
          </tr>
          <tr id="table-tr">
            <th id="table-no">№</th>
            <td>Name</td>
            <td>Barcode</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {result
            .slice(show_more === 10 ? 0 : show_more - 10, show_more)
            .map((item, index) => {
              return (
                <tr id="table-tr" key={item.id}>
                  <th id="table-no">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.barcode}</td>
                  <td>${item.importRecord.stockSellPrice.USD}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div id="pagenation">
        <Pagination
          count={Math.floor(result.length / 10) || 1}
          color="primary"
          page={+page}
          // defaultPage={}
          onChange={(e, value) => {
            sessionStorage.setItem("page", value);
            setPage(value);
            setShowMore(10 * value);
          }}
        />
      </div>

      <div id="loading" style={loading ? { display: "flex" } : {}}>
        <figure>
          <img src={loadingAnimate} alt="" />
        </figure>
      </div>
    </div>
  );
}
