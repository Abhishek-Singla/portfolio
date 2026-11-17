# 7. Payment rails: NEFT, RTGS, IMPS and UPI

> A plain-language overview of how India's four main bank-transfer rails are built. It is not official documentation, and numeric limits are left out on purpose because they change. Check the current RBI and NPCI circulars before relying on any figure.

The differences between the rails explain why a payment feels instant, scheduled or final.

## At a glance

| Rail | Run by | How it settles | What it feels like | Best for |
|---|---|---|---|---|
| NEFT | RBI | Deferred net settlement in batches | Reaches the beneficiary after the next batch settles | Routine transfers where a short wait is fine |
| RTGS | RBI | Real-time gross settlement, one payment at a time | Final and irrevocable as soon as it settles | Large-value, time-critical transfers |
| IMPS | NPCI | Real-time interbank switch with net settlement afterwards | Instant, around the clock, including holidays | Instant account-to-account transfers |
| UPI | NPCI | Real-time switch with a payment address layer on top | Instant, using a virtual payment address or QR instead of account details | Everyday consumer and merchant payments |

## Under the hood

### NEFT
Banks send payment files. RBI settles the net positions between banks at the end of each batch.

### RTGS
Each payment settles individually, in real time, between banks' accounts at RBI. There is no netting.

### IMPS
The payment goes through NPCI's switch between banks in real time. The money between banks settles later on a net basis.

### UPI
Built on the same real-time switch idea as IMPS, with an addressing layer (virtual payment addresses, QR), request-to-pay flows and app-based authorisation.

## Which rail for which job?

| If you need | Pick |
|---|---|
| It to settle instantly, day or night, to another account | IMPS or UPI |
| To pay a shop or a person from your phone | UPI |
| A large payment where finality matters | RTGS |
| A routine transfer where a short delay is fine | NEFT |

## Where Bharat Connect fits
Bharat Connect sits above these rails. It does not carry the money: the payment mode (UPI, cards, net banking, IMPS, NEFT and others) records how the customer paid, and Bharat Connect answers which bill it was, who owes whom and whether the biller acknowledged it. You can [step through a Bharat Connect payment](/lab#lifecycle) in the product lab.
