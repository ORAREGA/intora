const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config(); 
const https = require("https");


const app = express();
const server = http.createServer(app);
const server = https.createServer(sslOptions, app);
app.use(cors({
  origin: [
    "http://intora.in", "https://intora.in", 
    "http://admin.intora.in", "https://admin.intora.in"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,  // Enable credentials if necessary
}));

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: [
      "http://intora.in", "https://intora.in",  // Allow both http and https for intora.in
      "http://admin.intora.in", "https://admin.intora.in"  // Allow both http and https for admin.intora.in
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,  // Allow cookies/authentication tokens
  },
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// MongoDB connection
const PORT = process.env.PORT || 80;
const IP_ADDRESS = process.env.IP_ADDRESS || '0.0.0.0';



mongoose.connect(process.env.DATABASE, {
  serverSelectionTimeoutMS: 5000, // Adjust timeout if needed
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.error("❌ MongoDB connection error:", err));



const estimateSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  bhkType: String,
  size: String,
  selectedRooms: [String],
  kitchenLayout: String,
  kitchenLength: String,
  FullHomeInteriordesignType: String,
  FullHomeInteriorAddOns: [String],
  layoutType: String,
  length: String,
  ModularKitchendesignType: String,
  ModularKitchenAddOns: [String],
  wardrobeType: String,
  height: String,
  width: String,
  WardrobedesignType: String,
  materialType: String,
  loft: String,
  loftSize: String,
  finishing: String,
  workspaceType: String,
  deskType: String,
  materialsType: String,
  deskSize: String,
  workspaceLayout: String,
  addOns: [String],
  getEstimate: Boolean,
});

const notificationSchema = new mongoose.Schema({
  message: String,
  type: { type: String, enum: ["info", "success", "error", "estimate", "enquiry", "consultation"] },
  timestamp: { type: Date, default: Date.now },
});

const formSchema = new mongoose.Schema({
  formType: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: String,
});

const bannerSchema = new mongoose.Schema({
  background: String,
  overlayDark: Number,
  title: String,
  heading: [String],
  description: String,
  link: String,
});

const imageSchema = new mongoose.Schema({
  img: { type: String, required: true },
  category: { type: String, required: true },
  
});

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String, required: true },
  image: String,
});



const EstimateForm = mongoose.model("EstimateForm", estimateSchema);
const Notification = mongoose.model("Notification", notificationSchema);
const Form = mongoose.model("Form", formSchema);
const Banner = mongoose.model("Banner", bannerSchema);
const Image = mongoose.model("Image", imageSchema);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);


