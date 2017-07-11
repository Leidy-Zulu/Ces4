import { RestaurateUiPage } from './app.po';

describe('restaurate-ui App', () => {
  let page: RestaurateUiPage;

  beforeEach(() => {
    page = new RestaurateUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
