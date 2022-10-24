import React from 'react';
import { SendEvent, SendEventProps } from './SendEvent';
import { generateMockContentList, generateMockContent } from '../../mocks';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';

export default {
  title: "admin/SendEvent",
  component: SendEvent,
  argTypes: {
    content: {
      id: { control: "text" }
    }
  }
} as ComponentMeta<typeof SendEvent>

const SendEventTemplate: ComponentStory<typeof SendEvent> = (props: SendEventProps) => (
  <SendEvent
    {...props}
  />
)

const contentActions = actions({
  onImpression: 'onImpression',
  onViewed: 'onViewed',
  onCTA: 'onCTA',
});

export const singleRecord: ComponentStory<typeof SendEvent> = SendEventTemplate.bind({});
singleRecord.args = {
  records: [{
    ...generateMockContent(),
    ...contentActions
  }]
}

export const multipleRecords: ComponentStory<typeof SendEvent> = SendEventTemplate.bind({});
multipleRecords.args = {
  records: generateMockContentList(10)
    .map(record => ({...record, ...contentActions}))
}

