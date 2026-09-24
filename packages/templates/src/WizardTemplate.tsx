import React from 'react';
import { PageHeader, EmptyState } from '@dashboard-bootstrap/design-system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface WizardStep {
  label: string;
}

export interface WizardTemplateProps {
  title: string;
  steps?: WizardStep[];
  currentStep?: number;
  onBack?: () => void;
  onNext?: () => void;
  onComplete?: () => void;
  children?: React.ReactNode;
  isLastStep?: boolean;
}

export function WizardTemplate({
  title,
  steps = [],
  currentStep = 0,
  onBack,
  onNext,
  onComplete,
  children,
  isLastStep = false,
}: WizardTemplateProps) {
  if (steps.length === 0) {
    return (
      <>
        <PageHeader title={title} />
        <EmptyState
          title={`This is the ${title} page`}
          description="Define steps to build your wizard flow."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader title={title} />

      {/* Step indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '24px' }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Box sx={{ flex: 1, height: 2, bgcolor: i <= currentStep ? 'primary.main' : 'divider' }} />}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  bgcolor: i <= currentStep ? 'primary.main' : 'grey.200',
                  color: i <= currentStep ? 'primary.contrastText' : 'text.secondary',
                }}
              >
                {i + 1}
              </Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: i === currentStep ? 500 : 400,
                  color: i === currentStep ? 'text.primary' : 'text.secondary',
                }}
              >
                {step.label}
              </Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>

      {/* Step content */}
      <Box sx={{ mb: '32px' }}>{children}</Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: '16px', borderTop: '1px solid', borderColor: 'divider' }}>
        <Button variant="outlined" onClick={onBack} disabled={currentStep === 0}>
          Back
        </Button>
        {isLastStep ? (
          <Button variant="contained" onClick={onComplete}>
            Complete
          </Button>
        ) : (
          <Button variant="contained" onClick={onNext}>
            Next
          </Button>
        )}
      </Box>
    </>
  );
}
