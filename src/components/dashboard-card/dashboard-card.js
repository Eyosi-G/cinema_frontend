import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Button, CardActions, Link } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";

const DashboardCard = (props) => {
  const history = useHistory();
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography component="h4" variant="h4">
          {props.amount}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions style={{ textAlign: "center" }}>
        <Button
          size="small"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          onClick={() => history.push(props.path)}
        >
          More info
        </Button>
      </CardActions>
    </Card>
  );
};

export default DashboardCard;
