import { ControlPage } from './app.po';

describe('Control App', () => {
    let page: ControlPage;

    beforeEach(() => {
        page = new ControlPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to Control!');
    });
});
