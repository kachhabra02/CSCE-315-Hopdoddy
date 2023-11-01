import React from "react";

function TransactionList({orders}) {
    const priceFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    });
    var orderList = orders.map((item) => (
        <div>
            <span>{item.item_name}</span>
            <span>{priceFormat.format(parseFloat(item.price))}</span>
        </div>
    ));

    return (
        <div className="TransactionList">
            <h2>This is the TransactionList</h2>
            {orderList}
        </div>
    );
}

export default TransactionList;
