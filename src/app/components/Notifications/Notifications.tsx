import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cls from "classnames";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { AppTheme } from "app/theme/types";
import { PoolFormState, RootState, SwapFormState } from "app/store/types";
import UserPoolMessage from "../UserPoolMessage";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
  },
  notificationMessage: {
    fontWeight: 400,
    margin: theme.spacing(0, 1),
    color: theme.palette.colors.zilliqa.neutral[theme.palette.type === "light" ? "200" : "100"],
  },
  link: {
    marginLeft: 2,
    cursor: "pointer",
    color: theme.palette.primary.dark,
  },
}));



const Notifications: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props: any) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const isSwap = useRouteMatch({ path: "/swap" })
  const isPool = useRouteMatch({ path: "/pool" })

  const poolState = useSelector<RootState, PoolFormState>(state => state.pool);
  const swapState = useSelector<RootState, SwapFormState>(state => state.swap);

  const poolToken = poolState.token;
  const { inToken, outToken } = swapState;

  let userToken = null;
  if (isPool && poolToken && !poolToken.whitelisted)
    userToken = poolToken;
  else if (isSwap && inToken && !inToken.isZil && !inToken.whitelisted)
    userToken = inToken;
  else if (isSwap && outToken && !outToken.isZil && !outToken.whitelisted)
    userToken = outToken;

  if (!userToken) return null;

  return (
    <Box {...rest} className={cls(classes.root, className)}>
      {isPool ?
        <UserPoolMessage token={userToken}>
          Liquidity pools created by other users are not screened or audited by PeleSwap.
          All tokens (including PELE) deposited may be lost if the ZRC-2 token contract
          is malicious or otherwise exploited.
          Please conduct your own due diligence before contributing liquidity.
          </UserPoolMessage>
        :
        <UserPoolMessage token={userToken}>
          ZRC-2 tokens issued by other users are not screened or audited by PeleSwap.
          There is no guarantee that your purchased tokens will maintain its current swap value.
          Please conduct your own due diligence before swapping.
        </UserPoolMessage>
      }
    </Box>
  );
};

export default Notifications;
