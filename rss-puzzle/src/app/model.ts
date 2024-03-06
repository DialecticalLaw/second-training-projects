import AppView from './view/app_view';

export default class Model {
  public static initiate(): void {
    AppView.drawBasicMarkup();
    AppView.displayComponent('loginPage');
  }
}
