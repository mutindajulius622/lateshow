#!/usr/bin/env python3

from studend import Student

def test_student_class():
    print("Testing Student class with getters and setters...")

    # Test instantiation with valid data
    try:
        student = Student("John", "Doe", 25, "Male", "12345", "Data Science", "Instructor A")
        print("✓ Student instantiated successfully")
    except Exception as e:
        print(f"✗ Failed to instantiate: {e}")
        return

    # Test getters
    assert student.first_name == "John", f"Expected 'John', got {student.first_name}"
    assert student.last_name == "Doe", f"Expected 'Doe', got {student.last_name}"
    assert student.age == 25, f"Expected 25, got {student.age}"
    assert student.gender == "male", f"Expected 'male', got {student.gender}"
    assert student.student_id == "12345", f"Expected '12345', got {student.student_id}"
    assert student.course == "Data Science", f"Expected 'Data Science', got {student.course}"
    assert student.instructor == "Instructor A", f"Expected 'Instructor A', got {student.instructor}"
    print("✓ Getters work correctly")

    # Test setters with valid data
    student.first_name = "Jane"
    student.last_name = "Smith"
    student.age = 30
    student.gender = "Female"
    student.student_id = "67890"
    student.course = "AI Engineering"
    student.instructor = "Instructor B"

    assert student.first_name == "Jane", f"Expected 'Jane', got {student.first_name}"
    assert student.last_name == "Smith", f"Expected 'Smith', got {student.last_name}"
    assert student.age == 30, f"Expected 30, got {student.age}"
    assert student.gender == "female", f"Expected 'female', got {student.gender}"
    assert student.student_id == "67890", f"Expected '67890', got {student.student_id}"
    assert student.course == "AI Engineering", f"Expected 'AI Engineering', got {student.course}"
    assert student.instructor == "Instructor B", f"Expected 'Instructor B', got {student.instructor}"
    print("✓ Setters work correctly with valid data")

    # Test validations
    # Invalid first_name
    try:
        student.first_name = 123
        print("✗ first_name setter should raise ValueError for non-string")
        return
    except ValueError as e:
        assert str(e) == "First name must be a string", f"Unexpected error: {e}"
        print("✓ first_name validation works")

    # Invalid last_name
    try:
        student.last_name = 456
        print("✗ last_name setter should raise ValueError for non-string")
        return
    except ValueError as e:
        assert str(e) == "Last name must be a string", f"Unexpected error: {e}"
        print("✓ last_name validation works")

    # Invalid age
    try:
        student.age = 17
        print("✗ age setter should raise ValueError for age <= 18")
        return
    except ValueError as e:
        assert str(e) == "Age must be above 18", f"Unexpected error: {e}"
        print("✓ age validation works")

    # Invalid gender
    try:
        student.gender = "other"
        print("✗ gender setter should raise ValueError for invalid gender")
        return
    except ValueError as e:
        assert str(e) == "Gender must be 'male' or 'female'", f"Unexpected error: {e}"
        print("✓ gender validation works")

    # Test student_count
    initial_count = Student.student_count
    student2 = Student("Alice", "Wonder", 22, "Female", "11111", "Cyber Security", "Instructor C")
    assert Student.student_count == initial_count + 1, f"Expected {initial_count + 1}, got {Student.student_count}"
    print("✓ student_count increments correctly")

    print("All tests passed!")

if __name__ == "__main__":
    test_student_class()
