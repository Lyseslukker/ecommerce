import { useEffect, useState } from "react";

export const useCheckUser = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    setIsAuthenticated
    setUser(Cookies.get("user"))
    fetch("http://localhost:3000/ecommerce/userCheck", {
        credentials: "include"
    })
    .then(response => response.json())
    .then((data) => {navigate(data.data)})
    .catch(err => navigate("/login"))
  }, [])
}
