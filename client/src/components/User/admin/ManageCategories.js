import React from 'react';
import UserLayout from "../../hocs/UserLayout";
import ManageBrands from './ManageBrands';
import ManageStyles from './ManageStyles';

const ManageCategories = () => {
  return (
    <UserLayout>
      <ManageBrands/>
      <ManageStyles/>
    </UserLayout>
  );
};

export default ManageCategories;