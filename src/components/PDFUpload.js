import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const PDFUpload = ({ pdfFile, setPdfFile }) => {
  const [error, setError] = useState(null);

  // Clear localStorage on component mount (page refresh)
  useEffect(() => {
    localStorage.removeItem("pdfFile");
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfFile(reader.result);
        // Store only the file name instead of the full file
        localStorage.setItem("pdfFileName", file.name);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please upload a valid PDF file");
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfFile(reader.result);
        localStorage.setItem("pdfFileName", file.name);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please drop a valid PDF file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Simple PDF preview component
  const PDFPreview = ({ file }) => {
    return (
      <Box sx={{ width: "100%", mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          PDF File: {localStorage.getItem("pdfFileName")}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setPdfFile(null);
            localStorage.removeItem("pdfFileName");
            setError(null);
          }}
          sx={{ mt: 1 }}
        >
          Remove PDF
        </Button>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        border: "1px dashed gray",
        padding: 2,
        textAlign: "center",
        minHeight: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
      }}
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      {!pdfFile ? (
        <>
          <CloudUpload sx={{ fontSize: 50, color: "gray", mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 2 }}>
            Upload Your Invoice
          </Typography>
          <Button variant="contained" component="label">
            Upload File
            <input
              hidden
              type="file"
              accept="application/pdf"
              onChange={onFileChange}
            />
          </Button>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Or drag & drop a PDF here
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </>
      ) : (
        <PDFPreview file={pdfFile} />
      )}
    </Box>
  );
};

export default PDFUpload;
