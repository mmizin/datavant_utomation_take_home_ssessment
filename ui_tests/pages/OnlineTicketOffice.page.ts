import {expect, Page} from '@playwright/test';
import {BasePage} from './Base.page';
import {OnlineTicketOfficeLocators as loc} from '../locators/OnlineTicketOffice.locators';

export class OnlineTicketOfficePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async assertOnlineTicketOfficeTextVisible() {
        await expect(this.page.getByRole('heading', {name: loc.onlineTicketOfficeText})).toBeVisible();
    }

    async assertCancelButtonIsVisible() {
        const cancelButton = this.page.locator(loc.cancelButton);
        await cancelButton.scrollIntoViewIfNeeded();
        await expect(cancelButton).toBeVisible();
    }

    async cancel() {
        const cancelButton = this.page.locator(loc.cancelButton);
        await cancelButton.scrollIntoViewIfNeeded()
        await this.page.click(loc.cancelButton);
    }

}
