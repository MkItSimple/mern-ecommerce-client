import React from "react";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>{p.title}</td>
            <td>{p.price}</td>
            <td>{p.brand}</td>
            <td>{p.color}</td>
            <td>{p.quantity}</td>
            <td>
              {p.shipping === "Yes" ? (
                // <CheckCircleOutlined style={{ color: "green" }} />
                <span>check</span>
              ) : (
                // <CloseCircleOutlined style={{ color: "red" }} />
                <span>uncheck</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id}>
          <div>
            {/* <ShowPaymentInfo order={order} showStatus={false} /> */}

            <div className="row">
              <div>Delivery Status</div>
              <div>
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="regular"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
