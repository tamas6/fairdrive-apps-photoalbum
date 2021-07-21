import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./footerStyles";
import {
  LinumLabs,
  FairdData,
  Github,
  Medium,
  Discord,
} from "src/components/icons/icons";

export interface Props {}

function Footer(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.footer}>
      <div className={classes.links}>
        <FairdData className={classes.link} style={{ height: "5rem" }} />
        <LinumLabs className={classes.link} style={{ height: "7rem" }} />
      </div>
      <div className={classes.links}>
        <div className={classes.text}>
          <span className={classes.footerText}>
            © 2021 Fairdrive. All rights reserved
          </span>
          <span className={classes.footerText}>*</span>
          <span className={classes.footerText}>Terms and conditions</span>
          <span className={classes.footerText}>*</span>
          <span className={classes.footerText}>Privacy Policy </span>
          <div className={classes.divider}></div>
          <span className={classes.footerText}>Sand box environment</span>
        </div>
        <a
          rel="noopener noreferrer"
          target="_blank"
          className={classes.linkItem}
          href="https://github.com/fairDataSociety/"
        >
          <Github className={classes.linkIcon} />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          className={classes.linkItem}
          href="https://medium.com/fair-data-society"
        >
          {" "}
          <Medium className={classes.linkIcon} />
        </a>
      </div>
    </div>
  );
}

export default React.memo(Footer);
