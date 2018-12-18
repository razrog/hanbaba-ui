/* eslint-disable */
import { createBrowserHistory } from 'history';

//TODO - Check UMC Implementation
let result = window.__UMCHistory || createBrowserHistory();
result = result.browser || result;

export default result;
