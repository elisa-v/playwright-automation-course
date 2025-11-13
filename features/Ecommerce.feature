Feature: Ecommerce validations

  Scenario: Placing the order
    Given a login to ecommerce application with "username" and "password"
    When Add "zara coat 3" to Cart
    Then verify "zara coat 3" is displayed in the Cart
    When enter valid details and place order
    Then verify order is present in the OrderHistory