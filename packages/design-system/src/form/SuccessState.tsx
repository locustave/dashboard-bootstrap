import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formTokens } from './tokens';
import { useThemeColors } from './ThemeContext';

const { colors, typography, spacing } = formTokens;

function SuccessIcon() {
  const tc = useThemeColors();
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hand/wave gesture matching reference */}
      {/* Yellow accent dots */}
      <circle cx="24" cy="18" r="3" fill={tc.complete} />
      <circle cx="18" cy="28" r="2" fill={tc.complete} />
      <circle cx="60" cy="16" r="4" fill={tc.complete} />
      <circle cx="64" cy="26" r="2.5" fill={tc.complete} />
      {/* Hand body */}
      <path
        d="M30 58C28 54 26 48 26 44V30C26 28 27.5 26.5 29.5 26.5C31.5 26.5 33 28 33 30V38"
        stroke={tc.primary}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 38V26C33 24 34.5 22.5 36.5 22.5C38.5 22.5 40 24 40 26V36"
        stroke={tc.primary}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 34V24C40 22 41.5 20.5 43.5 20.5C45.5 20.5 47 22 47 24V36"
        stroke={tc.primary}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47 36V28C47 26 48.5 24.5 50.5 24.5C52.5 24.5 54 26 54 28V46C54 54 48 62 40 62C34 62 30 58 30 58"
        stroke={tc.primary}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface SuccessStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function SuccessState({ title, description, icon }: SuccessStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        py: `${spacing.section}px`,
        gap: `${spacing.lg}px`,
      }}
    >
      {icon || <SuccessIcon />}
      <Typography
        sx={{
          fontSize: typography.pageTitle.size,
          fontWeight: typography.pageTitle.weight,
          lineHeight: typography.pageTitle.lineHeight,
          color: colors.textPrimary,
          fontFamily: typography.fontFamily,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            fontSize: typography.inputText.size,
            fontWeight: typography.inputText.weight,
            lineHeight: typography.inputText.lineHeight,
            color: colors.textMuted,
            fontFamily: typography.fontFamily,
            maxWidth: 400,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
