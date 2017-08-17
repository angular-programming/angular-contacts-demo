import { Angular2ContactsDemoPage } from './app.po';

describe('angular2-contacts-demo App', () => {
  let page: Angular2ContactsDemoPage;

  beforeEach(() => {
    page = new Angular2ContactsDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
