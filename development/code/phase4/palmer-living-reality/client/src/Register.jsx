import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
  role: Yup.string().required('Required'),
});

const Register = () => (
  <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        role: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Handle registration logic here
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={values.role}
              label="Role"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.role && Boolean(errors.role)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="owner">Owner</MenuItem>
              <MenuItem value="tenant">Tenant</MenuItem>
            </Select>
            {touched.role && errors.role && (
              <Box sx={{ color: 'error.main', mt: 1 }}>{errors.role}</Box>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  </Box>
);

export default Register;