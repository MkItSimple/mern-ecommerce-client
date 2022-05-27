import React from 'react'
import styled from 'styled-components';
import CartDrawer from '../../components/drawers/CartDrawer';
import Header from '../../components/Header'
import AdminNav from '../../components/nav/AdminNav'
import { DashboardStyles } from '../../components/styles/DashboardStyles';
import { useApp } from '../../states/AppContext';

const Dashboard = () => {
  const { openCartDrawer } = useApp();
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
            <h1 className="page_header">Admin Dashboard</h1>
          </div>
        </div>
      </div>
      
    </DashboardStyles>
  )
}

export default Dashboard