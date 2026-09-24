import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { tokens } from '../tokens';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Icon } from './Icon';

const { colors, spacing, layout, radius, type: typeTokens } = tokens;

export interface SidebarNavigationItem {
  label: string;
  icon: React.ReactNode;
  route: string;
  children?: SidebarNavigationItem[];
}

export interface SidebarSection {
  label?: string;
  items: SidebarNavigationItem[];
}

export interface SidebarLogoConfig {
  /** URL or path to the full logo image shown when sidebar is expanded. */
  logo?: string;
  /** URL or path to the collapsed logo image shown when sidebar is collapsed. */
  collapsedLogo?: string;
  /** Company name used for alt text and as fallback avatar when no collapsedLogo is provided. */
  companyName?: string;
}

export interface SidebarProps {
  sections: SidebarSection[];
  activeRoute?: string;
  collapsed?: boolean;
  onCollapseToggle?: () => void;
  onNavigate?: (route: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  /** Logo configuration for the sidebar header. */
  logoConfig?: SidebarLogoConfig;
  /** Sections pinned to the bottom of the sidebar, above the footer. */
  bottomSections?: SidebarSection[];
}

export function Sidebar({
  sections,
  activeRoute,
  collapsed = false,
  onCollapseToggle,
  onNavigate,
  header,
  footer,
  logoConfig,
  bottomSections,
}: SidebarProps) {
  const width = collapsed ? layout.sidebar.collapsedWidth : layout.sidebar.width;

  return (
    <Box
      component="nav"
      aria-label="Sidebar navigation"
      sx={{
        width,
        minWidth: width,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.background.surface,
        borderRight: `1px solid ${colors.border.default}`,
        transition: 'width 200ms ease-out, min-width 200ms ease-out',
        overflow: 'hidden',
        zIndex: 1200,
      }}
    >
      {/* Header / Logo area */}
      <Box
        sx={{
          height: layout.header.height,
          display: 'flex',
          alignItems: 'center',
          px: `${spacing.sm}px`,
          flexShrink: 0,
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: `1px solid ${colors.border.default}`,
        }}
      >
        {collapsed ? (
          logoConfig?.collapsedLogo ? (
            <Box
              component="img"
              src={logoConfig.collapsedLogo}
              alt={logoConfig.companyName ?? 'Logo'}
              sx={{ width: 32, height: 32, objectFit: 'contain' }}
            />
          ) : (
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: colors.action.primary,
                color: colors.text.inverse,
                fontSize: tokens.type.body.size,
                fontWeight: 600,
              }}
            >
              {(logoConfig?.companyName ?? '?')[0].toUpperCase()}
            </Avatar>
          )
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            {logoConfig?.logo ? (
              <Box
                component="img"
                src={logoConfig.logo}
                alt={logoConfig.companyName ?? 'Logo'}
                sx={{ height: 32, maxWidth: '100%', objectFit: 'contain' }}
              />
            ) : header ? (
              header
            ) : (
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: tokens.type.sectionHeading.size,
                  color: colors.text.primary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  ml: `${spacing.xs}px`,
                }}
              >
                {logoConfig?.companyName ?? ''}
              </Typography>
            )}
          </Box>
        )}
        {onCollapseToggle && !collapsed && (
          <IconButton
            onClick={onCollapseToggle}
            size="small"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={tokens.icon.md} />
          </IconButton>
        )}
      </Box>
      {onCollapseToggle && collapsed && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: `${spacing.xs}px`, flexShrink: 0 }}>
          <IconButton
            onClick={onCollapseToggle}
            size="small"
            aria-label="Expand sidebar"
            sx={{
              width: 28,
              height: 28,
              bgcolor: colors.background.surfaceHover,
              '&:hover': { bgcolor: colors.border.default },
            }}
          >
            <ChevronRight size={14} />
          </IconButton>
        </Box>
      )}

      {/* Navigation sections */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: `${spacing.sm}px`, pt: '100px', pb: `${spacing.md}px` }}>
        {sections.map((section, sIdx) => (
          <Box key={sIdx} sx={{ mt: sIdx === 0 ? `${spacing.md}px` : `${spacing.xl}px` }}>
            {section.label && !collapsed && (
              <Typography
                sx={{
                  fontSize: typeTokens.overline.size,
                  fontWeight: typeTokens.overline.weight,
                  lineHeight: `${typeTokens.overline.lineHeight}px`,
                  letterSpacing: typeTokens.overline.letterSpacing,
                  textTransform: 'uppercase',
                  color: colors.text.muted,
                  px: `${spacing.sm}px`,
                  mb: `${spacing.sm}px`,
                }}
              >
                {section.label}
              </Typography>
            )}
            {section.items.map((item) => (
              <NavItem
                key={item.route}
                item={item}
                activeRoute={activeRoute}
                collapsed={collapsed}
                onNavigate={onNavigate}
                depth={0}
              />
            ))}
          </Box>
        ))}
      </Box>

      {/* Bottom-pinned sections */}
      {bottomSections && bottomSections.length > 0 && (
        <Box
          sx={{
            borderTop: `1px solid ${colors.border.default}`,
            px: `${spacing.sm}px`,
            py: `${spacing.md}px`,
            flexShrink: 0,
          }}
        >
          {bottomSections.map((section, sIdx) => (
            <Box key={sIdx} sx={{ mt: sIdx === 0 ? 0 : `${spacing.xl}px` }}>
              {section.label && !collapsed && (
                <Typography
                  sx={{
                    fontSize: typeTokens.overline.size,
                    fontWeight: typeTokens.overline.weight,
                    lineHeight: `${typeTokens.overline.lineHeight}px`,
                    letterSpacing: typeTokens.overline.letterSpacing,
                    textTransform: 'uppercase',
                    color: colors.text.muted,
                    px: `${spacing.sm}px`,
                    mb: `${spacing.sm}px`,
                  }}
                >
                  {section.label}
                </Typography>
              )}
              {section.items.map((item) => (
                <NavItem
                  key={item.route}
                  item={item}
                  activeRoute={activeRoute}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                  depth={0}
                />
              ))}
            </Box>
          ))}
        </Box>
      )}

      {/* Footer */}
      {footer && (
        <Box
          sx={{
            borderTop: `1px solid ${colors.border.default}`,
            p: `${spacing.sm}px`,
            flexShrink: 0,
          }}
        >
          {footer}
        </Box>
      )}
    </Box>
  );
}

