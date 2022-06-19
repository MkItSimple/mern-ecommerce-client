import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { changeStatus } from '../../api/admin';
import { getUserOrders } from '../../api/userApi';
import CartDrawer from '../../components/drawers/CartDrawer';
import Header from '../../components/Header'
import AdminNav from '../../components/nav/AdminNav'
import Orders from '../../components/order/Orders'

import { DashboardStyles } from '../../components/styles/DashboardStyles';
import { useApp } from '../../states/AppContext';
import { OrderType } from '../../types';

const Dashboard = () => {
  const { user, openCartDrawer } = useApp();

  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId: string, orderStatus: string) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };
  return (
    <DashboardStyles>
      {openCartDrawer && <CartDrawer />}
      <Header />
      <div className="content_wrapper">
        <div className="left">
          <AdminNav />
        </div>
        <div className="right">
          <div className="wrapper">
            <h1 className="page_header">Customers Orders</h1>
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
      
    </DashboardStyles>
  )
}

export default Dashboard