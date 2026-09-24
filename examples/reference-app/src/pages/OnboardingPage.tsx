import React, { useState } from 'react';
import { WizardTemplate } from '@dashboard-bootstrap/templates';
import Typography from '@mui/material/Typography';
import { wizardSteps } from '../fixtures/data';

const stepContent = [
  'Set up your account credentials and profile information.',
  'Create or join an organization and invite team members.',
  'Choose your notification preferences and default settings.',
  'Review your selections and complete the setup process.',
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);

  return (
    <WizardTemplate
      title="Get Started"
      steps={wizardSteps}
      currentStep={step}
      isLastStep={step === wizardSteps.length - 1}
      onBack={() => setStep((s) => Math.max(0, s - 1))}
      onNext={() => setStep((s) => Math.min(wizardSteps.length - 1, s + 1))}
      onComplete={() => alert('Setup complete!')}
    >
      <Typography variant="body1">{stepContent[step]}</Typography>
    </WizardTemplate>
  );
}
