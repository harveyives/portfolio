import React from 'react';
import AppProvider from 'store/provider';
import wrapPageElementWithTransition from 'helpers/wrapPageElement';

import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition;
