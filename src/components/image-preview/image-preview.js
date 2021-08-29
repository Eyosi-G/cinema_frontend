import { IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CancelIcon from "@material-ui/icons/Cancel";

const previewWidth = "120px";
const previewHeight = "120px";

const useStyle = makeStyles((theme) => ({
  previewContainer: {
    position: "relative",
    width: previewWidth,
    margin: theme.spacing(1),
    height: previewHeight,
    display: "flex",
    justifyContent: "center",
  },
  previewHeader: {
    position: "absolute",
    backgroundColor: "grey",
    opacity: "0.7",
    width: previewWidth,
    display: "flex",
    justifyContent: "flex-end",
    bottom: 0,
  },
  previewImage: {
    height: previewHeight,
    width: previewWidth,
    objectFit: "cover",
  },
}));
const ImagePreview = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.previewContainer}>
      <div className={classes.previewHeader}>
        <IconButton size="small" onClick={props.removeCover}>
          <CancelIcon />
        </IconButton>
      </div>
      <img
        className={classes.previewImage}
        src={URL.createObjectURL(props.imageCover)}
      />
    </div>
  );
};

export default ImagePreview;
