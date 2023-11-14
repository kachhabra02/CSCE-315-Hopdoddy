import React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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


function MenuManagment() {
  const [menu, setMenu] = useState(undefined);
  const [alerts, setAlerts] = useState([]);


  function loadMenu() {
    setMenu(undefined);
    API.get(`/menu/view`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         console.log(res.data);
         setMenu(res.data.map((item) => [item.item_id, item.item_name, item.category, item.sub_category,
                                         item.price, item.is_modification.toString()]));
       }
       else {
         console.log(res.data);
         setMenu(['Error Retrieving Report! Please try again... (may need to use a smaller time window)']);
       }
     })
     .catch((error) => {
       console.log(error);
       setMenu(['Error Retrieving Report! Please try again... (may need to use a smaller time window)']);
     });
  }

  function removeAlert(index) {
    alerts.splice(index, 1);
    setAlerts([...alerts]);
  }

  async function deleteItem(item_info, new_alerts) {
    API.delete(`/menu/item/${item_info[0]}`)
     .then((res) => {
       if (res.status < 300) {
         console.log(`Deleted item ${item_info[1]}`);
         new_alerts.unshift(
           {
             severity: 'success',
             text: `Successfully Deleted Item '${item_info[1]}'`
           }
         );
       }
       else {
         console.log(`Failed to delete item ${item_info[1]}`);
         new_alerts.unshift(
           {
             severity: 'error',
             text: `Failed to Delete Item '${item_info[1]}'`
           }
         );
       }
     })
     .catch((error) => {
       console.log(error);
       new_alerts.unshift(
         {
           severity: 'error',
           text: `Failed to Delete Item '${item_info[1]}'`
         }
       );
     });
  }


  const options = {
    filterType: 'multiselect',
    selectableRows: 'multiple',
    downloadOptions: { filename: 'menu.csv', serparator: ',' },
    draggableColumns: { enabled: true },
    resizableColumns: true,
    onRowsDelete: (rowsDeleted) => {
        const new_alerts = [...alerts];

        const item_info = rowsDeleted.data.map((item) => menu[item.dataIndex]);
        Promise.all(item_info.map(async (item) => deleteItem(item, new_alerts)))
          .then(() => {
            console.log(new_alerts);
            setAlerts(new_alerts);
            loadMenu();
          });
    }
  };
    
  
  if (menu === undefined) {
    loadMenu();
  }
  
  return (
    <Box>
      <br/>
      <Stack sx={{width: '70%'}} spacing={1}>
        {
          alerts.map((item, index) => 
              <Alert severity={item.severity} onClose={() => removeAlert(index)} key={`alert-${index}`}>
                {item.text}
              </Alert>
          )
        }
      </Stack>
      
      <br/>

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