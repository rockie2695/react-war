import React from "react";

import Tab from "./Tab";
export default {
  component: Tab,
  title: "header/Tab",
};

const Template = (args) => (
  <a className="flex items-center hover:bg-white hover:text-black hover:ease-in-out duration-300">
    <Tab {...args} />
  </a>
);

export const Default = Template.bind({});
Default.args = {
  title: "page title",
};
