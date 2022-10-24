import { FormControl, InputLabel, Select, MenuItem, Button, Container } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import { RecommendedContent } from '../../types';
import { buildConsoleLogFn } from '../../utils';

const log = buildConsoleLogFn("SendEvent");

export interface SendEventProps {
  records: RecommendedContent[]
}

export const SendEvent: React.FC<SendEventProps> = ({records}) => {
  const [eventName, setEventName] = React.useState('');

  function sendEvent(content: RecommendedContent) {
    const sendEventFn = content[eventName as (keyof typeof content)];
    if (typeof sendEventFn === 'function') {
      sendEventFn();
    } else {
      log(`failed to find function associated with name ${eventName}`)
    }
  }

  return (
    <Container>
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
            disabled={records.length <= 0}
            label="event"
            onChange={(v) => setEventName(v.target.value.toString())}
          >
            <MenuItem value={'onImpression'}>impression</MenuItem>
            <MenuItem value={'onViewed'}>click</MenuItem>
            <MenuItem value={'onCTA'}>call-to-action</MenuItem>
          </Select>
          <Button
            variant='contained'
            startIcon={<SendIcon />}
            disabled={!eventName}
            onClick={() => {
              for(const record of records) {
                sendEvent(record)
              }
            }}
          >
            send event{(records.length > 1) ? 's' : ''}
          </Button>
        </FormControl>
      </div>
    </Container>
  )
}
