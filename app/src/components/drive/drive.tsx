import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./driveStyles";
import { Modal } from "@material-ui/core";
import CardGrid from "../../components/cardGrid/cardGrid";
import FileCard from "../../components/cards/fileCard";
import FileModal from "../../components/fileModal/fileModal";
import UploadModal from "../../components/uploadModal/uploadModal";
import sortByProp from "../../store/helpers/sort";
import OpenInDapp from "../modals/openInDapp/openInDapp";
import ButtonNavbar from "../buttonNavbar/buttonNavbar";
import FileList from "../fileList/fileList";
import {
  ButtonPlus,
  PodInfo,
  ShareIcon,
  UploadIcon,
} from "../../components/icons/icons";
import { CreateNew } from "../modals/createNew/createNew";
import {
  createDirectory,
  downloadAllFiles,
  filePreview,
} from "src/store/services/fairOS";
import urlPath from "src/store/helpers/urlPath";

export interface Props {
  isPodBarOpen: boolean;
}

function Drive(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [responseCreation, setResponseCreation] = useState(false);
  const [blob, setBlobFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toSortProp = "name";

  const classes = useStyles({ ...props, ...theme });

  async function loadDirectory() {
    try {
      // actions.setDirectory("root");
      actions.getDirectory({
        directory: state.directory,
        password: state.password,
        podName: state.podName,
      });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (state.entries === null || state.entries === undefined) loadDirectory();
  });

  useEffect(() => {
    loadDirectory();
    state.fileUploaded = false;
    state.searchQuery = null;

    // eslint-disable-next-line
  }, [state.fileUploaded, state.directory, responseCreation]);

  useEffect(() => {
    createListOfImages();
  }, [state.entries]);

  const handleShowDialog = (blobFile: any) => {
    setBlobFile(blobFile);
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  const createListOfImages = async () => {
    if (state.entries?.length > 0) {
      const res = state.entries.filter((entry) =>
        entry.content_type.includes("image")
      );
      actions.downloadAllFiles({
        files: res,
        directoryName: state.directory,
        podName: state.podName,
      });
      // setImages(mappedImages);
    }
  };

  const handleUploadModal = async (value) => {
    setOpenUpload(value);
  };

  useEffect(() => {
    if (responseCreation === true) {
      setOpen(false);
      setResponseCreation(false);
    }
  }, [responseCreation]);

  return (
    <div className={classes.Drive}>
      {/* Needs to go into buttonNavbar component */}
      <div className={classes.actionWrapper}>
        <div className={classes.actionRow}>
          <div className={classes.actionButton}>
            <UploadModal
              open={openUpload}
              handleUploadModal={handleUploadModal}
            >
              <UploadIcon
                className={classes.buttonIcon}
                onClick={() => handleUploadModal(true)}
              />
              Upload
            </UploadModal>
          </div>
          <div className={classes.actionText}>
            Upload Files from your local storage
          </div>
        </div>
      </div>
      <CardGrid className={classes.cardGrid}>
        {state.downloadedFiles !== null &&
          state.downloadedFiles !== undefined &&
          state.downloadedFiles.map((image: any) => (
            <img
              className={classes.imagePreview}
              src={image}
              onClick={handleShowDialog}
              alt="img"
            ></img>
          ))}
        {(state.downloadedFiles === null ||
          state.downloadedFiles === undefined) && <div>Loading files..</div>}
      </CardGrid>
      {isOpen && (
        <dialog
          style={{ position: "absolute" }}
          open
          onClick={handleShowDialog}
        >
          <img src={blob} onClick={closeDialog} alt="no image" />
        </dialog>
      )}
    </div>
  );
}

export default React.memo(Drive);
