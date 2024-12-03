import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Cart from "./features/cart/Cart";
import Menu from "./features/menu/Menu";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order/:id", element: <Order /> },
      { path: "/order/new", element: <CreateOrder /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
