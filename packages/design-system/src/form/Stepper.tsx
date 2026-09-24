import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Check } from 'lucide-react';
import { formTokens } from './tokens';
import { useThemeColors } from './ThemeContext';

const { colors, typography, stepper, spacing } = formTokens;

export type StepStatus = 'pending' | 'active' | 'completed';

export interface StepDefinition {
  id: string;
  label: string;
}

export interface StepperProps {
  currentStep: number;
  steps: StepDefinition[];
}

function StepMarker({ status, index }: { status: StepStatus; index: number }) {
  const tc = useThemeColors();
  const size = stepper.markerSize;

  const bg =
    status === 'active' ? tc.primary :
    status === 'completed' ? tc.complete :
    '#E0E0E5';

  const textColor =
    status === 'active' ? '#FFFFFF' :
    status === 'completed' ? tc.completeText :
    colors.textMuted;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {status === 'completed' ? (
        <Check size={12} color={textColor} strokeWidth={3} />
      ) : (
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            color: textColor,
            lineHeight: 1,
          }}
        >
          {index + 1}
        </Typography>
      )}
    </Box>
  );
}

function StepConnector() {
  return (
    <Box
      sx={{
        width: stepper.connectorWidth,
        height: stepper.connectorHeight,
        backgroundColor: colors.border,
        flexShrink: 0,
        mx: `${spacing.sm}px`,
      }}
    />
  );
}

export function Step({
  definition,
  index,
  status,
}: {
  definition: StepDefinition;
  index: number;
  status: StepStatus;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: `${spacing.sm}px` }}>
      <StepMarker status={status} index={index} />
      <Typography
        sx={{
          fontSize: typography.stepLabel.size,
          fontWeight: status === 'active' ? 600 : typography.stepLabel.weight,
          lineHeight: typography.stepLabel.lineHeight,
          color: status === 'pending' ? colors.textMuted : colors.textPrimary,
          whiteSpace: 'nowrap',
          fontFamily: typography.fontFamily,
        }}
      >
        {definition.label}
      </Typography>
    </Box>
  );
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <Box
      role="navigation"
      aria-label="Form progress"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: `${spacing.xl}px`,
        mb: `${spacing.xl}px`,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      {steps.map((step, i) => {
        const status: StepStatus =
          i < currentStep ? 'completed' :
          i === currentStep ? 'active' :
          'pending';

        return (
          <React.Fragment key={step.id}>
            {i > 0 && <StepConnector />}
            <Step definition={step} index={i} status={status} />
          </React.Fragment>
        );
      })}
    </Box>
  );
}
