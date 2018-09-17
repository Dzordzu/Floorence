# Tests

## About
This directory contains different types of tests.

### Unit tests
Before you create a new ValueObject, DomainEvent or any other small piece of code that is used to build the larger module, you *SHOULD* place tests in UnitTesting.

### Integration tests
If you are building a new Aggregate, or any other larger piece of code you *SHOULD ALWAYS* place tests in IntegrationTesting. *ALWAYS* do it before writing the actual code.

### System tests
Before writing any piece of code write proper tests. You *MUST ALWAYS* write and then place them in UnitTesting

### Manual tests
If you assume it as necessary to create manual tests place them in ManualTesting
