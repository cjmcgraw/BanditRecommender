import React from 'react';
import { CurrentContentView } from './CurrentContentView';
import { generateMockRecommendations } from '../../mocks';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: "admin/CurrentContentView",
  component: CurrentContentView,
} as ComponentMeta<typeof CurrentContentView>

const Template: ComponentStory<typeof CurrentContentView> = (props) => (
  <CurrentContentView
    {...props}
  />
)

export const primary = Template.bind({});
primary.args = {
  content: generateMockRecommendations({
    recommender1: 10,
    recommender2: 10,
    recommender3: 10,
    recommender4: 10,
    recommender5: 10
  })
}
