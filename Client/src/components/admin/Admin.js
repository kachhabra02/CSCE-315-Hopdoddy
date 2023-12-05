import React from 'react'
import { useState } from 'react';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MUIDataTable from 'mui-datatables';

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 10000 // 10 second timeout
});

const title = 'User Administration';

const columns = [
  {
    name: 'First',
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: 'Last',
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: 'Email',
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: 'Permission Level',
    options: {
      filter: false,
      sort: true,
      customBodyRender: ({ isManager, isAdmin }) => {
        const permissionLevel = (() => {
          if (isAdmin)
            return 'Admin';
          else if (isManager) 
            return 'Manager';
          else 
            return 'Cashier';
        })();
        return (
          <div>{permissionLevel}</div>
        );
      }
    }
  },
  {
    name: 'Actions',
    options: {
      filter: false,
      sort: true,
      customBodyRender: data => {
        return data;
      }
    }
  }
];

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'restockReport.csv', serparator: ',' },
  draggableColumns: { enabled: true },
  resizableColumns: true
};


function Admin() {
  const [data, setData] = useState([
    ['Thomas', 'Holt', 'tmholt02@gmail.com', { isAdmin: 1 }, "Actions!!"],
    ['Donato', 'Curvino', 'dn@gmail.com', { isManager: 1 }, "Actions!!"],
    ['Ryan', 'Pohl', 'rp@gmail.com', {}, "Actions!!"],
  ]);

  // React.useEffect(() => {
  //   getUsers()
  //     .then(data => {
  //       setData(data);
  //     });
  // }, []);

  return (
    <Box>
      {data === undefined ? <CircularProgress /> :
        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={options}
        />
      }
    </Box>
  );
}

// async function getUsers() {
//   try {
//     const res = await API.get(`/users`);
//     if (res.status < 300) {
//       console.log('Success');
//       return (res.data.map((item) => [
//         item.first_name,
//         item.last_name,
//         item.email,
//         item.is_manager,
//         item.is_admin
//       ]));
//     }
//     else {
//       console.log(res.data);
//       return ['Error Retrieving Report! Please try again... (may need to use a smaller time window)'];
//     }
//   }
//   catch (error) {
//     console.log(error);
//     return ['Error Retrieving Report! Please try again... (may need to use a smaller time window)'];
//   }
// }

export default Admin
