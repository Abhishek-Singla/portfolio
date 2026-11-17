# 5. Complaints and disputes

When a payment goes wrong, the customer needs one thing: a way to say so, and an answer. This chapter separates what the official sources say from what I have learned in practice.

## What the official sources say
- **NBBL runs a centralised, end-to-end complaint management framework**, aligned with the RBI's online dispute resolution guidelines of 6 August 2020 (RBI Directions 2024, para 8(i)).
- **Every COU and BOU must integrate with NBBL's central system** to raise and resolve disputes, using the **BBPS reference number** (para 8(ii)). A COU must also provide a system for customers to raise disputes (para 6(c)(3)).
- **Failed transactions follow the harmonised turnaround-time and compensation circular** of 20 September 2019, as updated (para 8(iii)). The specific timelines and compensation amounts are in that circular, which these notes do not reproduce.
- NBBL's site names its dispute portal **Canvas**, and customers can raise complaints through the customer complaint page on the site.

## The complaint message family (practitioner notes)
From my own post of 17 November 2026 on how the network is built: complaints travel as their own family of messages between operating units and the central unit.

| Message | What it does |
|---|---|
| 501 | Raise a complaint |
| 502 | Re-assign it to another unit |
| 503 | Re-open it |
| 506 | Check its status |
| 507 | Close it |
| 508 | Alert that its status has changed |

These are not official documentation. For message formats and rules, use the NBBL specifications.

## Design points that follow (practitioner notes)
- **Put the reference on the receipt.** The same number is used to raise and resolve disputes, so a customer who can quote it gets answered faster.
- **Design a pending state and a status check**, not a hard failure. A payment can time out after the customer has paid, and that is when complaints start.
- **Make the complaint status visible to the agent.** A status change alert is only useful if the person facing the customer can see it in plain words.
- **Count complaints per 1,000 transactions by biller.** It shows which biller is generating disputes, not just how many there are. The [payments dashboard demo](/dashboard) shows this on synthetic data.
