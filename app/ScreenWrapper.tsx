import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";
import { RootState } from "./services/store";
import useWebSocket from "./components/RealTimeMessage/webSocket";

import ScreenNavigation from "./ScreenNavigation";

const ScreenWrapper = () => {
  const dispatch = useDispatch();
  const { loginUser, isNewNotification } = useSelector((state: RootState) => state.users);

  const fetchInitialData = async () => {
    await dispatch({
      type: "apiRequest",
      payload: {
        url: `${API_URL}/user/adminInfo`,
        method: "GET",
        onSuccess: "users/adminInfo",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "schoolGeneralInfo",
      },
    });

    await dispatch({
      type: "apiRequest",
      payload: {
        url: `${API_URL}/user/auth`,
        method: "GET",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "authLogin",
      },
    });
    
  };

  useEffect(() => {
    fetchInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isNotification, setIsNotification] = useState(false);

  useWebSocket((data: any) => {
    console.log("WebSocket data received:", data);
    setIsNotification(data);
    dispatch({
      type: "users/getNotifications",
      payload: true,
    });
  })

  useEffect(() => {
    setIsNotification(isNewNotification);
  },[isNewNotification]);

  console.log({isNewNotification});
  return <ScreenNavigation loginUser={loginUser} isNotification={isNotification} />;
};
export default ScreenWrapper;
