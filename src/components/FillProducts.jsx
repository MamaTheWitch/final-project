import React, { useEffect } from 'react';
import { shopItems } from '../data.js';

const FillProducts = () => {
  useEffect(() => {

    let basket = JSON.parse(localStorage.getItem("data")) || [];
    let product = document.getElementById("template");
    document.getElementById("cartAmount").innerText = basket.length;

    for (let i = 0; i < shopItems.length; i++) {

      let clone = product.cloneNode(true)
      clone.id = i

      clone.getElementsByClassName("product-image")[0].src = shopItems[i].pic;
      clone.getElementsByClassName("product-image")[0].alt = shopItems[i].name;
      clone.getElementsByClassName("product-name")[0].innerText = shopItems[i].text;
      clone.getElementsByClassName("price")[0].innerText = shopItems[i].price + " eur";
      clone.getElementsByClassName("custom-select")[0].id = shopItems[i].size;

      let sizeID = clone.getElementsByClassName("custom-select")[0].id;
      let element = clone.getElementsByClassName("custom-select")[0];

      if (sizeID == "A") {
        let child = document.createElement("option"); child.text = "Select size:"; child.value = "0"; element.appendChild(child);
        let child1 = document.createElement("option"); child1.text = "116"; child1.value = "1"; element.appendChild(child1);
        let child2 = document.createElement("option"); child2.text = "128"; child2.value = "2"; element.appendChild(child2);
        let child3 = document.createElement("option"); child3.text = "140"; child3.value = "3"; element.appendChild(child3);
        let child4 = document.createElement("option"); child4.text = "152"; child4.value = "4"; element.appendChild(child4);
        let child5 = document.createElement("option"); child5.text = "164"; child5.value = "5"; element.appendChild(child5);
      }
      else if (sizeID == "B") {
        let child = document.createElement("option"); child.text = "Select size:"; child.value = "0"; element.appendChild(child);
        let child1 = document.createElement("option"); child1.text = "110-120"; child1.value = "1"; element.appendChild(child1);
        let child2 = document.createElement("option"); child2.text = "130-140"; child2.value = "2"; element.appendChild(child2);
        let child3 = document.createElement("option"); child3.text = "150-160"; child3.value = "3"; element.appendChild(child3);
      }
      else if (sizeID == "C") {
        let child = document.createElement("option"); child.text = "Select size:"; child.value = "0"; element.appendChild(child);
        let child1 = document.createElement("option"); child1.text = "0 (27-30)"; child1.value = "1"; element.appendChild(child1);
        let child2 = document.createElement("option"); child2.text = "1 (31-34)"; child2.value = "2"; element.appendChild(child2);
        let child3 = document.createElement("option"); child3.text = "2 (35-38)"; child3.value = "3"; element.appendChild(child3);
        let child4 = document.createElement("option"); child4.text = "3 (39-42)"; child4.value = "4"; element.appendChild(child4);
        let child5 = document.createElement("option"); child5.text = "4 (43-46)"; child5.value = "5"; element.appendChild(child5);
        let child6 = document.createElement("option"); child6.text = "5 (47-49)"; child6.value = "6"; element.appendChild(child6);
      }
      else {
        let child1 = document.createElement("option"); child1.text = "ONE SIZE"; child1.value = "1"; element.appendChild(child1);
      };

      document.body.append(clone);

      function AddPrintText() {
        if (shopItems[i].print == 0) {
          return document.getElementsByClassName("addnumber")[i + 1].innerText = "Price including print.";
        }
        else if (shopItems[i].print == null) {
          return document.getElementsByClassName("addnumber")[i + 1].innerText = "Print is not available.";
        }
        else {
          return document.getElementsByClassName("addnumber")[i + 1].innerText = "Add a number? (+" + shopItems[i].print + "€)";
        }
      };
      AddPrintText()

      let checkBox = document.getElementsByClassName("PrintCheck")[i + 1];

      function AddPrintPrice() {
        if (checkBox.checked == true) {
          return document.getElementsByClassName("price")[i + 1].innerText = (shopItems[i].price + shopItems[i].print).toFixed(2) + " eur";
        }
        else {
          return document.getElementsByClassName("price")[i + 1].innerText = shopItems[i].price + " eur";
        }
      };

      clone.getElementsByClassName("PrintCheck")[0].addEventListener("click", function() { AddPrintPrice() });

      clone.getElementsByClassName("add-to-cart-button")[0].addEventListener("click", function() {
        var sizeSelection = clone.getElementsByClassName("custom-select")[0].value;
        var select = clone.getElementsByClassName("custom-select")[0];
        var sizeSelection2 = select.options[select.selectedIndex].textContent;

        let queryDict = location.search.substr(1).split("=")[1];
        let queryName = queryDict.split("+");
        let fullName = `${queryName[0]} ${queryName[1]}`;

        if (sizeSelection == "0") {
          return alert("Please select the size!");
        }
        else
          var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);

        basket.push({
          player: fullName,
          image: shopItems[i].pic,
          product: shopItems[i].name,
          item: shopItems[i].text,
          size: sizeSelection2,
          print: checkBox.checked,
          price: AddPrintPrice(),
          price2: parseFloat(AddPrintPrice()),
        });

        console.log(basket);

        localStorage.setItem("data", JSON.stringify(basket));

        document.getElementById("cartAmount").innerText = basket.length;

      });

    };

  }, []);
  return (
    <div className="product-card" id="template" style={{ margin: "10px" }}>
      <div>
        <img className="product-image" src="" alt="" />
      </div>
      <div className="product-info">

        <h2 className="product-name"> </h2>
        <hr />

        <div style={{ width: "50px" }}>
          <select className="custom-select" id=""></select>
        </div>

        <h2 className="addnumber"></h2>

        <span className="price"></span>

        <label className="switch">
          <input type="checkbox" className="PrintCheck" />
          <span className="slider"></span>
        </label>

        <button className="add-to-cart-button"> add to cart 🛒 </button>





      </div>
    </div>
  );
};
export default FillProducts;