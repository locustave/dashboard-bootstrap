import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formTokens } from './tokens';
import { useThemeColors } from './ThemeContext';

const { colors, typography, radius, card, spacing } = formTokens;

export interface SelectableCardProps {
  title: string;
  description?: string;
  metadata?: string;
  selected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
}

function RadioIndicator({ selected }: { selected?: boolean }) {
  const tc = useThemeColors();
  return (
    <Box
      sx={{
        width: card.radioSize,
        height: card.radioSize,
        borderRadius: '50%',
        border: `2px solid ${selected ? tc.primary : colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {selected && (
        <Box
          sx={{
            width: card.radioSize - 8,
            height: card.radioSize - 8,
            borderRadius: '50%',
            backgroundColor: tc.primary,
          }}
        />
      )}
    </Box>
  );
}

export function MetadataBadge({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        px: '8px',
        py: '4px',
        backgroundColor: '#F5F5F7',
        borderRadius: `${radius.small}px`,
        fontSize: typography.smallMeta.size,
        fontWeight: typography.smallMeta.weight,
        color: colors.textSecondary,
        fontFamily: typography.fontFamily,
      }}
    >
      {icon || (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '1px',
            backgroundColor: colors.textMuted,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </Box>
  );
}

export function SelectableCard({
  title,
  description,
  metadata,
  selected,
  onSelect,
  disabled,
}: SelectableCardProps) {
  const tc = useThemeColors();
  return (
    <Box
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onSelect}
      onKeyDown={disabled ? undefined : (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.();
        }
      }}
      sx={{
        backgroundColor: colors.surface,
        border: `${selected ? 2 : 1}px solid ${selected ? tc.primary : colors.border}`,
        borderRadius: `${radius.medium}px`,
        minHeight: card.minHeight,
        padding: `${card.padding}px`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: `${spacing.md}px`,
        '&:hover:not([aria-disabled="true"])': {
          borderColor: selected ? tc.primary : colors.borderStrong,
        },
        '&:focus-visible': {
          boxShadow: `0 0 0 2px ${tc.primarySoft}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography
          sx={{
            fontSize: typography.cardTitle.size,
            fontWeight: typography.cardTitle.weight,
            lineHeight: typography.cardTitle.lineHeight,
            color: colors.textPrimary,
            fontFamily: typography.fontFamily,
          }}
        >
          {title}
        </Typography>
        <RadioIndicator selected={selected} />
      </Box>
      {description && (
        <Typography
          sx={{
            fontSize: typography.description.size,
            fontWeight: typography.description.weight,
            lineHeight: typography.description.lineHeight,
            color: colors.textSecondary,
            fontFamily: typography.fontFamily,
          }}
        >
          {description}
        </Typography>
      )}
      {metadata && (
        <Box sx={{ mt: 'auto', pt: `${spacing.xs}px` }}>
          <MetadataBadge>{metadata}</MetadataBadge>
        </Box>
      )}
    </Box>
  );
}

export interface SelectableCardGridProps {
  columns?: number;
  children: React.ReactNode;
}

export function SelectableCardGrid({ columns = 2, children }: SelectableCardGridProps) {
  return (
    <Box
      role="radiogroup"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: `repeat(${columns}, 1fr)`,
        },
        gap: `${spacing.lg}px`,
      }}
    >
      {children}
    </Box>
  );
}
