import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";
import CopyrightIcon from "@material-ui/icons/Copyright";
import InstagramIcon from "@material-ui/icons/Instagram";

const Footer = () => {
  return (
    <div>
      <Divider />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box display="flex">
          <CopyrightIcon />
          <Box mr={1} />
          <Typography>copyright 2021</Typography>
        </Box>
        <Box display="flex">
          {/* <FacebookIcon style={{color:"#3B5998"}} /> */}
          <Box mr={1} />
          <TwitterIcon />
          <Box mr={1} />
          <InstagramIcon />
          <Box mr={1} />
          <TelegramIcon />
        </Box>
      </Box>
    </div>
  );
};

export default Footer;
