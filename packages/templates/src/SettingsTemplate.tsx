import React from 'react';
import { PageHeader, EmptyState } from '@dashboard-bootstrap/design-system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface SettingsSection {
  id: string;
  label: string;
}

export interface SettingsTemplateProps {
  title?: string;
  sections?: SettingsSection[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function SettingsTemplate({
  title = 'Settings',
  sections = [],
  activeSection,
  onSectionChange,
  children,
  footer,
}: SettingsTemplateProps) {
  if (sections.length === 0) {
    return (
      <>
        <PageHeader title={title} />
        <EmptyState
          title={`This is the ${title} page`}
          description="Add sections to configure your settings."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader title={title} />
      <Box sx={{ display: 'flex', gap: '32px' }}>
        {/* Settings nav */}
        <Box
          component="nav"
          aria-label="Settings sections"
          sx={{ width: 200, flexShrink: 0 }}
        >
          {sections.map((section) => (
            <Box
              key={section.id}
              role="button"
              tabIndex={0}
              onClick={() => onSectionChange?.(section.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSectionChange?.(section.id);
                }
              }}
              sx={{
                px: '12px',
                py: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: activeSection === section.id ? 500 : 400,
                color: activeSection === section.id ? 'text.primary' : 'text.secondary',
                bgcolor: activeSection === section.id ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              {section.label}
            </Box>
          ))}
        </Box>

        {/* Content area */}
        <Box sx={{ flex: 1 }}>
          {children}
          {footer && (
            <Box sx={{ mt: '24px', pt: '16px', borderTop: '1px solid', borderColor: 'divider' }}>
              {footer}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
