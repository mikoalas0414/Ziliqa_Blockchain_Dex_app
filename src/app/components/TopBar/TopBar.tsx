import React, { Fragment, useMemo } from "react";
import {
  AppBar,
  Box,
  Button,
  Hidden,
  IconButton,
  Link,
  Toolbar,
  useMediaQuery,
  AppBarProps,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cls from "classnames";
import { Link as RouterLink, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Brand } from "app/components/TopBar/components";
import { ReactComponent as Logo } from "app/components/NavDrawer/logo2.svg";
import RewardsInfoButton from "app/layouts/RewardsInfoButton";
import { RootState, WalletState } from "app/store/types";
import { AppTheme } from "app/theme/types";
import ConnectWalletButton from "../ConnectWalletButton";
import DrawerConfig from "../DrawerComp/DrawerConfig";
import { ReactComponent as MenuIcon } from "./menu.svg";
import { TopBarProps } from "./types";
import { ReactComponent as SwapLogo } from "./assets/swap.svg";
import { ReactComponent as PoolLogo } from "./assets/pool.svg";
import { ReactComponent as ZilBridgeLogo } from "./assets/zilbridge.svg";
import { ReactComponent as ZiloLogo } from "./assets/zilo.svg";
import { local } from "web3modal";
import { format } from "path";
import { formatters } from "validate.js";

interface Props extends TopBarProps, AppBarProps {
  onToggleTabDrawer?: (override?: boolean) => void;
  currentPath?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    "& .MuiGrid-container": {
      flexWrap: "nowrap",
    },
  },
  toolBar: {
    justifyContent: "space-between",
    padding: 0,
    borderBottom: "1px solid transparent",
    borderImage:
      theme.palette.type === "dark"
        ? "linear-gradient(to left, #003340 1%, #00FFB0  50%, #003340 100%) 0 0 100% 0/0 0 1px 0 stretch"
        : "",
    [theme.breakpoints.up("sm")]: {
      "&>div": {
        flex: 1,
        flexBasis: 1,
        display: "flex",
        flexDirection: "row",
      },
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 0,
    },
  },
  themeSwitch: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  chipText: {
    color: theme.palette.text.primary,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    justifyContent: "flex-start",
  },
  brandButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  brandBox: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(4),
    },
    "& svg": {
      height: 24,
    },
    "&:hover": {
      textDecoration: "none",
    },
    cursor: "pointer",
  },
  menuIcon: {
    paddingRight: theme.spacing(2),
  },
  navLinkBox: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
  },
  navLinkButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  selectedMenu: {
    color: "#26D4FF!important",
    "-webkit-text-stroke-color": "rgba(107, 225, 255, 0.2)",
    "-webkit-text-stroke-width": "1px",
  },
  navLink: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    color: "#DEFFFF",
    whiteSpace: "nowrap",
  },
  logoLetter: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "ConthraxHv-Regular",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: 15,
    "&>svg": {
      height: 25,
    },
  },
}));

const TopBar: React.FC<Props> = (props: Props) => {
  const {
    children,
    className,
    onToggleDrawer,
    onToggleTabDrawer,
    currentPath,
    ...rest
  } = props;
  const classes = useStyles();
  const isXs = useMediaQuery((theme: AppTheme) => theme.breakpoints.down("xs"));
  const walletState = useSelector<RootState, WalletState>(
    (state) => state.wallet
  );
  const location = useLocation();
  const history = useHistory();

  const renderLogo = useMemo(() => {
    const current = location.pathname;

    if (current.indexOf("/swap") === 0) return <SwapLogo />;
    else if (current.indexOf("/pool") === 0 || current.indexOf("/pools") === 0)
      return <PoolLogo />;
    else if (
      current.indexOf("/bridge") === 0 ||
      current.indexOf("/history") === 0
    )
      return <ZilBridgeLogo />;
    else if (current.indexOf("/zilo") === 0) return <ZiloLogo />;
    else return <Brand />;
  }, [location.pathname]);

  const onClickLogo = () => {
    const path = location.pathname?.match(/^\/[^/]+/i)?.[0];
    switch (path) {
      case "/history":
        return history.push("/bridge");
      default:
        return typeof path === "string" && history.push(path);
    }
  };

  const tabConfig = currentPath ? DrawerConfig[currentPath] || [] : [];

  return (
    <AppBar
      {...rest}
      elevation={0}
      position="static"
      className={cls(classes.root, className)}
    >
      <Toolbar className={classes.toolBar} variant="dense">
        {isXs ? (
          <Fragment>
            <Box flex={1}>
              <div className={classes.drawerHeader}>
                <div className={classes.logoContainer}>
                  {/* <IconButton onClick={() => onToggleDrawer()}> */}
                  <Logo />
                  <span className={classes.logoLetter}>PFTswap</span>
                  {/* </IconButton> */}
                </div>
              </div>
            </Box>
            {/* <Box display="flex" justifyContent="center">
              <Button
                component={RouterLink}
                to="/"
                className={classes.brandButton}
                disableRipple
              >
                <Logo />
              </Button>
            </Box> */}
          </Fragment>
        ) : (
          <Grid container>
            <Link onClick={onClickLogo} className={classes.brandBox}>
              <div className={classes.logoContainer}>
                <Logo />
                <span className={classes.logoLetter}>PFTswap</span>
              </div>
            </Link>
            <Box className={classes.navLinkBox}>
              {tabConfig.map((tab, index) => (
                <Fragment key={index}>
                  {(!tab.connectedOnly ||
                    (tab.connectedOnly && walletState.wallet)) && (
                    <Button
                      component={RouterLink}
                      to={tab.navLink}
                      className={classes.navLinkButton}
                      disableRipple
                    >
                      <Typography
                        className={cls(classes.navLink, {
                          [classes.selectedMenu]:
                            tab.highlightPaths.indexOf(location.pathname) > -1,
                        })}
                      >
                        {tab.drawerText}
                      </Typography>
                    </Button>
                  )}
                </Fragment>
              ))}
            </Box>
          </Grid>
        )}
        <Box
          display="flex"
          justifyContent="flex-end"
          flex={1}
          alignItems="center"
        >
          {/* TODO temperory add drawer to only pool */}
          {currentPath === "pool" && isXs ? (
            <div className={classes.menuIcon}>
              <IconButton
                onClick={() => onToggleTabDrawer && onToggleTabDrawer()}
              >
                <MenuIcon />
              </IconButton>
            </div>
          ) : (
            <Fragment>
              <RewardsInfoButton />
              <Hidden xsDown>
                <ConnectWalletButton />
              </Hidden>
            </Fragment>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
