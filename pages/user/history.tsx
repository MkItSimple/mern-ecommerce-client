import React, { useCallback, useEffect, useState } from 'react'
import { getUserOrders } from '../../api/userApi';
import { useApp } from '../../states/AppContext';
import { OrderType } from '../../types';
import { DashboardStyles } from '../../components/styles/DashboardStyles';
import Header from '../../components/Header';
import UserNav from '../../components/nav/UserNav';

const History = () => {
  const { user } = useApp();
  const [orders, setOrders] = useState<OrderType[]>([]);

  const loadUserOrders = useCallback(
    () => {
      getUserOrders(user.token).then((res: any) => {
        setOrders(res.data);
      })
    },
    [user],
  )
  
  useEffect(() => {
    user && loadUserOrders()
  }, [user, loadUserOrders])

  const showEachOrders = (orders: OrderType[]) => {
    let setOrderProducts = []
    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      for (let i = 0; i < order.products.length; i++) {
        const p = order.products[i];
        console.log("return product ", p);
        setOrderProducts.push(p);
      } 
    }
    return setOrderProducts;
  }

  return (
    <DashboardStyles>
      <Header />
      <div className="content_wrapper">
        <div className="left">
          <UserNav />
        </div>
        <div className="right">
          <h1 className="page_header">
            {orders.length > 0 ? "My purchase orders" : "No purchase orders"}
          </h1>
          <table>
            <tr>
              <th >Title</th>
              <th >Price</th>
              <th >Brand</th>
              <th >Color</th>
              <th >Count</th>
              <th >Shipping</th>
              <th >Status</th>
            </tr>
            {showEachOrders(orders).map((p, index) => (
              <tr key={index}>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand}</td>
                <td>{p.color}</td>
                <td>{p.quantity}</td>
                <td>
              {p.shipping === "Yes" ? (
                <span>Yes</span>
              ) : (
                <span>No</span>
              )}
            </td>
                <td>{orders[index].orderStatus}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      
    </DashboardStyles>
  )
}

export default History