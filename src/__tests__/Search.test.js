import React from "react";
import { shallow } from "enzyme";
import Search from "../Search";

test("Search snapshot", () => {
  const component = shallow(<Search />);
  expect(component).toMatchSnapshot();
});
