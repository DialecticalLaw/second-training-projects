import { Controller } from './app/controller/controller';
import './global.css';

export const SWITCH_VIEW_ANIMATION_DURATION: number = 480;

const controller: Controller = new Controller();

controller.init();
