/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./driveStyles";
import CardGrid from "../../components/cardGrid/cardGrid";
import UploadModal from "../../components/uploadModal/uploadModal";

import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { UploadIcon } from "../../components/icons/icons";
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
  useEffect(() => {
    createListOfImages();
  }, [state.entries]);
  async function handleUploadModal(value) {
    setOpenUpload(value);
  }

  useEffect(() => {
    if (responseCreation === true) {
      setOpen(false);
      setResponseCreation(false);
    }
  }, [responseCreation]);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImgLoad = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleZoomChange = useCallback((shouldZoom) => {
    setIsZoomed(shouldZoom);
  }, []);
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
            <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
              <img className={classes.imagePreview} src={image} alt="img"></img>
            </ControlledZoom>
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
