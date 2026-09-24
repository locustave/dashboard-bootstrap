import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DashboardThemeProvider, AppShell } from '@dashboard-bootstrap/design-system';
import type { SidebarSection, SidebarLogoConfig } from '@dashboard-bootstrap/design-system';
import OverviewPage from './pages/OverviewPage';
import ProjectsPage from './pages/ProjectsPage';
import ModelsPage from './pages/ModelsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import FormLocationPage from './pages/FormLocationPage';
import FormPositionPage from './pages/FormPositionPage';
import FormDetailsPage from './pages/FormDetailsPage';
import FormCompletePage from './pages/FormCompletePage';

const logoConfig: SidebarLogoConfig = {
  companyName: 'My App',
};

const sections: SidebarSection[] = [
  {
    items: [
      { label: 'Overview', icon: 'home', route: '/' },
      { label: 'Projects', icon: 'folder', route: '/projects' },
      { label: 'Models', icon: 'box', route: '/models' },
      { label: 'Analytics', icon: 'bar-chart', route: '/analytics' },
    ],
  },
];

const bottomSections: SidebarSection[] = [
  {
    items: [
      { label: 'Settings', icon: 'settings', route: '/settings' },
    ],
  },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isFormRoute = location.pathname.startsWith('/form');

  return (
    <DashboardThemeProvider>
      {isFormRoute ? (
        <Routes>
          <Route path="/form/location" element={<FormLocationPage />} />
          <Route path="/form/position" element={<FormPositionPage />} />
          <Route path="/form/details" element={<FormDetailsPage />} />
          <Route path="/form/complete" element={<FormCompletePage />} />
        </Routes>
      ) : (
        <AppShell
          sections={sections}
          activeRoute={location.pathname}
          onNavigate={(route) => navigate(route)}
          logoConfig={logoConfig}
          bottomSections={bottomSections}
        >
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AppShell>
      )}
    </DashboardThemeProvider>
  );
}
