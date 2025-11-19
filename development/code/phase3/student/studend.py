ALL_COURSES = [
    "Data Science",
    "Software Engineering",
    "DevOPS",
    "Cyber Security",
    "AI Engineering",
    "High School Bootcamp",
    "Product Design",
    "Data Analytics",
    "Data Analytics for HR Professionals",
]


class Student:
    student_count = 0
    all_students = []

    def __init__(
        self, first_name, last_name, age, gender, student_id, course, instructor
    ):
        self._first_name = first_name
        self._last_name = last_name
        self._age = age
        self._gender = gender.lower()  # Normalize to lowercase
        self._student_id = student_id
        self._course = course
        self._instructor = instructor
        Student.student_count += 1

    @property
    def first_name(self):
        return self._first_name

    @first_name.setter
    def first_name(self, value):
        if not isinstance(value, str):
            raise ValueError("First name must be a string")
        self._first_name = value

    @property
    def last_name(self):
        return self._last_name

    @last_name.setter
    def last_name(self, value):
        if not isinstance(value, str):
            raise ValueError("Last name must be a string")
        self._last_name = value

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value <= 18:
            raise ValueError("Age must be above 18")
        self._age = value

    @property
    def gender(self):
        return self._gender

    @gender.setter
    def gender(self, value):
        if value.lower() not in ['male', 'female']:
            raise ValueError("Gender must be 'male' or 'female'")
        self._gender = value.lower()  # Normalize to lowercase

    @property
    def student_id(self):
        return self._student_id

    @student_id.setter
    def student_id(self, value):
        self._student_id = value

    @property
    def course(self):
        return self._course

    @course.setter
    def course(self, value):
        self._course = value

    @property
    def instructor(self):
        return self._instructor

    @instructor.setter
    def instructor(self, value):
        self._instructor = value
