# UAT test cases: <release or feature>

> How to use: one row per check. Cover the happy path, every error message, permissions, and at least one "what if it fails halfway" case. Record evidence for every Fail.

| Field | Value |
|---|---|
| Release | <version> |
| Environment | <UAT / staging> |
| Tester | <name> |
| Date | <date> |

## Entry criteria
- [ ] Build deployed to UAT
- [ ] Test data prepared
- [ ] Test accounts available for each role

## Test cases
| ID | Area | Scenario | Preconditions | Steps | Expected result | Actual result | Status (Pass/Fail/Blocked) | Evidence |
|---|---|---|---|---|---|---|---|---|
| UAT-01 | <module> | <happy path> | <state> | 1. <step> 2. <step> | <result> | | | |
| UAT-02 | <module> | <invalid input> | <state> | <steps> | <error text> | | | |
| UAT-03 | <module> | <role without permission> | <state> | <steps> | <access denied> | | | |

## Defects
| ID | Linked test | Severity | Summary | Owner | Status |
|---|---|---|---|---|---|

## Exit criteria and sign-off
- [ ] All Must cases pass
- [ ] No open Critical or High defects
- [ ] Known issues accepted in writing

| Name | Role | Decision | Date |
|---|---|---|---|
