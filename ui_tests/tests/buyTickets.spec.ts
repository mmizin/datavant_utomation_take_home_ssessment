import {test} from '@playwright/test';
import {BuyTicketsPage} from '../pages/BuyTickets.page';
import {OnlineTicketOfficePage} from '../pages/OnlineTicketOffice.page';
import {formatDateFromNow} from "../utils/dateUtils";
import { ticketSearchData } from '../config/buyTicketsPageTestData/testData';

test.describe('Buy Tickets Page Tests', () => {
    let buyTicketsPage: BuyTicketsPage;
    let onlineTicketOfficePage: OnlineTicketOfficePage;

    test.beforeEach(async ({page}) => {
        buyTicketsPage = new BuyTicketsPage(page);
        onlineTicketOfficePage = new OnlineTicketOfficePage(page);
        await buyTicketsPage.navigate();
        await buyTicketsPage.checkOnlineTicketsTextIsPresent();
        await buyTicketsPage.checkSubmitButtonState(false);
    });

    ticketSearchData.forEach(({from, to, depIn, retIn}) => {
        test(`Submit the request for online tickets: ${from} → ${to}, dep+${depIn}, ret+${retIn}`, async () => {
            const depDate = formatDateFromNow(depIn);
            const retDate = formatDateFromNow(retIn);

            await buyTicketsPage.fillTravelForm(from, to, depDate, retDate);
            await buyTicketsPage.checkSubmitButtonState(true);
            await buyTicketsPage.submit();

            await onlineTicketOfficePage.checkOnlineTicketOfficeTextIsPresent();
            await onlineTicketOfficePage.checkCancelButtonIsVisible();
            await onlineTicketOfficePage.cancel();

            await buyTicketsPage.checkOnlineTicketsTextIsPresent();
            await buyTicketsPage.assertSearchParamsSaved(from, to, depDate, retDate);
        });
    });
});