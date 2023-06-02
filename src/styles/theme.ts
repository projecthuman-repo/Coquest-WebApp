import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F3F3F3',
                    color: 'black'
                }
            },
            defaultProps: {
                position: 'static'
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 10
                }
            },
            defaultProps: {
                raised: true
            }
        },
        MuiCardHeader: {
            styleOverrides: {  
                subheader: {
                    color: 'black'
                }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    justifyContent: 'end'
                }
            }
        },MuiStepLabel: {
			styleOverrides: {
				active: {
					color: "#4285F4",
				},
				completed: {
					color: "white",
				},
			},
		},
		MuiStepIcon: {
			styleOverrides: {
				root: {
					color: "#666666",
                    "&.Mui-active": {
                        color: "#4285F4",
                    },
                    "&.Mui-completed": { 
                        color: "#4285F4",
                      },
				},
				active: {
				},
				completed: {
				},
			},
		},
    },
    typography: {
        fontFamily: 'Poppins'
    }

    });

export default theme;