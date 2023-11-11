import React from "react";
import {BsFillTrash3Fill} from "react-icons/bs";

function TransactionList({orders, remover}) {
    const priceFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    });
    var orderList = orders.map((item, i) => (
        <div>
            <span>{item.item_name}</span>
            <span>{priceFormat.format(parseFloat(item.price))}</span>
            <button onClick={remover(i)}><BsFillTrash3Fill/></button>
        </div>
    ));

    return (
        <div className="TransactionList">
            <h2>This is the TransactionList</h2>
            <ol>
                {orderList}
            </ol>
        </div>
    );
}

export default TransactionList;
