import React, { useState, useEffect } from "react";
import { 
  Table,
  Input
} from "antd";

import axios from "axios";

export default function UsersList() {
  // Váriaveis do usuário
  const [user, setUser] = useState({});

  // Váriaveis controle
  const [state, setState] = useState(true);

  return(
    <Input placeholder="teste"/>
  );

}