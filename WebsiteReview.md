# Website QA Review

## 1. Functional & UX Observations

### ✅ Overall
The train search functionality is solid, but there are several visual and interaction design issues that need attention.

### Observed Issues & Suggestions

#### 1. Submit Button Visibility Issues
- **Issue**: Green submit button blends into other green UI elements when disabled (poor contrast). Location at bottom right isn't standard for forms.
- **Suggestion**:
  - Change disabled state to light gray with darker text
  - Move to traditional form submission position (centered below form)
  - Increase size and padding for better visibility
  - Consider more distinctive active color (blue or orange)

#### 2. Price/Discount Button Group
- **Issue**: The "Prices" and "Discount" button group below warnings looks disconnected and visually awkward.
- **Suggestion**:
  - Reorganize as horizontal tabs if space allows
  - Add visual connection to the pricing section
  - Consider dropdown menu if space is limited
  - Ensure consistent styling with other interactive elements

#### 3. Information Link Styling
- **Issue**: "Relevant information" links are gray instead of standard blue, reducing discoverability. The separator line after "Online ticket office terms and conditions" creates visual discontinuity.
- **Suggestion**:
  - Style links in standard blue (#0066cc Royal Navy Blue) with underline on hover
  - Remove unnecessary separator line
  - Group related information links visually
  - Ensure consistent spacing between information items

#### 4. Warning Field Placement
- **Issue**: Warning messages appear in an unexpected location between form sections.
- **Suggestion**:
  - Move warnings closer to relevant form fields
  - Use consistent alert styling (color, icon)
  - Ensure warnings remain visible during interaction

#### 5. Unclear Purpose of the "Cancel" Button
- **Issue**: The label "Cancel" might mislead users to think it cancels the booking.
- **Suggestion**: Change to "Back to Search" or use a back arrow icon to clarify intent.

#### 6. Lack of Visual Loading Indicator
- **Issue**: After clicking "Submit," users receive no feedback that the search is processing.
- **Suggestion**: Add a loading spinner or disable the button with a status message (e.g., "Searching...").

#### 7. No Feedback for No Results
- **Issue**: If a search yields no results, there's no user-facing message.
- **Suggestion**: Display a clear, friendly message (e.g., "No trains available for this route and date.").

#### 8. Language Inconsistencies
- **Issue**: Some tooltips or system messages (e.g., calendar, dropdowns) appear in Portuguese.
- **Suggestion**: Ensure full English localization when language is set.

#### 9. Tight Mobile Layout
- **Issue**: On smaller screens, form elements are cramped.
- **Suggestion**: Increase padding and enlarge interactive elements for better tap targets.

---

## 2. Front-End Test Automation & HTML Review

### HTML Observations Impacting Automation

#### A. Inconsistent or Misleading ID and Name Attributes
- **arrival-date**: Used as an ID for the "To" (arrival station) input. Misleading since it suggests a date picker.
- **datepicker-first / datepicker-second**: Used for date inputs; more semantic names would be `departure-date` and `return-date`.
- **inlineCheckbox1 / inlineCheckbox2**: IDs for train type checkboxes; should reflect actual values like `train-type-alfa`, `train-type-intercidades`.
- **option1 / option2**: IDs for class selection; better to use `ticket-class-comfort`, `ticket-class-tourist`.

#### B. Mixed Language Attributes
- Attributes like `name="nr_passageiros"` (Portuguese for number of passengers) mixed with English placeholders.
- Suggestion: Standardize form attributes to English for consistency in automation.

#### C. Duplicate Attributes
- Elements often use both `title` and `data-original-title`, which can cause confusion in automated tests.
- Suggestion: Simplify by using one semantic attribute for tooltips.

#### D. Hidden Input Fields
- Fields like `stationPartidaID` and `stationChegadaID` exist for backend processing.
- These should be documented in test plans if used.

---

## 3. Visual Design Recommendations

### Color Scheme Improvements
1. **Primary Action Buttons**: Use distinctive color (blue/orange) for primary actions
2. **Disabled States**: Ensure sufficient contrast (minimum 4.5:1 ratio)
3. **Information Links**: Standard blue with proper hover states
4. **Warning Messages**: Consistent yellow/red alert styling with icons

### Layout Improvements
1. **Form Flow**: Logical grouping with clear visual hierarchy
2. **Button Placement**: Primary action centered, secondary actions to side
3. **Spacing**: Consistent padding/margins between sections
4. **Mobile**: Responsive breakpoints for smaller screens

---

## 4. Recommendations for Test Automation Readiness

### Naming Consistency

| Element               | Current ID          | Suggested ID           |
|-----------------------|---------------------|------------------------|
| Arrival Station Input | `arrival-date`      | `arrival-station`      |
| Departure Date Input  | `datepicker-first`  | `departure-date`       |
| Return Date Input     | `datepicker-second` | `return-date`          |
| Train Type Checkbox   | `inlineCheckbox1`   | `train-type-alfa`      |
| Class Radio Option 1  | `option1`           | `ticket-class-comfort` |
| Class Radio Option 2  | `option2`           | `ticket-class-tourist` |

### General Improvements
- Add `data-testid` attributes to critical elements
- Clean up duplicated attributes
- Standardize naming across languages
- Ensure full localization for all visible text and error states

---

## Summary
The UI ticket purchase form requires several visual and interaction design improvements to enhance usability. Key issues include poor button visibility, inconsistent link styling, awkward information architecture, and insufficient feedback states. Addressing these along with the HTML consistency issues will significantly improve both user experience and testability.
