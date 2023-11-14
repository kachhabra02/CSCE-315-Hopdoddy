import React from 'react';
import { useState } from 'react';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MUIDataTable from "mui-datatables";

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 30000 // 30 second timeout
});


const title = 'Menu Management';

const columns = [
    {
      name: 'Item ID',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Category',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Subcategory',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Price',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Is Modification?',
      options: {
        filter: true,
        sort: true
      }
    }
];

const options = {
  filterType: 'multiselect',
  selectableRows: 'multiselect',
  downloadOptions: { filename: 'menu.csv', serparator: ',' }
};


function MenuManagment() {
  const [menu, setMenu] = useState(undefined);
    
  API.get(`/menu/view`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         setMenu(res.data.map((item) => [item.item_id, item.item_name, item.category, item.sub_category,
                                         item.price, item.is_modification]));
       }
       else {
         console.log(res.data);
       }
     })
     .catch((error) => {
       console.log(error);
     });
 
  return (
    <Box>
      <br/><br/><br/>
      
      {menu === undefined ? <CircularProgress /> :
        <MUIDataTable
          title={title}
          data={menu}
          columns={columns}
          options={options}
        />
      }
    </Box>
  );
}

export default MenuManagment