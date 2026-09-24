import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import { tokens } from '../tokens';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Page } from './Page';
import type { SidebarSection, SidebarLogoConfig } from './Sidebar';
import type { BreadcrumbItem } from './TopNav';

const { layout } = tokens;

export interface AppShellProps {
  sections: SidebarSection[];
  activeRoute?: string;
  onNavigate?: (route: string) => void;
  breadcrumbs?: BreadcrumbItem[];
  onBreadcrumbClick?: (href: string) => void;
  topNavActions?: React.ReactNode;
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  /** Logo configuration for the sidebar header. */
  logoConfig?: SidebarLogoConfig;
  /** Sections pinned to the bottom of the sidebar. */
  bottomSections?: SidebarSection[];
  children: React.ReactNode;
  pageVariant?: 'default' | 'full-bleed';
  defaultCollapsed?: boolean;
}

export function AppShell({
  sections,
  activeRoute,
  onNavigate,
  breadcrumbs,
  onBreadcrumbClick,
  topNavActions,
  sidebarHeader,
  sidebarFooter,
  logoConfig,
  bottomSections,
  children,
  pageVariant = 'default',
  defaultCollapsed = false,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const sidebarWidth = collapsed ? layout.sidebar.collapsedWidth : layout.sidebar.width;

  const handleCollapseToggle = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        sections={sections}
        activeRoute={activeRoute}
        collapsed={collapsed}
        onCollapseToggle={handleCollapseToggle}
        onNavigate={onNavigate}
        header={sidebarHeader}
        footer={sidebarFooter}
        logoConfig={logoConfig}
        bottomSections={bottomSections}
      />
      <Box
        sx={{
          marginLeft: `${sidebarWidth}px`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          transition: 'margin-left 200ms ease-out',
        }}
      >
        <TopNav
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={onBreadcrumbClick}
          actions={topNavActions}
        />
        <Page variant={pageVariant}>
          {children}
        </Page>
      </Box>
    </Box>
  );
}
