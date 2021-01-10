import React from 'react';
import {renderToString} from 'react-dom/server';
import AppProvider from 'store/provider';
import wrapPageElementWithTransition from 'helpers/wrapPageElement';
import wrapWithProvider from "./wrap-with-provider"

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  //  TODO remove?
  // React Context in SSR/build
  const ConnectedBody = () => <AppProvider>{bodyComponent}</AppProvider>;
  replaceBodyHTMLString(renderToString(<ConnectedBody />));
};

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition;

export const wrapRootElement = wrapWithProvider