app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/testimonials', upload.single('image'), async (req, res) => {
  try {
    const { name, position, message } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newTestimonial = new Testimonial({ name, position, message, image });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/testimonials/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, position, message } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, position, message, image },
      { new: true }
    );
    res.json(testimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/images", upload.single("img"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const { category } = req.body;
    const newImage = new Image({
      img: `/uploads/${req.file.filename}`,
      category,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find({}, { category: 1, img: 1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Image with File Removal
app.delete("/api/images/:id", async (req, res) => {
  try {
    // Find the image in the database
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    // Remove the image file from the filesystem
    const filePath = path.join(__dirname, image.img);  // Get file path
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);  // Delete the file
    }

    // Delete the image document from the database
    await Image.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update Image
app.put("/api/images/:id", upload.single("img"), async (req, res) => {
  try {
    const { category } = req.body;
    const img = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedFields = { category };
    if (img) updatedFields.img = img;

    const updatedImage = await Image.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!updatedImage) return res.status(404).json({ error: "Image not found" });

    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/slides", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    res.status(500).send("Error fetching banners");
  }
});

app.post("/slides", upload.single("background"), async (req, res) => {
  try {
    const { overlayDark, title, heading, description, link } = req.body;
    const newBanner = new Banner({
      background: `/uploads/${req.file.filename}`,
      overlayDark,
      title,
      heading,
      description,
      link,
    });
    await newBanner.save();
    res.status(201).send("Banner added successfully");
  } catch (error) {
    res.status(500).send("Error adding banner");
  }
});


app.put("/slides/:id", upload.single("background"), async (req, res) => {
  try {
    const { overlayDark, title, heading, description, link } = req.body;
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      {
        background: req.file ? `/uploads/${req.file.filename}` : req.body.background,
        overlayDark,
        title,
        heading,
        description,
        link,
      },
      { new: true }
    );
    res.send("Banner updated successfully");
  } catch (error) {
    res.status(500).send("Error updating banner");
  }
});
app.delete("/slides/:id", async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.send("Banner deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting banner");
  }
});




app.get("/get-estimates", async (req, res) => {
  try {
    const estimates = await EstimateForm.find();
    res.status(200).json(estimates);
  } catch (error) {
    console.error("Error fetching estimates:", error);
    res.status(500).json({ error: "Error fetching estimates" });
  }
});

app.post("/api/estimates", async (req, res) => {
  try {
    const estimateData = req.body; // Assuming the body has the estimate data
    const newEstimate = new EstimateForm(estimateData);
    await newEstimate.save();

    // Create a notification
    const notificationMessage = `New estimate request submitted by ${estimateData.name}`;
    const notificationType = "estimate";

    const newNotification = new Notification({
      message: notificationMessage,
      type: notificationType,
    });
    await newNotification.save();

    io.emit("new-notification", {
      message: notificationMessage,
      type: notificationType,
    });

    res.status(201).json(newEstimate);
  } catch (error) {
    console.error("Error creating estimate:", error);
    res.status(500).json({ error: "Error creating estimate" });
  }
});
app.put("/api/estimates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; 

    const updatedEstimate = await EstimateForm.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedEstimate) {
      return res.status(404).json({ message: "Estimate not found" });
    }

    // Create a notification
    const notificationMessage = `Estimate request updated by ${updatedData.name}`;
    const notificationType = "estimate";

    const newNotification = new Notification({
      message: notificationMessage,
      type: notificationType,
    });
    await newNotification.save();

    // Emit a new notification
    io.emit("new-notification", {
      message: notificationMessage,
      type: notificationType,
    });

    res.status(200).json(updatedEstimate);
  } catch (error) {
    console.error("Error updating estimate:", error);
    res.status(500).json({ error: "Error updating estimate" });
  }
});
app.delete("/api/estimates/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEstimate = await EstimateForm.findByIdAndDelete(id);

    if (!deletedEstimate) {
      return res.status(404).json({ message: "Estimate not found" });
    }

    // Create a notification
    const notificationMessage = `Estimate request deleted for ${deletedEstimate.name}`;
    const notificationType = "estimate";

    const newNotification = new Notification({
      message: notificationMessage,
      type: notificationType,
    });
    await newNotification.save();

    // Emit a new notification
    io.emit("new-notification", {
      message: notificationMessage,
      type: notificationType,
    });

    res.status(200).json({ message: "Estimate deleted" });
  } catch (error) {
    console.error("Error deleting estimate:", error);
    res.status(500).json({ error: "Error deleting estimate" });
  }
});

// POST route for enquiry submission

// POST route for consultation booking
app.post("/book-consultation", async (req, res) => {
  try {
    const { name, email, phone, message, preferredDate, preferredTime } = req.body;
    const newConsultation = new Form({
      formType: "consultation",
      name,
      email,
      phone,
      message,
      preferredDate,
      preferredTime,
    });
    await newConsultation.save();

    const notificationMessage = `New consultation booked by ${name}`;
    const notificationType = "consultation";

    const newNotification = new Notification({
      message: notificationMessage,
      type: notificationType,
    });
    await newNotification.save();

    io.emit("new-notification", { message: notificationMessage, type: notificationType });

    res.status(200).json({ message: "Consultation booked successfully!" });
  } catch (error) {
    console.error("Error booking consultation:", error);
    res.status(500).json({ error: "Error booking consultation" });
  }
});

// GET route to fetch all consultations
app.get("/get-consultations", async (req, res) => {
  try {
    const consultations = await Form.find({ formType: "consultation" });
    res.status(200).json(consultations);
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Error fetching consultations" });
  }
});

// GET route to fetch all notifications
app.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
});


// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://${IP_ADDRESS}:${PORT}`);
});


