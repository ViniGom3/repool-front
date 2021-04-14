import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import AuthContext from 'src/contexts/AuthContext';

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    cel: user.cel,
    tel: user.tel,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      autoComplete='off'
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText='Please specify the first name'
                label='First name'
                name='firstName'
                onChange={handleChange}
                required
                value={values.firstName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Last name'
                name='lastName'
                onChange={handleChange}
                required
                value={values.lastName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Email Address'
                name='email'
                onChange={handleChange}
                required
                value={values.email}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Phone Number'
                name='phone'
                onChange={handleChange}
                value={values.cel}
                variant='outlined'
              />
            </Grid>
            {user.tel ? (
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Phone Number'
                  name='phone'
                  onChange={handleChange}
                  value={values.cel}
                  variant='outlined'
                />
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </CardContent>
        <Divider />
        {/* TODO Fazer esses botões mais responsivos */}
        <Box display='flex' flexWrap='wrap' justifyContent='flex-end' p={2}>
          <Button style={{ margin: 8 }} color='primary' variant='contained'>
            Salvar
          </Button>
          <Button style={{ margin: 8 }} variant='contained'>
            Cancelar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
