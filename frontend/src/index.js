import React from "react";
import { render } from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";
import "../styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
    let store;

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decodedUser = jwt_decode(localStorage.jwtToken);
        const preloadedState = {
            session: { isAuthenticated: true, user: decodedUser }
        };

        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;

        if (decodedUser.exp < currentTime) {
            store.dispatch(logout());
            window.location.href = "/signin";
        }
    } else {
        store = configureStore({});
    }

    const root = document.getElementById("root");
    render(<Root store={store} />, root);

});