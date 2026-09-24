import React from 'react';
import { BuilderTemplate } from '@dashboard-bootstrap/templates';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function WorkflowBuilderPage() {
  return (
    <BuilderTemplate
      title="Workflow Builder"
      toolbar={
        <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
          <Typography variant="body2" sx={{ px: 1, py: 0.5, bgcolor: 'action.hover', borderRadius: 1 }}>Trigger</Typography>
          <Typography variant="body2" sx={{ px: 1, py: 0.5, bgcolor: 'action.hover', borderRadius: 1 }}>Action</Typography>
          <Typography variant="body2" sx={{ px: 1, py: 0.5, bgcolor: 'action.hover', borderRadius: 1 }}>Condition</Typography>
        </Box>
      }
      canvas={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary' }}>
          <Typography>Drag components here to build your workflow</Typography>
        </Box>
      }
      propertiesPanel={
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Properties</Typography>
          <Typography variant="body2" color="text.secondary">Select a component to view its properties</Typography>
        </Box>
      }
    />
  );
}
