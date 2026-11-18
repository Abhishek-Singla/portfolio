# UAT test cases: fetch and pay (worked example)

> Illustrative example for the UAT template. The biller, amounts and references are made up. Fill in the last two columns during testing.

**Scope**: fetch and pay a bill for "Example Biller" through the agent app.
**Environment**: UAT, with a test biller profile and test accounts.
**Sign-off**: product owner and business user.

| ID | Scenario | Steps | Expected result | Result (Pass / Fail) | Notes |
|---|---|---|---|---|---|
| UAT-01 | Fetch a valid bill | 1. Enter a valid test reference. 2. Tap Fetch. | Customer name, amount due and due date are shown. The amount rule is shown if the biller has one. | | |
| UAT-02 | Reference in the wrong format | 1. Enter a reference with the wrong length. 2. Tap Fetch. | A format hint is shown. No fetch request is sent. | | |
| UAT-03 | Fetch times out | 1. Use the slow test reference. 2. Tap Fetch. | After the timeout, the message "The biller's system did not respond in time. Wait 30 seconds and retry." is shown. Payment cannot start. | | |
| UAT-04 | Pay the exact amount | 1. Fetch a bill with rule Exact. 2. Enter the exact amount. 3. Confirm. | Payment is accepted and the receipt shows the reference and the status Successful. | | |
| UAT-05 | Wrong amount under the Exact rule | 1. Fetch a bill with rule Exact. 2. Enter a different amount. | The amount is rejected before the payment is sent, with a message that names the rule. | | |
| UAT-06 | Payment stays pending | 1. Use the delayed-confirmation test reference. 2. Confirm payment. | The result shows "Payment in progress, do not retry" with the reference. | | |
| UAT-07 | Second payment blocked while pending | 1. With UAT-06 still pending, start another payment for the same bill. | The second payment is blocked with "A payment for this bill is already in progress." | | |
| UAT-08 | Pending becomes successful | 1. Release the confirmation in the test biller. 2. Tap Check status. | Status changes to Successful. The receipt is available. No new payment is created. | | |
| UAT-09 | Receipt shows the reference | 1. Open the receipt of a successful payment. | Reference, amount, date, time and biller name are shown, and the reference can be copied. | | |
| UAT-10 | Look up by reference | 1. In the support view, search by the reference from UAT-09. | The same transaction is found with its status. | | |

## Test data needed
- A test biller profile with fetch enabled and an amount rule of each type.
- Test references: valid, wrong format, slow, delayed confirmation.
- A way to release a delayed confirmation on demand.

## Exit criteria
- All Must cases pass (UAT-01, 03, 04, 05, 06, 07, 08).
- No open defect above Medium severity.
- Product owner and business user sign off.

## Defect log
| Defect ID | Test case | Severity | Summary | Status |
|---|---|---|---|---|
| | | | | |
