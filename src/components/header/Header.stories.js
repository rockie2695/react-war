import React from "react";

import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
export default {
  component: Header,
  title: "header/Header",
};

const Template = (args) => (
  <BrowserRouter>
    <Header {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
