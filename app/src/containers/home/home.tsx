import React, { useContext, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./homeStyles";

import Sidebar from "../sidebar/sidebar";
import Drive from "../../components/drive/drive";
import Overview from "../../components/overview/overview";
import PodSidebar from "../../components/podSidebar/podSidebar";

export interface Props {
  directory?: string;
}

function Home(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  return (
    <div className={classes.Home}>
      <PodSidebar isOpen={true} route={"drive"}></PodSidebar>
      <Drive isPodBarOpen={true}></Drive>
    </div>
  );
}

export default React.memo(Home);
