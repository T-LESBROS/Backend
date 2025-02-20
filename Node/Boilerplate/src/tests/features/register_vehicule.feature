Feature: Register a vehicle

    In order to follow many vehicles with my application
    As an application user
    I should be able to register my vehicle

    @critical
    Scenario: I can register a vehicle
        Given my fleet1
        And a vehicle1
        When I register this vehicle1 into my fleet1
        Then this vehicle1 should be part of my vehicle fleet1

    Scenario: I can't register same vehicle twice
        Given my fleet2
        And a vehicle2
        And I have registered this vehicle2 into my fleet2
        When I try to register this vehicle2 into my fleet2
        Then I should be informed this this vehicle2 has already been registered into my fleet2

    Scenario: Same vehicle can belong to more than one fleet
        Given my fleet3
        And the fleet4 of another user
        And a vehicle3
        And this vehicle3 has been registered into the other user's fleet4
        When I register this vehicle3 into my fleet3
        Then this vehicle3 should be part of my vehicle fleet3