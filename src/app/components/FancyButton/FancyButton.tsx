import React from "react";
import { Box, Button, ButtonProps, CircularProgress, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cls from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Network } from "peleswap-sdk/lib/constants";
import { actions } from "app/store";
import { RootState, WalletState } from "app/store/types";
import { useNetwork, useTaskSubscriber } from "app/utils";
import { LoadingKeys } from "app/utils/constants";

export interface FancyButtonProps extends ButtonProps {
  loading?: boolean;
  containerClass?: string;
  walletRequired?: boolean;
  loadingTxApprove?: boolean;
  showTxApprove?: boolean;
  onClickTxApprove?: () => any;
};

const useStyles = makeStyles(theme => ({
  progress: {
    color: "rgba(255,255,255,.8)",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  unlockButton: {
    flexGrow: 1,
    flexBasis: 150,
    marginRight: theme.spacing(1),
  },
  confirmButton: {
    flexGrow: 1,
    flexBasis: 150,
  },
  altnetRibbon: {
    width: "41px",
    height: "41px",
    overflow: "hidden",
    position: "absolute",
    top: "-1px",
    left: "-1px",
    // pointerEvents: "none",
    "&>span": {
      top: "10px",
      left: "-15px",
      width: "62px",
      display: "block",
      padding: "0 10px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      position: "relative",
      transform: "rotate(-45deg)",
      fontSize: "9px",
      textAlign: "center",
      boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
      ...theme.palette.type === "dark" && {
        color: "black",
        backgroundColor: "#fff",
      },
      ...theme.palette.type === "light" && {
        color: "white",
        backgroundColor: "#333",
      },
    },
  },
}));
const FancyButton: React.FC<FancyButtonProps> = (props: any) => {
  const { children, loading, className, containerClass, walletRequired, disabled, loadingTxApprove, showTxApprove, onClickTxApprove, onClick, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const network = useNetwork();
  const walletState = useSelector<RootState, WalletState>(state => state.wallet);
  const [loadingConnectWallet] = useTaskSubscriber(...LoadingKeys.connectWallet);

  const onButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (loading) return;

    if (walletRequired && !walletState.wallet)
      return dispatch(actions.Layout.toggleShowWallet("open"));


    return typeof onClick === "function" && onClick(e);
  };

  // override children content if wallet required
  // and not connected.
  const buttonContent = walletRequired ?
    (!walletState.wallet ? "Connect Wallet" : (showTxApprove ? `2. ${children}` : children)) :
    (children);

  let approveButtonDisabled = disabled
  let buttonDisabled = disabled

  // override button disabled if tx approve is required.
  if (showTxApprove) buttonDisabled = true

  // override buttons disabled state if wallet required
  // but not connected.
  if (walletRequired && !walletState.wallet) {
    buttonDisabled = approveButtonDisabled =  false
  }

  // override button loading state if wallet required
  // we are loading a wallet.
  const buttonLoading = (walletRequired && !walletState.wallet) ? loadingConnectWallet : loading;

  return (
    <Box display="flex" className={containerClass}>
      {(showTxApprove && walletState.wallet) && (
        <Tooltip title="Transaction needs to be approved before swapping or adding liquidity">
          <Button onClick={onClickTxApprove} disabled={approveButtonDisabled} className={cls(classes.unlockButton, className)} color="primary" variant="contained">
            {!loadingTxApprove && "1. Unlock"}
            {!!loadingTxApprove && (
              <CircularProgress size={24} className={classes.progress} />
            )}
          </Button>
        </Tooltip>
      )}
      <Button {...rest} disabled={buttonDisabled} className={cls(classes.confirmButton, className)} onClick={onButtonClick}>
        {network !== Network.MainNet && (
          <Tooltip placement="top-start" title={`You have selected ${network}. Switch to MainNet for actual trade.`}>
            <Box className={classes.altnetRibbon}>
              <Typography component="span">{network}</Typography>
            </Box>
          </Tooltip>
        )}
        {!buttonLoading && buttonContent}
        {!!buttonLoading && (
          <CircularProgress size={24} className={classes.progress} />
        )}
      </Button>
    </Box>
  );
};

export default FancyButton;
