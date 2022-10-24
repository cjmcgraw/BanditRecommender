import { RecommendedContent } from '../../types';
import { SendEvent } from './SendEvent';
import React from 'react';
import { Container } from '@mui/system';
import { Card, CardContent, List, ListItem } from '@mui/material';

export interface SendSingleEvent {
  record: RecommendedContent
}

export const SendSingleEvent: React.FC<SendSingleEvent> = ({record}) => {


  return (
    <Container>
      <Card>
        <CardContent>
          <List>
            <ListItem
              primary={}
            />
          </List>
        </CardContent>
      </Card>
      <SendEvent records={[record]} />
    </Container>
  )
}