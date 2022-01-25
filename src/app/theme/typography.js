const typography = (palette) => ({
  fontFamily: [
    "ConthraxSb-Regular"
  ].join(","),
  h1: {
    fontSize: "26px",
    lineHeight: "26px",
    fontWeight: "600",
    letterSpacing: "-0.2px",
  },
  h2: {
    fontFamily: "conthrax",
    fontWeight: "bold",
    fontSize: 26,
  },
  h3: {
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: "bold",
    letterSpacing: "-0.2px",
  },
  h4: {
    fontFamily: "ConthraxSb-Regular",
    fontSize: "16px",
    lightHeight: "18px",
    fontWeight: 500
  },
  h5: {
  },
  h6: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "14px"
  },
  subtitle1: {
    fontSize: "14px",
    lineHeight: "16px",
    fontWeight: "500",
  },
  subtitle2: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: 500,
    letterSpacing: 0.05,
  },
  body1: {
    fontFamily: "ConthraxSb-Regular",
    fontSize: "11px",
    lineHeight: "14px",
    fontWeight: 600,
    letterSpacing: 0,
  },
  body2: {
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "-0.2px",
    fontWeight: 500
  },
  button: {
    fontFamily: "ConthraxSb-Regular",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "18px",
    textTransform: "none",
  },
  caption: {
  },
});

export default typography;
