/// <reference path="../node_modules/angular2/platform/browser.d.ts" />
/// <reference path="../node_modules/angular2/core.d.ts" />

import { enableProdMode } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { App } from './components/app';

enableProdMode();

bootstrap(App, []).catch(err => console.error(err));
