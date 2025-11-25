import pytest
from coffee_shop.customer import Customer
from coffee_shop.coffee import Coffee

def test_customer_name_set_and_get():
    customer = Customer("Alice")
    assert customer.name == "Alice"

def test_customer_name_type_and_length_violation():
    with pytest.raises(TypeError):
        Customer(123)
    with pytest.raises(ValueError):
        Customer("a"*16)

def test_create_order_and_coffees():
    customer = Customer("Bob")
    coffee = Coffee("Espresso")
    order = customer.create_order(coffee, 3.5)
    assert order.customer == customer
    assert order.coffee == coffee
    assert order.price == 3.5
    assert coffee.orders() == [order]
    assert customer.coffees() == [coffee]
