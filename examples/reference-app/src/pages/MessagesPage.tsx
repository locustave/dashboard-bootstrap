import React, { useState } from 'react';
import { SplitViewTemplate } from '@dashboard-bootstrap/templates';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { messages } from '../fixtures/data';
import type { Message } from '../fixtures/data';

export default function MessagesPage() {
  const [selected, setSelected] = useState<Message | null>(null);

  return (
    <SplitViewTemplate
      title="Messages"
      description="Team communication"
      hasSelection={selected !== null}
      listPanel={
        <Box>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              onClick={() => setSelected(msg)}
              sx={{
                p: 2,
                cursor: 'pointer',
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: selected?.id === msg.id ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Typography variant="subtitle2">{msg.from}</Typography>
              <Typography variant="body2" fontWeight={600}>{msg.subject}</Typography>
              <Typography variant="body2" color="text.secondary" noWrap>{msg.preview}</Typography>
              <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
            </Box>
          ))}
        </Box>
      }
      detailPanel={
        selected ? (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{selected.subject}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>From: {selected.from} — {selected.time}</Typography>
            <Typography variant="body1">{selected.preview}</Typography>
          </Box>
        ) : null
      }
    />
  );
}
