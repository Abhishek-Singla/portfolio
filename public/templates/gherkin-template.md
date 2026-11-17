# Gherkin spec template

> How to use: copy the block below into a `.feature` file in your own project. It is kept as Markdown here so the file stays easy to read. Write one feature per user capability, keep scenarios independent, and use a Scenario Outline whenever only the data changes.

Conventions:
- Title-case section comments, one rule per scenario.
- Quote exact user-visible text; mark any text you are proposing (not confirmed) as `PROPOSED`.
- Tag scenarios so teams can filter: `@smoke`, `@negative`, `@security`, `@regression`.
- Separate frontend (what the user sees) and backend (what the API and data do) into two files.

```gherkin
@<module>
Feature: <capability in plain words>
  As a <role>
  I want to <action>
  So that <benefit>

  Background:
    Given I am signed in as a "<role>"
    And the test data "<dataset>" exists

  @smoke
  Scenario: <happy path>
    Given <starting state>
    When <action>
    Then <visible or stored result>

  @negative
  Scenario: <failure path>
    Given <starting state>
    When <action that fails>
    Then I see the message "<exact error text>"
    And nothing is saved

  @security
  Scenario: <role without permission>
    Given I am signed in as a "<other role>"
    When I try to <action>
    Then access is denied

  @regression
  Scenario Outline: <same behaviour, different data>
    Given a record with status "<from_status>"
    When I change it to "<to_status>"
    Then the record shows "<result>"

    Examples:
      | from_status | to_status | result   |
      | <a>         | <b>       | <c>      |
      | <d>         | <e>       | <f>      |
```

## Backend checklist
- API path, method, request fields and response codes
- Which table and column change, and the values stored
- Audit fields written (who, when, reason)
- Behaviour when the database call fails or times out