interface NavItemProps {
  item: SidebarNavigationItem;
  activeRoute?: string;
  collapsed: boolean;
  onNavigate?: (route: string) => void;
  depth: number;
}

function NavItem({ item, activeRoute, collapsed, onNavigate, depth }: NavItemProps) {
  const [expanded, setExpanded] = useState(false);
  const isActive = activeRoute === item.route;
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded((prev) => !prev);
    }
    onNavigate?.(item.route);
  };

  const content = (
    <Box
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      sx={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
        px: `${spacing.sm}px`,
        pl: collapsed ? `${spacing.sm}px` : `${spacing.sm + depth * spacing.xl}px`,
        borderRadius: `${radius.md}px`,
        cursor: 'pointer',
        color: isActive ? colors.text.primary : colors.text.secondary,
        fontWeight: isActive ? 500 : tokens.type.body.weight,
        fontSize: tokens.type.body.size,
        bgcolor: isActive ? colors.background.surfaceActive : 'transparent',
        '&:hover': {
          bgcolor: colors.background.surfaceHover,
        },
        gap: `${spacing.sm}px`,
        justifyContent: collapsed ? 'center' : 'flex-start',
        userSelect: 'none',
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: isActive ? colors.text.primary : colors.text.secondary,
        }}
      >
        {typeof item.icon === 'string' ? <Icon name={item.icon} size="md" /> : item.icon}
      </Box>
      {!collapsed && (
        <>
          <Box component="span" sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.label}
          </Box>
          {hasChildren && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: colors.text.muted }}>
              {expanded ? <ChevronUp size={tokens.icon.sm} /> : <ChevronDown size={tokens.icon.sm} />}
            </Box>
          )}
        </>
      )}
    </Box>
  );

  return (
    <>
      {collapsed ? (
        <Tooltip title={item.label} placement="right">
          {content}
        </Tooltip>
      ) : (
        content
      )}
      {hasChildren && expanded && !collapsed && (
        <Box>
          {item.children!.map((child) => (
            <NavItem
              key={child.route}
              item={child}
              activeRoute={activeRoute}
              collapsed={collapsed}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </Box>
      )}
    </>
  );
}
