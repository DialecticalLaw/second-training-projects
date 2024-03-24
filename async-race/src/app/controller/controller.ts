import { PageInfo } from '../../interfaces';
import { Model } from '../model/model';
import { AppView } from '../view/app_view';

export class Controller {
  private model: Model;

  private appView: AppView;

  constructor() {
    this.model = new Model();
    this.appView = new AppView();
  }

  public async init(): Promise<void> {
    const pageInfo: PageInfo | undefined = await this.model.getCarsOnPage(1);
    if (!pageInfo) throw new Error('cars is undefined at init');
    this.appView.start(pageInfo);
  }
}
