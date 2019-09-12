import { browser, by, element } from 'protractor';

export class ControlPage {
    navigateTo(): any {
        return browser.get('/');
    }

    getParagraphText(): any {
        return element(by.css('app #main')).getText();
    }
}
