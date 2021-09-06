import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/reducers';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
    // Instantiating store in `wrapRootElement` handler ensures:
    //  - there is fresh store for each SSR page
    //  - it will be called only once in browser, when React mounts
    // todo move this ?
    const store = configureStore({
        reducer: rootReducer,
    });

    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./src/reducers', () => {
            const newRootReducer = require('./src/reducers').default;
            store.replaceReducer(newRootReducer);
        });
    }

    return <Provider store={store}>{element}</Provider>;
};
