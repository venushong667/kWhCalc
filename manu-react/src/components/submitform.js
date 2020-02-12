import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  AppBar,
  Typography,
  FormControl,
  TextField,
  Button,
  Grid,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from "@material-ui/core";
import { DATAAPIV1 } from "../api/dataapi";
import { makeStyles } from "@material-ui/core/styles";

const SubmitForm = ({ onSubmit, energy }) => {
  const [state, setState] = useState({
    kw: []
  });

  const { kw } = state;

  const useStyles = makeStyles(theme => ({
    table: {
      minWidth: 500
    },
    control: {
      padding: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    const dataapiV1 = DATAAPIV1();

    dataapiV1
      .getData()
      .then(response => {
        const kw = response.data.map(data => ({
          ...data,
          key: data.id
        }));
        setState({ ...state, kw: kw });
        return response;
      })
      .catch(err => err);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null]);

  return (
    <Formik
      initialValues={{ time1: "", time2: "", kWh: "" }}
      onSubmit={(values, { setSubmitting }) =>
        onSubmit(values, { setSubmitting })
      }
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <AppBar position="static" color="primary">
              <Typography variant="h6">Data </Typography>
            </AppBar>
            <Grid container justify="flex-start">
              <FormControl>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Watt</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {kw.map(data => (
                        <TableRow key={data._id}>
                          <TableCell align="center">{data.time}</TableCell>
                          <TableCell align="center">{data.watt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </FormControl>
            </Grid>
            <br />
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  required
                  type="time"
                  name="time1"
                  label="Enter Time1"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange("time1")}
                  value={values.time1}
                  style={{ marginRight: "1em" }}
                />
                <TextField
                  required
                  type="time"
                  name="time2"
                  label="Enter Time2"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange("time2")}
                  value={values.time2}
                  style={{ marginRight: "1em" }}
                />

                <TextField
                  label="kWh"
                  value={energy.kWh}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => {}}
                >
                  Calculate
                </Button>
              </FormControl>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SubmitForm;
