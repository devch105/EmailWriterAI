import { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        { emailContent, tone }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Container
        maxWidth="md"
        className="container"
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>Hello Buddy, I am Your </h2>
        <h1>AI Email Assistant</h1>

        <Box sx={{ mx: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent || ""}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 2, borderRadius: "1px" }}
            InputProps={{}}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel style={{ color: "" }}>Tone (Optional)</InputLabel>
            <Select
              value={tone || ""}
              label={"Tone (Optional)"}
              onChange={(e) => setTone(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {},
                },
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generated Reply:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={generatedReply || ""}
              inputProps={{ readOnly: true }}
              sx={{
                borderRadius: "4px",
              }}
            />

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigator.clipboard.writeText(generatedReply)}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;
