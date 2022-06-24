import React from "react";

import Tab from "./Tab";
export default {
  component: Tab,
  title: "header/Tab",
};

const Template = (args) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a className="flex items-center hover:bg-white hover:text-black hover:ease-in-out duration-300">
    <Tab {...args} />
  </a>
);

export const Default = Template.bind({});
Default.args = {
  title: "page title",
};
