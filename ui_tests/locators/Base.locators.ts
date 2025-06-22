export const BaseLocators = {
    navigationMenu: {
        buyTicketsTab: 'a:has(img[alt="Buy Tickets"])'
    },

    calendarPopup: {
        departureDate: '#datepicker-first',
        returnDate: '#datepicker-second',
        calendarWidget: '#datepicker-root .picker__frame',
        departureCalendarWidget: '#datepicker-first_root .picker__frame',
        returnCalendarWidget: '#datepicker-second_root .picker__frame',
        closeButton: '.picker__button--close:not([disabled])',
        calendarTable: 'table#datepicker-first_table',
        dayDivs: 'tbody tr td div.picker__day:not(.picker__day--disabled)',
        monthDisplay: '.picker__month',
        yearDisplay: '.picker__year',
        prevMonthButton: '.picker__nav--prev:not(.picker__nav--disabled)',
        nextMonthButton: '.picker__nav--next',
        todayButton: '.picker__button--today',
        clearButton: '.picker__button--clear',
    }
};
