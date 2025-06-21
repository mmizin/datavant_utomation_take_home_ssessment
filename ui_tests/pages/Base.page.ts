import {Page} from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {
    }

    readonly routes = {
        buyTickets: "/passageiros/en/buy-tickets",
        homepage: '/',
    }

    async goto(path: string) {
        await this.page.goto(path);
    }
}