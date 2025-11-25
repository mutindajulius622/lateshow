import pytest
from coffee_shop.coffee import Coffee

def test_coffee_name_set_and_get():
    coffee = Coffee("Latte")
    assert coffee.name == "Latte"

def test_coffee_name_set_invalid_type():
    with pytest.raises(TypeError):
        Coffee(123)

def test_coffee_name_set_too_short():
    with pytest.raises(ValueError):
        Coffee("ab")

def test_coffee_orders_and_customers():
    coffee = Coffee("Mocha")
    assert coffee.orders() == []
    assert coffee.customers() == []
