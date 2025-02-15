import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  IconButton,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, ArrowBack, Remove } from "@mui/icons-material";
import PDFUpload from "./PDFUpload";

// A simple vendor list
const vendorList = [
  { name: "A-1 Exterminators", address: "500 Main St, Lynn" },
  { name: "Vendor 2", address: "123 Some St, City" },
  { name: "Vendor 3", address: "456 Another Rd, Town" },
];

// Mock data for dropdowns
const departmentList = ["HR", "Finance", "IT", "Sales"];
const accountList = ["Account 1", "Account 2", "Account 3"];
const locationList = ["Location 1", "Location 2", "Location 3"];
const purchaseOrderList = ["PO-001", "PO-002", "PO-003"];

// Basic form validation schema
const InvoiceSchema = Yup.object().shape({
  vendor: Yup.string().required("Vendor is required"),
  address: Yup.string().required("Address is required"),
  invoiceNumber: Yup.string().required("Invoice Number is required"),
  invoiceDate: Yup.date()
    .required("Invoice Date is required")
    .typeError("Invalid date"),
  totalAmount: Yup.number()
    .required("Total Amount is required")
    .typeError("Invalid amount"),
  expenses: Yup.array().of(
    Yup.object().shape({
      lineAmount: Yup.number().required("Line Amount is required"),
      department: Yup.string().required("Department is required"),
      account: Yup.string().required("Account is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
});

// Dummy data for the "Populate Dummy Data" button
const dummyData = {
  vendor: "A-1 Exterminators",
  address: "500 Main St, Lynn",
  invoiceNumber: "INV-1234",
  invoiceDate: "2025-02-14",
  totalAmount: "500",
  paymentTerms: "Net 30",
  dueDate: "2025-03-15",
  glPostDate: "2025-02-15",
  description: "Test description",
  comments: "Some comments",
  purchaseOrderNumber: "PO-001",
  expenses: [
    {
      lineAmount: "100",
      department: "HR",
      account: "Account 1",
      location: "Location 1",
      description: "Expense 1",
    },
  ],
};

// Custom TabPanel component
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Check if user is logged in; if not, redirect
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleCreateNewInvoice = (values, resetForm) => {
    alert("Form ready for new entry!");
    resetForm({ values: initialFormData }); // Clear the form
    setSnackbar({
      open: true,
      message: "Form ready for new entry!",
      severity: "success",
    });
  };

  // Initial blank form data
  const initialFormData = {
    vendor: "",
    address: "",
    invoiceNumber: "",
    invoiceDate: "",
    totalAmount: "",
    paymentTerms: "",
    dueDate: "",
    glPostDate: "",
    description: "",
    comments: "",
    purchaseOrderNumber: "",
    expenses: [
      {
        lineAmount: "",
        department: "",
        account: "",
        location: "",
        description: "",
      },
    ],
  };

  // Retrieve any previously saved form data
  const savedData = JSON.parse(localStorage.getItem("invoiceFormData"));
  const finalInitialValues = savedData || initialFormData;

  // "Save as Draft" just stores current form values
  const handleSaveAsDraft = (values) => {
    localStorage.setItem("invoiceFormData", JSON.stringify(values));
    setSnackbar({ open: true, message: "Draft saved!", severity: "success" });
  };

  // "Submit & New" saves and then clears the form
  const handleSubmitAndNew = (values, { resetForm }) => {
    localStorage.setItem("invoiceFormData", JSON.stringify(values));
    setSnackbar({
      open: true,
      message: "Form submitted!",
      severity: "success",
    });
    resetForm({ values: initialFormData }); // Clear the form
  };

  // If user picks a vendor, auto-fill address
  const handleVendorChange = (vendorName, setFieldValue) => {
    const vendorObj = vendorList.find((v) => v.name === vendorName);
    setFieldValue("vendor", vendorName);
    setFieldValue("address", vendorObj ? vendorObj.address : "");
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Snackbar for success and failure messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={finalInitialValues}
        validationSchema={InvoiceSchema}
        onSubmit={handleSubmitAndNew}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          setFieldValue,
          resetForm,
        }) => (
          <>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 0,
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
              }}
            >
              <Box display="flex" alignItems="center">
                <IconButton
                  sx={{ mr: 1 }}
                  onClick={() => handleCreateNewInvoice(values, resetForm)}
                >
                  <ArrowBack />
                </IconButton>
                <Typography variant="h6">Create New Invoice</Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={isMobile ? 2 : 0}>
                <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  sx={{ mt: 2 }}
                  variant={isMobile ? "scrollable" : "standard"}
                  scrollButtons="auto"
                >
                  <Tab label="Vendor Details" />
                  <Tab label="Invoice Details" />
                  <Tab label="Comments" />
                </Tabs>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    textTransform: "none",
                    borderRadius: 1,
                    ml: 2,
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Paper>

            <Grid container spacing={2} sx={{ p: 3 }}>
              {/* Left Panel - PDF Upload */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    height: currentTab === 1 ? "40%" : "89%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px dashed #ccc",
                    bgcolor: "#fff",
                  }}
                >
                  <PDFUpload pdfFile={pdfFile} setPdfFile={setPdfFile} />
                </Paper>
              </Grid>

              {/* Right Panel - Form */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, bgcolor: "#fff" }}>
                  <Form>
                    <TabPanel value={currentTab} index={0}>
                      {/* Vendor Information Section */}
                      <Box mb={4}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              bgcolor: "#e3f2fd",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mr: 1,
                            }}
                          >
                            <Typography variant="body2" color="primary">
                              1
                            </Typography>
                          </Box>
                          <Typography variant="h6">Vendor Details</Typography>
                        </Box>

                        <Box sx={{ ml: 4 }}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            mb={2}
                          >
                            Vendor Information
                          </Typography>
                          <TextField
                            select
                            fullWidth
                            label="Vendor *"
                            name="vendor"
                            value={values.vendor}
                            onChange={(e) =>
                              handleVendorChange(e.target.value, setFieldValue)
                            }
                            error={touched.vendor && Boolean(errors.vendor)}
                            helperText={touched.vendor && errors.vendor}
                            sx={{ mb: 2 }}
                          >
                            {vendorList.map((vendor) => (
                              <MenuItem key={vendor.name} value={vendor.name}>
                                {vendor.name}
                              </MenuItem>
                            ))}
                          </TextField>

                          <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            error={touched.address && Boolean(errors.address)}
                            helperText={touched.address && errors.address}
                            sx={{ mb: 1 }}
                          />

                          <Button
                            color="primary"
                            sx={{
                              textTransform: "none",
                              fontSize: "0.875rem",
                            }}
                          >
                            View Vendor Details
                          </Button>
                        </Box>
                      </Box>
                    </TabPanel>

                    <TabPanel value={currentTab} index={1}>
                      {/* General Information Section */}
                      <Box mb={4}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              bgcolor: "#e3f2fd",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mr: 1,
                            }}
                          >
                            <Typography variant="body2" color="primary">
                              3
                            </Typography>
                          </Box>
                          <Typography variant="h6">
                            General Information
                          </Typography>
                        </Box>

                        <Box sx={{ ml: 4 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                select
                                label="Purchase Order Number"
                                name="purchaseOrderNumber"
                                value={values.purchaseOrderNumber}
                                onChange={handleChange}
                                error={
                                  touched.purchaseOrderNumber &&
                                  Boolean(errors.purchaseOrderNumber)
                                }
                                helperText={
                                  touched.purchaseOrderNumber &&
                                  errors.purchaseOrderNumber
                                }
                              >
                                {purchaseOrderList.map((po) => (
                                  <MenuItem key={po} value={po}>
                                    {po}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                      {/* Invoice Details Section */}
                      <Box mb={4}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              bgcolor: "#e3f2fd",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mr: 1,
                            }}
                          >
                            <Typography variant="body2" color="primary">
                              2
                            </Typography>
                          </Box>
                          <Typography variant="h6">Invoice Details</Typography>
                        </Box>

                        <Box sx={{ ml: 4 }}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            mb={2}
                          >
                            Invoice Details
                          </Typography>

                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Invoice Number *"
                                name="invoiceNumber"
                                value={values.invoiceNumber}
                                onChange={handleChange}
                                error={
                                  touched.invoiceNumber &&
                                  Boolean(errors.invoiceNumber)
                                }
                                helperText={
                                  touched.invoiceNumber && errors.invoiceNumber
                                }
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Invoice Date *"
                                name="invoiceDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={values.invoiceDate}
                                onChange={handleChange}
                                error={
                                  touched.invoiceDate &&
                                  Boolean(errors.invoiceDate)
                                }
                                helperText={
                                  touched.invoiceDate && errors.invoiceDate
                                }
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Total Amount *"
                                name="totalAmount"
                                value={values.totalAmount}
                                onChange={handleChange}
                                error={
                                  touched.totalAmount &&
                                  Boolean(errors.totalAmount)
                                }
                                helperText={
                                  touched.totalAmount && errors.totalAmount
                                }
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Payment Terms"
                                name="paymentTerms"
                                value={values.paymentTerms}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Due Date"
                                name="dueDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={values.dueDate}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="GL Post Date"
                                name="glPostDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={values.glPostDate}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>

                      {/* Expense Details Section */}
                      <Box mb={4}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              bgcolor: "#e3f2fd",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mr: 1,
                            }}
                          >
                            <Typography variant="body2" color="primary">
                              4
                            </Typography>
                          </Box>
                          <Typography variant="h6">
                            Expense Details
                            <Typography
                              component="span"
                              color="text.secondary"
                              sx={{ ml: 2 }}
                            >
                              $ {values.totalAmount || "0.00"} / ${" "}
                              {values.totalAmount || "0.00"}
                            </Typography>
                          </Typography>
                        </Box>

                        <Box sx={{ ml: 4 }}>
                          <FieldArray name="expenses">
                            {({ push, remove }) => (
                              <>
                                {values.expenses &&
                                  values.expenses.map((expense, index) => (
                                    <Grid
                                      container
                                      spacing={2}
                                      key={index}
                                      sx={{ mb: 2 }}
                                    >
                                      <Grid item xs={12} md={2}>
                                        <TextField
                                          fullWidth
                                          label="Line Amount *"
                                          name={`expenses.${index}.lineAmount`}
                                          value={expense.lineAmount}
                                          onChange={handleChange}
                                          error={
                                            touched.expenses?.[index]
                                              ?.lineAmount &&
                                            Boolean(
                                              errors.expenses?.[index]
                                                ?.lineAmount
                                            )
                                          }
                                          helperText={
                                            touched.expenses?.[index]
                                              ?.lineAmount &&
                                            errors.expenses?.[index]?.lineAmount
                                          }
                                          InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                $
                                              </InputAdornment>
                                            ),
                                          }}
                                        />
                                      </Grid>
                                      <Grid item xs={12} md={2}>
                                        <TextField
                                          select
                                          fullWidth
                                          label="Department *"
                                          name={`expenses.${index}.department`}
                                          value={expense.department}
                                          onChange={handleChange}
                                          error={
                                            touched.expenses?.[index]
                                              ?.department &&
                                            Boolean(
                                              errors.expenses?.[index]
                                                ?.department
                                            )
                                          }
                                          helperText={
                                            touched.expenses?.[index]
                                              ?.department &&
                                            errors.expenses?.[index]?.department
                                          }
                                        >
                                          {departmentList.map((dept) => (
                                            <MenuItem key={dept} value={dept}>
                                              {dept}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                      </Grid>
                                      <Grid item xs={12} md={2}>
                                        <TextField
                                          select
                                          fullWidth
                                          label="Account *"
                                          name={`expenses.${index}.account`}
                                          value={expense.account}
                                          onChange={handleChange}
                                          error={
                                            touched.expenses?.[index]
                                              ?.account &&
                                            Boolean(
                                              errors.expenses?.[index]?.account
                                            )
                                          }
                                          helperText={
                                            touched.expenses?.[index]
                                              ?.account &&
                                            errors.expenses?.[index]?.account
                                          }
                                        >
                                          {accountList.map((acc) => (
                                            <MenuItem key={acc} value={acc}>
                                              {acc}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                      </Grid>
                                      <Grid item xs={12} md={2}>
                                        <TextField
                                          select
                                          fullWidth
                                          label="Location *"
                                          name={`expenses.${index}.location`}
                                          value={expense.location}
                                          onChange={handleChange}
                                          error={
                                            touched.expenses?.[index]
                                              ?.location &&
                                            Boolean(
                                              errors.expenses?.[index]?.location
                                            )
                                          }
                                          helperText={
                                            touched.expenses?.[index]
                                              ?.location &&
                                            errors.expenses?.[index]?.location
                                          }
                                        >
                                          {locationList.map((loc) => (
                                            <MenuItem key={loc} value={loc}>
                                              {loc}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                      </Grid>
                                      <Grid item xs={12} md={3}>
                                        <TextField
                                          fullWidth
                                          label="Description *"
                                          name={`expenses.${index}.description`}
                                          value={expense.description}
                                          onChange={handleChange}
                                          error={
                                            touched.expenses?.[index]
                                              ?.description &&
                                            Boolean(
                                              errors.expenses?.[index]
                                                ?.description
                                            )
                                          }
                                          helperText={
                                            touched.expenses?.[index]
                                              ?.description &&
                                            errors.expenses?.[index]
                                              ?.description
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12} md={1}>
                                        <IconButton
                                          onClick={() => remove(index)}
                                          sx={{ mt: 1 }}
                                        >
                                          <Remove />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  ))}
                                <Button
                                  variant="outlined"
                                  startIcon={<Add />}
                                  onClick={() =>
                                    push({
                                      lineAmount: "",
                                      department: "",
                                      account: "",
                                      location: "",
                                      description: "",
                                    })
                                  }
                                  sx={{
                                    mt: 2,
                                    textTransform: "none",
                                    borderRadius: 1,
                                  }}
                                >
                                  Add Expense Coding
                                </Button>
                              </>
                            )}
                          </FieldArray>
                        </Box>
                      </Box>
                    </TabPanel>

                    <TabPanel value={currentTab} index={2}>
                      {/* Comments Section */}
                      <Box mb={4}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              bgcolor: "#e3f2fd",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mr: 1,
                            }}
                          >
                            <Typography variant="body2" color="primary">
                              4
                            </Typography>
                          </Box>
                          <Typography variant="h6">Comments</Typography>
                        </Box>

                        <Box sx={{ ml: 4 }}>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            name="comments"
                            value={values.comments}
                            onChange={handleChange}
                            placeholder="Add a comment or use @Name to tag someone"
                          />
                        </Box>
                      </Box>
                    </TabPanel>

                    {/* Footer Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 4,
                        flexDirection: isMobile ? "column" : "row",
                        gap: isMobile ? 2 : 0,
                      }}
                    >
                      {/* Dummy Data Button */}
                      <Button
                        variant="outlined"
                        onClick={() => {
                          Object.keys(dummyData).forEach((key) => {
                            setFieldValue(key, dummyData[key]);
                          });
                          setSnackbar({
                            open: true,
                            message: "Dummy data populated!",
                            severity: "success",
                          });
                        }}
                        sx={{
                          textTransform: "none",
                          borderRadius: 1,
                        }}
                      >
                        Populate Dummy Data
                      </Button>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => handleSaveAsDraft(values)}
                          sx={{
                            textTransform: "none",
                            borderRadius: 1,
                          }}
                        >
                          Save as Draft
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            textTransform: "none",
                            borderRadius: 1,
                          }}
                        >
                          Submit & New
                        </Button>
                      </Box>
                    </Box>
                  </Form>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default InvoiceForm;
