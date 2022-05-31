import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
// import {ThemeProvider} from 'my-ui-lib'
// import {TranslationProvider} from 'my-i18n-lib'
// import defaultStrings from 'i18n/en-x-default'
import { Provider } from 'react-redux';
import store from './store/store';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
