import React, { useState, useEffect } from "react";
import { 
  Table, 
  Icon 
} from "antd";

import axios from "axios";

export default function UsersList() {
  //Váriaveis do usuário
  const [user, setUser] = useState([]);
  const [funcionarioFilt, setFuncionarioFilt] = useState([ ]);
  const [state, setState] = useState(true);

   useEffect(() => {
     axios
       .get("http://localhost:4000/users/")
       .then(response => {
         console.log(response.data);

         let filteredWhithKey = response.data.map((item, key) => {
           let returnData = item;
           returnData.key = key;
           console.log(returnData);
           return returnData;
         })
         console.log(filteredWhithKey);
         setFuncionarioFilt(filteredWhithKey);
         setUser(response.data);
         setState(true);
       })
       .catch(function(error) {
         console.log(error);
       });
  }, [state]);

  const eu = [


    ];

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      width: "20%",
      key: "nome"
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      key: "email"
    },
    {
      title: "Senha",
      dataIndex: "senha",
      width: "15%",
      key: "password"
    },
    {
      title: "Categoria",
      dataIndex: "type",
      width: "10%",
      key: "type"
    },
  ];

  return (
    <Table
      style={{ marginTop: 20 }}
      columns={columns}
      dataSource={funcionarioFilt}
    />
  );
}
