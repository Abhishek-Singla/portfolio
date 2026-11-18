# User stories: bill fetch and pay (worked example)

> Illustrative example for the user-story template. The biller, amounts and reference numbers are made up and are not tied to any real biller or system.

Each story follows: **As a** (who), **I want** (what), **so that** (why). Acceptance criteria are written as Given, When, Then so they can be tested.

---

## US-1: See the fetched bill before paying
**As a** BC agent, **I want** to enter a customer's bill reference and see the fetched bill (name, amount due, due date, amount rule) **so that** I can confirm it is the right bill before taking money.

**Acceptance criteria**
1. Given a valid bill reference for Example Biller, when the fetch succeeds, then the agent sees the customer name, amount due, due date and any amount rule (exact, exact and above, or exact and below).
2. Given a reference in the wrong format, when the agent submits it, then the form shows a format hint for that biller and does not send the fetch.
3. Given the biller does not respond in time, when the fetch times out, then the agent sees "The biller's system did not respond in time. Wait 30 seconds and retry." and no payment can start.
4. Given a fetched bill carries an amount rule, when the agent enters an amount, then the amount is validated against the rule before the payment is sent.

**Edge cases**: bill already paid; zero amount due; reference with leading zeros; biller returns a malformed response.
**Out of scope**: partial or advance payment for billers that do not allow it.

---

## US-2: See a clear pending status
**As a** BC agent, **I want** a clear "pending" status when payment confirmation is delayed **so that** I do not retry and create a duplicate payment.

**Acceptance criteria**
1. Given the payment confirmation has not arrived, when the result screen loads, then it shows "Payment in progress, do not retry" with the transaction reference.
2. Given a payment is pending, when the agent tries to start another payment for the same bill, then the system blocks it and shows "A payment for this bill is already in progress. Wait for it to finish."
3. Given a payment is pending, when the agent taps "Check status", then the screen refreshes the status without creating a new payment.
4. Given a pending payment later succeeds or fails, when the agent reopens the transaction, then the final status and next action are shown in plain language.

**Edge cases**: app closed while pending; two agents on the same bill; status check itself times out.

---

## US-3: Quote a reference in a complaint
**As a** customer, **I want** a receipt that shows the transaction reference **so that** I can quote it if something goes wrong.

**Acceptance criteria**
1. Given a payment succeeds, when the receipt is shown, then it includes the reference, the amount, the date and time, and the biller name.
2. Given a payment fails or is pending, when the screen is shown, then the reference is still visible and can be copied.
3. Given the customer contacts support, when the agent searches by reference, then the same transaction is found.

---

## US-4: Look up a transaction by reference
**As a** support executive, **I want** to look up a transaction by its reference **so that** I can tell the customer the status and the next step.

**Acceptance criteria**
1. Given a valid reference, when the executive searches, then the status, amount, timestamps and the plain-language reason (if failed) are shown.
2. Given an unknown reference, when the executive searches, then the screen says no transaction was found and suggests checking for typing errors.
3. Given a transaction has an open complaint, when it is shown, then the complaint status is visible.

---

### Checklist before a story enters a sprint
- [ ] One user, one outcome, one reason
- [ ] Acceptance criteria are testable
- [ ] Edge cases listed, with the message shown for each
- [ ] Dependencies named
- [ ] Out of scope stated
