import { useState, useEffect } from "react";
import { api } from "../helpers/api";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const url = "/users/auth";

      if (!token || token === "null") {
        console.log("no token or username,password");
        setIsAuth(false);
        localStorage.setItem("token", null);
      }

      try {
        console.debug("request to", url, "with token", token);
        const res = await api.post(url, JSON.stringify({ token }));
        console.log(res);
        setIsAuth(false);

        if (res.status === 200) {
          console.log("authenticated");
          setIsAuth(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("myId", res.data.id);
        }
      } catch (e) {
        console.log(e);
        setIsAuth(false);
        localStorage.setItem("token", null);
        localStorage.setItem("myId", null);
      }
    };

    fetchData();
  }, []);

  return isAuth;
};
