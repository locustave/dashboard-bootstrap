import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';

const { colors, spacing, radius, elevation, font, type, breakpoints } = tokens;

export const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: colors.action.primary,
      dark: colors.action.primaryHover,
      light: colors.action.primaryMuted,
    },
    secondary: {
      main: colors.action.secondary,
      dark: colors.action.secondaryHover,
    },
    error: {
      main: colors.status.error,
      light: colors.status.errorMuted,
    },
    warning: {
      main: colors.status.warning,
      light: colors.status.warningMuted,
    },
    success: {
      main: colors.status.success,
      light: colors.status.successMuted,
    },
    info: {
      main: colors.status.info,
      light: colors.status.infoMuted,
    },
    background: {
      default: colors.background.app,
      paper: colors.background.surface,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.neutral[400],
    },
    divider: colors.border.default,
    grey: {
      50: colors.neutral[50],
      100: colors.neutral[100],
      200: colors.neutral[200],
      300: colors.neutral[300],
      400: colors.neutral[400],
      500: colors.neutral[500],
      600: colors.neutral[600],
      700: colors.neutral[700],
      800: colors.neutral[800],
      900: colors.neutral[900],
    },
    action: {
      hover: colors.background.surfaceHover,
      selected: colors.background.surfaceActive,
      focus: colors.action.primaryMuted,
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
  },

  spacing: 4, // base-4 scale: theme.spacing(1) = 4px

  shape: {
    borderRadius: radius.md,
  },

  typography: {
    fontFamily: font.sans,
    fontSize: type.body.size,
    h1: {
      fontSize: type.pageTitle.size,
      fontWeight: type.pageTitle.weight,
      lineHeight: `${type.pageTitle.lineHeight}px`,
      letterSpacing: type.pageTitle.letterSpacing,
    },
    h2: {
      fontSize: type.sectionHeading.size,
      fontWeight: type.sectionHeading.weight,
      lineHeight: `${type.sectionHeading.lineHeight}px`,
      letterSpacing: type.sectionHeading.letterSpacing,
    },
    h3: {
      fontSize: type.cardTitle.size,
      fontWeight: type.cardTitle.weight,
      lineHeight: `${type.cardTitle.lineHeight}px`,
      letterSpacing: type.cardTitle.letterSpacing,
    },
    subtitle1: {
      fontSize: type.subtitle.size,
      fontWeight: type.subtitle.weight,
      lineHeight: `${type.subtitle.lineHeight}px`,
    },
    body1: {
      fontSize: type.body.size,
      fontWeight: type.body.weight,
      lineHeight: `${type.body.lineHeight}px`,
    },
    body2: {
      fontSize: type.bodySmall.size,
      fontWeight: type.bodySmall.weight,
      lineHeight: `${type.bodySmall.lineHeight}px`,
    },
    caption: {
      fontSize: type.caption.size,
      fontWeight: type.caption.weight,
      lineHeight: `${type.caption.lineHeight}px`,
    },
    overline: {
      fontSize: type.overline.size,
      fontWeight: type.overline.weight,
      lineHeight: `${type.overline.lineHeight}px`,
      letterSpacing: type.overline.letterSpacing,
      textTransform: 'uppercase' as const,
    },
    button: {
      fontSize: type.button.size,
      fontWeight: type.button.weight,
      lineHeight: `${type.button.lineHeight}px`,
      textTransform: 'none' as const,
    },
  },

  shadows: [
    'none',
    elevation.low,
    elevation.low,
    elevation.medium,
    elevation.medium,
    elevation.medium,
    elevation.medium,
    elevation.medium,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
    elevation.high,
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.app,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          textTransform: 'none' as const,
          fontWeight: type.button.weight,
          fontSize: type.button.size,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeMedium: {
          height: 36,
          padding: `0 ${spacing.base}px`,
        },
        sizeSmall: {
          height: 28,
          padding: `0 ${spacing.sm}px`,
          fontSize: type.buttonSmall.size,
        },
        sizeLarge: {
          height: 44,
          padding: `0 ${spacing.lg}px`,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          border: `1px solid ${colors.border.default}`,
          boxShadow: elevation.none,
          padding: spacing.xl,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border.strong,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border.focus,
            borderWidth: 2,
          },
        },
        input: {
          height: 36,
          padding: `0 ${spacing.sm}px`,
          boxSizing: 'border-box' as const,
        },
        notchedOutline: {
          borderColor: colors.border.default,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontSize: type.tableHeader.size,
            fontWeight: type.tableHeader.weight,
            letterSpacing: type.tableHeader.letterSpacing,
            textTransform: 'uppercase' as const,
            color: colors.text.secondary,
            height: 40,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 44,
          '&:hover': {
            backgroundColor: colors.background.surfaceHover,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: type.tableCell.size,
          lineHeight: `${type.tableCell.lineHeight}px`,
          padding: `0 ${spacing.base}px`,
          borderBottom: `1px solid ${colors.border.default}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: radius.lg,
          boxShadow: elevation.medium,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: elevation.medium,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: radius.md,
          boxShadow: elevation.low,
        },
      },
    },
  },
});
