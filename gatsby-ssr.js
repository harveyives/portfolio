import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import AppProvider from 'store/provider';
import wrapPageElementWithTransition from 'helpers/wrapPageElement';

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  //  TODO remove?
  // React Context in SSR/build
  const ConnectedBody = () => <AppProvider>{bodyComponent}</AppProvider>;
  replaceBodyHTMLString(renderToString(<ConnectedBody />));

  // Add styled-components in SSR/build
  const sheet = new ServerStyleSheet();
  const bodyHTML = renderToString(sheet.collectStyles(<ConnectedBody />));
  const styleElement = sheet.getStyleElement();
  setHeadComponents(styleElement);
};

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition;

import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider