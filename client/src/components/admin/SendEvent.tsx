import { List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, Button, Container } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import { Content } from '../../types';
import { buildConsoleLogFn } from '../../utils';

const log = buildConsoleLogFn("SendEvent");

export interface SendEventProps {
  content: Content
}

export default function SendEventComponents(props: SendEventProps) {
  const currentContent = props.content;
  const [eventName, setEventName] = React.useState('');
  const namesToFunctions: Record<string, undefined | (() => void)> = {
    impression: currentContent?.onImpression,
    view: currentContent?.onViewed,
    cta: currentContent?.onCTA
  }

  function sendEventByName() {
    log(`sending event=${eventName} content=${currentContent.id}`);
    const fn = namesToFunctions[eventName];
    if (fn) {
      fn();
    }
    setEventName('');
  }

  return (
   <div>
      <Container>
        <div>
          <h2>content</h2>
          <List>
            <ListItem>
              <ListItemText
                primary="source"
                secondary={currentContent.source}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="id" 
                secondary={currentContent.id}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="creatorId"
                secondary={currentContent.creatorId}
              />
            </ListItem>
          </List>
        </div>
        <div>
          <FormControl 
            size='medium'
            margin='dense'
            required
            fullWidth
          >
            <InputLabel id="send-event-input-label">event</InputLabel>
            <Select
              labelId="send-event-select-label"
              id="send-event-select"
              value={eventName}
              label="event"
              onChange={(v) => setEventName(v.target.value.toString())}
            >
              <MenuItem value={'impression'}>impression</MenuItem>
              <MenuItem value={'view'}>click</MenuItem>
              <MenuItem value={'cta'}>call-to-action</MenuItem>
            </Select>
            <Button
              variant='contained'
              startIcon={<SendIcon />}
              disabled={!eventName}
              onClick={sendEventByName}
            >
              send event
            </Button>
          </FormControl>
        </div>
      </Container>
   </div>
  )
}
