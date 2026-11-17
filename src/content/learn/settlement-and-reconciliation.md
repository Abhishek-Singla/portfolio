# 4. Settlement and reconciliation

## What the official sources say
- **NBBL undertakes clearing and settlement** and provides **guaranteed settlement** of all transactions routed through it (RBI Directions 2024, para 5(a), 6(a)(3)).
- **Non-bank operating units settle through a sponsor bank** (para 4(h)) and must hold an **escrow account** with a scheduled commercial bank used only for BBPS (para 7(i)).
- **Permitted escrow movements** (para 7(iii), 7(iv)):
  - COU: customer collections, settlement debits, failed or disputed credits and debits, recovery of charges and commissions.
  - BOU: debits for amounts due to billers, settlement credits, failed or disputed credits and debits, recovery of charges.
- **The BOU settles to the biller.** NBBL's site says the BOU "carries out settlement of funds on behalf of billers", and billers should reconcile the funds the BOU remits.
- **Settlement frequency.** NBBL's biller pages say up to 8 settlement cycles per day in most places (one modal says 4), and that actual timing depends on the operating unit and varies by category. Treat the number as unconfirmed and check with the operating unit.

## Not found in the official sources I could read
- Settlement timelines and any T+ rule for crediting billers.
- ON-US versus OFF-US treatment. The 2014 BBPS guidelines discussed this split; the 2024 Directions I read do not use those terms.
- Names and formats of settlement and reconciliation files.

## Disputes and complaints (official)
- NBBL runs a **centralised end-to-end complaint management framework**, aligned with the RBI's online dispute resolution guidelines of 6 August 2020 (para 8(i)).
- Every COU and BOU must integrate with NBBL's central system to raise and resolve disputes, using the **BBPS reference number** (para 8(ii)).
- **Failed transactions** must follow the timelines in the RBI circular of 20 September 2019 on harmonisation of turnaround time and customer compensation, as updated (para 8(iii)). The specific timelines and compensation amounts are in that circular, which I did not read.
- NBBL's site names its dispute portal **Canvas**; customers can raise complaints through the customer complaint page on the site.

## Reconciliation as a practice (illustrative, not an official procedure)
Reconciliation means comparing each party's records of the same transactions. A simple way to think about it:

| Record | Typically held by |
|---|---|
| Customer-side transactions and debits | COU |
| Network transactions and settlement | Central unit |
| Biller-side collections and remittances | BOU and biller |

A transaction is matched when reference, amount and status agree. Common breaks are a success at one end and a failure at another (for example after a timeout), amount differences from fees or rounding, items missing from a file because of cut-off differences, and duplicates from retries. A PM can track a daily match rate, the age of unmatched items and alerts for files that fail to arrive.
