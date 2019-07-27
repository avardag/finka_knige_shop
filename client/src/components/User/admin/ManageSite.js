import React from 'react';

import UpdateSiteInfo from './UpdateSiteInfo';
import UserLayout from '../../hocs/UserLayout';

const ManageSite = () => {
  return (
    <div>
      <UserLayout>
        <UpdateSiteInfo/>
      </UserLayout>
      
    </div>
  );
};

export default ManageSite;