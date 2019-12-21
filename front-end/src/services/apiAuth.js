import axios from "axios";
import {setToken, usernameAPI, passwordAPI} from "./auth";
const token = () => {
  setTimeout(autenticar_API,1);
  setInterval(autenticar_API,1000*60*60*23); // EXECUTA A API EM INTERVALO DE TEMPO (EM MILISEGUNDOS)

  function autenticar_API(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let request = {}
    request.username = usernameAPI;
    request.password = passwordAPI;
    axios
      .post(proxyurl+"http://200.134.18.85:19881/login", request)
      .then((res) => {
        setToken(res.data.token);
      }).catch((err) => {
        console.log(err);
      })
  }
};
export default token;