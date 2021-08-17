/**
 *
 * Stories for StyledCard
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import StyledCard from '../index';

storiesOf('StyledCard').add('simple', () => <StyledCard id={text('id', 'StyledCard')} />);
