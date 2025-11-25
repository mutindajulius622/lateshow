import pytest
from coffee_shop.order import Order
from coffee_shop.customer import Customer
from coffee_shop.coffee import Coffee

def test_order_property_validation():
    customer = Customer("Carol")
    coffee = Coffee("Americano")

    with pytest.raises(TypeError):
        Order("not_a_customer", coffee, 3.0)

    with pytest.raises(TypeError):
        Order(customer, "not_a_coffee", 3.0)

    with pytest.raises(TypeError):
        Order(customer, coffee, "not_a_price")

    with pytest.raises(ValueError):
        Order(customer, coffee, 0.5)

    with pytest.raises(ValueError):
        Order(customer, coffee, 11.0)

    # Valid order
    order = Order(customer, coffee, 4.0)
    assert order.customer == customer
    assert order.coffee == coffee
    assert order.price == 4.0
