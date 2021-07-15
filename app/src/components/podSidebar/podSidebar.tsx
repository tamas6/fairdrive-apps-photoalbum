import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./podSidebarStyles";
import Toggle from "../toggle/toggle";
import { createPod } from "../../store/services/fairOS";
import { PodChevron, PodInfo } from "../icons/icons";
import { Modal } from "@material-ui/core";
import CreateNew from "../modals/createNew/createNew";

export interface Props {
  isOpen: boolean;
  route: string;
}

function PodSidebar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [isPrivate, setIsPrivate] = useState(false);
  const classes = useStyles({ ...props, ...theme });
  const pods = ["Private Pod", "Shared Pod", "My Photos"];
  const [open, setOpen] = useState(false);
  const [podName, setPodName] = useState("");
  const [podCreated, setPodCreated] = useState(false);
  useEffect(() => {
    if (state.podsOpened.includes(state.podName))
      actions.getDirectory({ directory: "root", podName: state.podName });
    // eslint-disable-next-line
    actions.setDirectory("root");
    actions.getDirectory({
      directory: state.directory,
      podName: state.podName,
    });
  }, [state.podName, state.podsOpened]);

  const setPod = async (pod) => {
    actions.setPodName(pod);
    if (!state.podsOpened.includes(pod))
      actions.openPod({ password: state.password, podName: pod });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const setOverview = async (pod) => {
    // await actions.setPodName(pod);
    // if (!state.podsOpened.includes(pod))
    //   await actions.openPod({ password: state.password, podName: pod });
  };
  const createNewPod = async () => {
    await createPod({ password: state.password, podName });
    setPodCreated(true);
  };
  useEffect(() => {
    actions.getPods();
    setPodCreated(false);
    // eslint-disable-next-line
  }, [podCreated]);

  useEffect(() => {
    actions.setPrivatePod(isPrivate);
    // eslint-disable-next-line
  }, [isPrivate]);

  return (
    <div className={classes.podDrawer}>
      {/* <button className={classes.podButton} onClick={handleOpen}>
        {isPrivate ? "Create Pod" : "Import Pod"}
      </button> */}
      {props.route === "Overview" ? (
        <div className={classes.pods}>
          {pods.map((pod) => {
            return (
              <div className={classes.podRow} onClick={() => setOverview(pod)}>
                <label>{pod}</label>
                <PodChevron className={classes.podChevron} />
              </div>
            );
          })}
        </div>
      ) : props.route !== "Explore" ? (
        <div className={classes.pods}>
          {state.pods.map((pod) => {
            return (
              <div className={classes.podRow} onClick={() => setPod(pod)}>
                <label>{pod}</label>
                <PodChevron className={classes.podChevron} />
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      <div className={classes.podInfoWrapper}>
        <PodInfo className={classes.podInfo} />
      </div>
      {/* <Plus onClick={handleOpen} className={classes.Icon}></Plus> */}
      <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreateNew
          handleClick={createNewPod}
          handleClose={handleClose}
          setProp={setPodName}
          type="Pod"
        ></CreateNew>
      </Modal>
    </div>
  );
}

export default React.memo(PodSidebar);
