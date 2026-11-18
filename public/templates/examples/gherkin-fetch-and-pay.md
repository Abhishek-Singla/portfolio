# Gherkin spec: fetch and pay a bill (worked example)

> Illustrative example for the Gherkin template. The biller, amounts and references are made up. Both frontend and backend teams can build and test against the same scenarios.

```gherkin
Feature: Fetch and pay a bill
  As a BC agent
  I want to fetch a customer's bill and pay it
  So that the customer's bill is paid correctly and I can show proof

  Background:
    Given the agent is signed in
    And "Example Biller" is active and supports bill fetch

  Scenario: Successful fetch and payment
    Given a customer gives a valid bill reference
    When the agent fetches the bill
    Then the bill shows the customer name, the amount due and the due date
    When the agent pays the amount due
    And the biller confirms the payment
    Then the receipt shows the transaction reference and the status "Successful"

  Scenario: Bill reference in the wrong format
    When the agent enters a reference that does not match the biller's format
    Then the form shows the biller's format hint
    And no fetch request is sent

  Scenario: Biller does not respond to the fetch
    Given the biller is slow
    When the agent fetches the bill
    And no response arrives within the timeout
    Then the agent sees "The biller's system did not respond in time. Wait 30 seconds and retry."
    And no payment can be started for this bill

  Scenario Outline: Amount rule on the fetched bill
    Given the fetched bill is for <due> rupees with the rule "<rule>"
    When the agent enters <entered> rupees
    Then the payment is <result>

    Examples:
      | rule              | due | entered | result    |
      | Exact             | 500 | 500     | allowed   |
      | Exact             | 500 | 450     | rejected  |
      | Exact and above   | 500 | 600     | allowed   |
      | Exact and above   | 500 | 450     | rejected  |
      | Exact and below   | 500 | 400     | allowed   |
      | Exact and below   | 500 | 600     | rejected  |

  Scenario: Payment confirmation is delayed
    Given the agent has submitted a payment
    When the biller's confirmation has not arrived
    Then the result shows "Payment in progress, do not retry" with the reference
    And starting another payment for the same bill is blocked with "A payment for this bill is already in progress"

  Scenario: Pending payment later succeeds
    Given a payment is pending
    When the biller confirms it
    Then the transaction status becomes "Successful"
    And the agent can see the receipt

  Scenario: Retry with the same reference is not a second payment
    Given a payment with reference "EX-1001" was accepted
    When the same request is submitted again with reference "EX-1001"
    Then it is treated as a duplicate of "EX-1001"
    And the customer is not charged a second time
```

## Notes for the team
- **Messages** in quotes are the exact strings to show. Keep them in one dictionary so wording changes in one place.
- **Timeout** values come from the biller's reliability tier, not one global number.
- **Last scenario** assumes the platform recognises a repeated reference. Confirm how your own platform treats repeats before you rely on it.
