# 6. Failure patterns at the BOU layer

> Source: my LinkedIn article "Bharat Connect Is Evolving Fast. Here's What Every BOU Product Team Needs to Know Right Now", 27 April 2026. This chapter is practitioner analysis, not official documentation. The impact figures are my estimates, not measurements.

A Biller Operating Unit (BOU) does not build the consumer experience, which belongs to the COU. But it owns the reliability, accuracy and speed of everything that experience depends on. If the bill fetch fails, the consumer sees a failure. If payment confirmation is delayed, the consumer calls support. If a biller's account number format changes and the BOU has not caught it, payments bounce.

## The five patterns

### 1. Bill fetch timeouts: the silent conversion killer
Most billers expose their systems through SOAP or REST APIs with SLAs, typically 5 to 7 seconds for a bill fetch. In practice, many state-owned utility billers regularly breach this. The BOU's integration layer has to decide: wait longer, time out and show an error, or serve a cached bill. The product failure is treating all billers identically when their API reliability profiles are fundamentally different.

### 2. Biller account number format drift
Billers periodically change their consumer account number formats after system migrations or zone reorganisations. BOUs often learn about it informally, after transaction failures start spiking. There is typically no biller-side API or webhook to announce the change. The product gap is the absence of a structured change-management workflow: monitor validation failures, detect format anomalies early, and fast-track rule updates before customers notice.

### 3. Duplicate payment anxiety
When a payment enters a pending state, the customer or agent often retries. If the original later succeeds, a duplicate payment has been made. Most BOUs handle this reactively. The opportunity is proactive duplicate detection with intelligent retry logic at the transaction layer.

### 4. Agent-level usability debt compounds into support volume
BOUs often serve BC agents and customer service points as their main customer interface. When the agent-facing app is designed by engineers for engineers, the result is error messages like TXN_FAIL_BILLER_TIMEOUT instead of "The biller's system is slow, please retry in 30 seconds." Small choices at this layer turn directly into ticket volume.

### 5. Reconciliation is a product problem, not just an ops problem
End-of-day reconciliation between BOU transaction logs and biller settlement files is manual or semi-automated at most BOUs, so the product team never designs to prevent breaks in the first place. The root causes (duplicate transaction IDs, inconsistent timestamp formats, biller-side settlement delays) are all solvable at the product layer.

## Three interventions that need no biller-side change

| Intervention | What it is | My estimate |
|---|---|---|
| Biller reliability tiering | Profile every biller's API response times over a rolling 30 days, classify billers into High, Medium and Low tiers, and apply tier-specific timeouts and fallbacks, for example a cached bill for Low-reliability billers after 4 seconds, with a clear agent disclosure | 30 to 40% fewer fetch-related failures |
| Format anomaly detection | Track validation failure rates per biller daily. When a rate rises above a threshold, such as 3 times its 7-day baseline, alert the integration team, and give them a rule interface for quick format updates | 50 to 70% fewer format-drift failures |
| Human-readable error classification | Map every internal error code to a plain-language message with an action, and keep it as a maintained dictionary reviewed quarterly against top support ticket categories | 20 to 35% fewer agent-related tickets |

## What a first-principles BOU strategy asks
Start from one question: what would a biller and an agent each consider a perfect transaction?

- **For the biller:** accurate consumer identification, real-time payment confirmation, zero reconciliation exceptions and a clear audit trail.
- **For the agent:** a bill fetch response in under 3 seconds, a receipt they can show the customer immediately, and an error message they can actually explain.

You can try the tiering idea on synthetic data in the [dashboard demo](/dashboard), and the error-dictionary idea in the [error-code translator](/lab#errors).
