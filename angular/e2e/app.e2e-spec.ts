import { ControleDeCustosTemplatePage } from './app.po';

describe('ControleDeCustos App', function() {
  let page: ControleDeCustosTemplatePage;

  beforeEach(() => {
    page = new ControleDeCustosTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
