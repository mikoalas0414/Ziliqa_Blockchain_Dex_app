import React, { useState } from "react";
import { ButtonGroupProps, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import cls from "classnames";
import { AppTheme } from "app/theme/types";

export interface ProportionSelectProps extends ButtonGroupProps {
  onSelectProp?: (proportion: number) => void;
};

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
  },
  percentageButton: {
    borderRadius: 5,
    padding: '3px 7px',
    color: theme.palette.type === "dark" ? "rgba(222, 255, 255, 0.5)" : "#003340",
    backgroundColor: theme.palette.background!.contrast,
    border: 0,
    margin: '4px 5px',
    [theme.breakpoints.down("sm")]: {
      padding: '6px 7px',
    },
  },
  max: {
    fontSize: 9,
  },
}));

const ProportionSelect: React.FC<ProportionSelectProps> = (props: ProportionSelectProps) => {
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  const { className, onSelectProp, ...rest } = props;
  const classes = useStyles();
  const onSelect = (proportion: number) => {
    if (typeof onSelectProp === "function")
      onSelectProp(proportion);
  };

  return (
    <ToggleButtonGroup exclusive {...rest} className={cls(classes.root, className)} value={currentSelection} onChange={(event, newSelection) => {setCurrentSelection(newSelection)}}>
      <ToggleButton value="0.25" onClick={() => onSelect(0.25)} className={classes.percentageButton}>
        <Typography className={classes.max}>25%</Typography>
      </ToggleButton>
      <ToggleButton value="0.5" onClick={() => onSelect(0.5)} className={classes.percentageButton}>
        <Typography className={classes.max}>50%</Typography>
      </ToggleButton>
      <ToggleButton value="0.75" onClick={() => onSelect(0.75)} className={classes.percentageButton}>
        <Typography className={classes.max}>75%</Typography>
      </ToggleButton>
      <ToggleButton value="1" onClick={() => onSelect(1)} className={classes.percentageButton}>
        <Typography className={classes.max}>MAX</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ProportionSelect;
