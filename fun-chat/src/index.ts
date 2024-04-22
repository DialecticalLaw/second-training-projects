import { Controller } from './app/controller/controller';
import './global.css';

export const scrollState: { isScrollByUser: boolean } = { isScrollByUser: true };

const controller: Controller = new Controller();

controller.init();
