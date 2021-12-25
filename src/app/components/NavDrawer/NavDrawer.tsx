import React from "react";
import { Box, DrawerProps, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppTheme } from "app/theme/types";
import { useClaimEnabled } from "app/utils";
import { NavigationContent } from "./components";
import navigationConfig from "./navigationConfig";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    "& .MuiList-padding": {
      padding: 0,
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowY: "unset",
  },
  content: {
    flex: 1,
    overflowY: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    "&>svg": {
      height: theme.spacing(3),
      width: theme.spacing(3),
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    "& button": {
      minWidth: 0,
      padding: theme.spacing(1.5),
      color: "#A4A4A4",
      "& svg": {
        height: theme.spacing(2),
        width: theme.spacing(2),
      },
    },
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  badge: {
    height: "auto",
    padding: theme.spacing(0.5, 1.5),
    borderRadius: theme.spacing(0.5),
    "& .MuiChip-label": {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "4px 22px",
    justifyContent: "flex-start",
    minHeight: "48px",
    backgroundColor: theme.palette.toolbar.main,
  },
  price: {
    color: theme.palette.primary.dark,
    fontSize: 16,
    marginTop: "1px",
  },
  currencyLogo: {
    height: 24,
    width: 24,
    marginRight: theme.spacing(0.3),
    marginLeft: theme.spacing(0.5),
  },
  brandButton: {
    padding: "4px 10px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  hoverEffect: {
    transition: "width .4s ease-in-out",
    "&:hover": {
      width: 260,
      transition: "width .4s ease-in-out",
    },
  },
  boxCompact: {
    padding: 0,
    justifyContent: "center",
  },
  footerBoxCompact: {
    padding: theme.spacing(2, 0),
    justifyContent: "center",
  },
  box: {
    minWidth: 260,
  },
  footerBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerCompact: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  socialCompact: {
    flexDirection: "column",
    paddingLeft: 0,
  },
  compactTheme: {
    margin: 0,
  },
  compactPrice: {
    fontSize: 10,
    paddingBottom: "12px",
  },
}));

const NavDrawer: React.FC<DrawerProps> = (props: any) => {
  const { onClose } = props;
  const claimEnabled = useClaimEnabled();
  const classes = useStyles();

  return (
    <Box className={classes.content}>
      {navigationConfig.map((navigation, listIndex) => (
        <List key={listIndex}>
          {navigation.pages
            .filter((navigation) => navigation.show || claimEnabled)
            .map((page, index) => (
              <NavigationContent
                onClose={onClose}
                key={index}
                navigation={page}
                showDrawer={true}
              />
            ))}
        </List>
      ))}
    </Box>
  );
};

export default NavDrawer;
