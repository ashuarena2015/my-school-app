import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

import { RootState } from "./services/store";

import ScreenNavigation from "./ScreenNavigation";

const ScreenWrapper = () => {
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state: RootState) => state.users);

  console.log("ScreenWrapper loginUser", loginUser);

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
    console.log("Fetching initial data...");
    fetchInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!isLoaded) return null; // or loading screen

  return <ScreenNavigation loginUser={loginUser} />;
};
export default ScreenWrapper;
