import Model from '../model/model';
import AppView from '../view/app_view';

export default class Controller {
  private model: Model;

  private appView: AppView;

  constructor() {
    this.model = new Model();
    this.appView = new AppView();
  }

  public start(): void {
    this.appView.draw();
  }
}
