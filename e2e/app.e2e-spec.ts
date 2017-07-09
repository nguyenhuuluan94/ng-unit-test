import { NgUnitTestsPage } from './app.po';

describe('ng-unit-tests App', () => {
  let page: NgUnitTestsPage;

  beforeEach(() => {
    page = new NgUnitTestsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
