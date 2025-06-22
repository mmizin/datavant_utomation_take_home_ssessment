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
        await buyTicketsPage.assertBuyTicketsLinkVisible();
        await buyTicketsPage.assertSubmitButtonState(false);
    });

    ticketSearchData.forEach(({from, to, depIn, retIn}) => {
        test(`Submit the request for online tickets: ${from} → ${to}, dep+${depIn}, ret+${retIn}`, async () => {
            const depDate = formatDateFromNow(depIn);
            const retDate = formatDateFromNow(retIn);

            await buyTicketsPage.fillTravelForm(from, to, depDate, retDate);
            await buyTicketsPage.assertSubmitButtonState(true);
            await buyTicketsPage.submit();

            await onlineTicketOfficePage.assertOnlineTicketOfficeTextVisible();
            await onlineTicketOfficePage.assertCancelButtonIsVisible();
            await onlineTicketOfficePage.cancel();

            await buyTicketsPage.assertBuyTicketsLinkVisible();
            await buyTicketsPage.assertFromInputValue(from);
            await buyTicketsPage.assertDepartureDateValue(depDate);
            await buyTicketsPage.assertReturnDateValue(retDate);
        });
    });

    ticketSearchData.forEach(({from, to, depIn, retIn}) => {
        test(`Submit the request for online tickets using station dropdown and calendar popup: ${from} → ${to}, dep+${depIn}, ret+${retIn}`, async () => {
            const depDate = formatDateFromNow(depIn);
            const retDate = formatDateFromNow(retIn);

            await buyTicketsPage.fillTravelForm_using_station_dropDown_and_calendarPopUp(from, to, depDate, retDate)
            await buyTicketsPage.assertSubmitButtonState(true);
            await buyTicketsPage.submit();

            await onlineTicketOfficePage.assertOnlineTicketOfficeTextVisible();
            await onlineTicketOfficePage.assertCancelButtonIsVisible();
            await onlineTicketOfficePage.cancel();

            await buyTicketsPage.assertBuyTicketsLinkVisible();
            await buyTicketsPage.assertFromInputValue(from);
            await buyTicketsPage.assertDepartureDateValue(depDate);
            await buyTicketsPage.assertReturnDateValue(retDate);
        });
    });
});