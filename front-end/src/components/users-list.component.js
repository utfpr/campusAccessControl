import React, { useState, useEffect } from "react";
import { 
  Table, 
  Button
} from "antd";

import axios from "axios";

export default function UsersList() {
  //Váriaveis do usuário
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
     setLoading(true);
     axios
       .get("http://localhost:4000/users/")
       .then(response => {
         console.log(response.data);
         setUsers(response.data);
       })
       .catch(function(error) {
         console.log(error);
       }).finally(() =>{
         setLoading(false);
       })
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "user_name",
      width: "20%",
      key: "nome"
    },
    {
      title: "Email",
      dataIndex: "user_email",
      width: "20%",
      key: "email"
    },
    {
      title: "Senha",
      dataIndex: "user_password",
      width: "15%",
      key: "password"
    },
    {
      title: "Categoria",
      dataIndex: "user_type",
      width: "10%",
      key: "type"
    },
    {
      title: "Ações",
      render: () => {
        return <Button>Alo</Button>;
      }
    },
  ];

  return (
    <Table
      style={{ marginTop: 20 }}
      columns={columns}
      rowKey={data => data._id}
      dataSource={users}
    />
  );
}
