import {expect, Page} from '@playwright/test';
import {BasePage} from './Base.page';
import {BuyTicketsLocators as loc} from '../locators/BuyTickets.locators';
import {BaseLocators} from "../locators/Base.locators";

export class BuyTicketsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate() {
        await this.goto(this.routes.buyTickets);
    }

    async submit() {
        await this.page.click(loc.submitButton);
    }

    async closeCalendarPopupIfPresent() {
        const calendarPopup = this.page.locator(BaseLocators.calendarPopup.datePickerWidget).first();

        if (await calendarPopup.count() > 0) {
            const closeButton = calendarPopup.locator(BaseLocators.calendarPopup.closeButton);

            await closeButton.waitFor({state: 'visible'});
            await closeButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(100);
            await closeButton.click({force: true});
            await calendarPopup.waitFor({state: 'detached', timeout: 5000});
        }
    }

    async fillTravelForm(from: string, to: string, depDate: string, retDate: string) {
        await this.page.fill(loc.fromInput, from);
        await this.page.fill(loc.toInput, to);
        await this.page.fill(loc.departureDate, depDate);
        await this.page.fill(loc.returnDate, retDate);
        await this.closeCalendarPopupIfPresent()
    }

    async checkOnlineTicketsTextIsPresent() {
        await expect(this.page.getByRole('heading', {name: loc.onlineTicketsText})).toBeVisible();
    }

    async checkSubmitButtonState(enabled: boolean) {
        const button = this.page.locator(loc.submitButton);
        await expect(button)[enabled ? 'toBeEnabled' : 'toBeDisabled']();
    }

    async assertSearchParamsSaved(from: string, to: string, depDate: string, retDate: string) {
        await expect(this.page.locator(loc.fromInput)).toHaveValue(from);
        await expect(this.page.locator(loc.toInput)).toHaveValue(to);
        await expect(this.page.locator(loc.departureDate)).toHaveValue(depDate);
        await expect(this.page.locator(loc.returnDate)).toHaveValue(retDate);
    }
}