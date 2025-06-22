import {expect, Page} from '@playwright/test';
import {BasePage} from './Base.page';
import {BuyTicketsLocators, BuyTicketsLocators as loc} from '../locators/BuyTickets.locators';
import {BaseLocators} from "../locators/Base.locators";
import {CalendarModeEnum} from '../enums/CalendarMode.enum';


export class BuyTicketsPage extends BasePage {
    private maxMonthsToShow: number;

    constructor(page: Page) {
        super(page);
        this.maxMonthsToShow = 2;
    }

    async navigate() {
        await this.goto(this.routes.buyTickets);
    }

    async submit() {
        await this.page.click(loc.submitButton);
    }

    async closeCalendarPopupIfPresent(calendarMode: CalendarModeEnum) {
        const calendarWidget = calendarMode === CalendarModeEnum.Departure
            ? this.page.locator(BaseLocators.calendarPopup.departureCalendarWidget)
            : this.page.locator(BaseLocators.calendarPopup.returnCalendarWidget);
        await calendarWidget.waitFor({state: 'visible', timeout: 5000});

        if (await calendarWidget.isVisible()) {
            const closeButton = calendarWidget.locator(BaseLocators.calendarPopup.closeButton);

            await closeButton.waitFor({state: 'visible'});
            await closeButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(100);
            await closeButton.click({force: true});
        }
    }

    async selectDateFromCalendar(dateString: string, calendarMode: CalendarModeEnum) {
        const [dayStr, monthStrWithComma, yearStr] = dateString.split(' ');
        const targetDayNumber = dayStr;
        const targetMonth = monthStrWithComma.replace(',', '');
        const targetYear = parseInt(yearStr, 10);

        const calendarWidget = calendarMode === CalendarModeEnum.Departure
            ? this.page.locator(BaseLocators.calendarPopup.departureCalendarWidget)
            : this.page.locator(BaseLocators.calendarPopup.returnCalendarWidget);
        await calendarWidget.waitFor({state: 'visible', timeout: 5000});

        const currentMonthElement = calendarWidget.locator(BaseLocators.calendarPopup.monthDisplay);
        const currentYearElement = calendarWidget.locator(BaseLocators.calendarPopup.yearDisplay);
        const nextMonthButton = calendarWidget.locator(BaseLocators.calendarPopup.nextMonthButton);
        const dayDivs = calendarWidget.locator(BaseLocators.calendarPopup.dayDivs);

        const currentYear = parseInt(await currentYearElement.textContent(), 10);
        if (targetYear < currentYear) {
            await nextMonthButton.scrollIntoViewIfNeeded();
            await nextMonthButton.click();
            this.maxMonthsToShow -= 1;
        }

        while (this.maxMonthsToShow) {
            const currentMonth = (await currentMonthElement.textContent())?.trim();
            if (currentMonth !== targetMonth) {
                await nextMonthButton.click();
                this.maxMonthsToShow -= 1;
            } else {
                break;
            }
        }

        if ((await currentMonthElement.textContent())?.trim() !== targetMonth) {
            throw new Error(`Target month ${targetMonth} not found in calendar`);
        }

        const targetDay = dayDivs.filter({hasText: targetDayNumber}).first();
        await targetDay.scrollIntoViewIfNeeded();
        await targetDay.click();
    }


    async fillTravelForm(from: string, to: string, depDate: string, retDate: string) {
        await this.page.fill(loc.fromInput, from);
        await this.page.fill(loc.toInput, to);
        await this.page.fill(BaseLocators.calendarPopup.departureDate, depDate);
        await this.page.fill(BaseLocators.calendarPopup.returnDate, retDate);
        await this.closeCalendarPopupIfPresent(CalendarModeEnum.Return);
    }

    async selectFromDropDown(fill_locator: string, option_locator: string, text: string, lettersCount: number) {
        await this.page.fill(fill_locator, text.slice(0, lettersCount));
        await this.page.press(fill_locator, 'Backspace');
        await this.page.waitForTimeout(300);
        const options = await this.page.locator(BuyTicketsLocators.fromToDropDown).allTextContents();
        expect(options).toContain(text);
        const option = this.page.locator(option_locator, {hasText: text}).first();
        await option.scrollIntoViewIfNeeded();
        await option.click({force: true});
    }

    async fillTravelForm_using_station_dropDown_and_calendarPopUp(from: string, to: string, depDate: string, retDate: string) {
        await this.selectFromDropDown(loc.fromInput, BuyTicketsLocators.fromToDropDown, from, 3);
        await this.selectFromDropDown(loc.toInput, BuyTicketsLocators.fromToDropDown, to, 5);
        await this.page.click(BaseLocators.calendarPopup.departureDate);
        await this.selectDateFromCalendar(depDate, CalendarModeEnum.Departure);
        await this.page.click(BaseLocators.calendarPopup.returnDate);
        await this.selectDateFromCalendar(retDate, CalendarModeEnum.Return);
    }

    async checkOnlineTicketsTextIsPresent() {
        await expect(this.page.getByRole('heading', {name: loc.onlineTicketsText})).toBeVisible();
    }

    async checkSubmitButtonState(enabled: boolean) {
        const button = this.page.locator(loc.submitButton);
        await expect(button)[enabled ? 'toBeEnabled' : 'toBeDisabled']();
    }

    async assertFromInputValue(expected: string) {
        await expect(this.page.locator(loc.fromInput)).toHaveValue(expected);
    }

    async assertToInputValue(expected: string) {
        await expect(this.page.locator(loc.toInput)).toHaveValue(expected);
    }

    async assertDepartureDateValue(expected: string) {
        await expect(this.page.locator(BaseLocators.calendarPopup.departureDate)).toHaveValue(expected);
    }

    async assertReturnDateValue(expected: string) {
        await expect(this.page.locator(BaseLocators.calendarPopup.returnDate)).toHaveValue(expected);
    }
}