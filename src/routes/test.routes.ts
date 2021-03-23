import { Application } from 'express';
import asyncMethod from '../shared/async-method';
import test from '../app/testMethod';
import creditSearch from '../app/creditSearchMethod';


export default (app: Application): void => {
  app.get('/test', asyncMethod(test));
  app.post('/credit-search', asyncMethod(creditSearch));
};
