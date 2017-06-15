import { MediaPlayerPage } from './app.po';

describe('media-player App', function() {
  let page: MediaPlayerPage;

  beforeEach(() => {
    page = new MediaPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
