import React from "react";

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
            <button onClick={remover(i)}>Remove</button>
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
