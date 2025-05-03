import { ObjectId } from 'mongodb';

export const dataStocks = [
  {
    number: "RM-1001",
    item: "Aluminum Sheet",
    type: "raw-material",
    location: "storage",
    description: "1m x 2m aluminum sheet, 2mm thickness",
    attribute1: "Grade 6061",
    attribute2: "Brushed finish",
    quantity: 150,
    unit: "sheets"
  },
  {
    number: "RM-1002",
    item: "Stainless Steel Rod",
    type: "raw-material",
    location: "storage",
    description: "10mm diameter stainless steel rod",
    attribute1: "Grade 304",
    attribute2: "Polished",
    quantity: 300,
    unit: "meters"
  },
  {
    number: "RM-1003",
    item: "Oak Plank",
    type: "raw-material",
    location: "storage",
    description: "2m x 20cm x 2cm oak wood plank",
    attribute1: "Grade A",
    attribute2: "Kiln-dried",
    quantity: 80,
    unit: "planks"
  },
  {
    number: "RM-1004",
    item: "ABS Plastic Pellet",
    type: "raw-material",
    location: "loading",
    description: "Black ABS plastic granules for molding",
    attribute1: "UV-resistant",
    quantity: 500,
    unit: "kg"
  },
  {
    number: "RM-1005",
    item: "Tempered Glass Panel",
    type: "raw-material",
    location: "storage",
    description: "6mm thick tempered glass 1m x 1m",
    attribute1: "Clear",
    attribute2: "Safety rated",
    quantity: 45,
    unit: "panels"
  },
  {
    number: "RM-1006",
    item: "Copper Wire",
    type: "raw-material",
    location: "storage",
    description: "18 AWG bare copper wire",
    attribute1: "99.9% pure",
    quantity: 1200,
    unit: "meters"
  },
  {
    number: "RM-1007",
    item: "Memory Foam Block",
    type: "raw-material",
    location: "production",
    description: "50cm x 50cm x 10cm foam block",
    attribute1: "Density 50kg/m³",
    quantity: 65,
    unit: "blocks"
  },
  {
    number: "RM-1008",
    item: "Leather Hide",
    type: "raw-material",
    location: "storage",
    description: "Full-grain cowhide 2.5m²",
    attribute1: "Black",
    attribute2: "Vegetable-tanned",
    quantity: 30,
    unit: "hides"
  },
  {
    number: "RM-1009",
    item: "Rubber Sheet",
    type: "raw-material",
    location: "storage",
    description: "5mm thick natural rubber sheet",
    attribute1: "Oil-resistant",
    quantity: 90,
    unit: "sheets"
  },
  {
    number: "RM-1010",
    item: "Neodymium Magnet",
    type: "raw-material",
    location: "receipt",
    description: "20mm diameter disc magnet",
    attribute1: "N52 grade",
    quantity: 400,
    unit: "units"
  },
  {
    number: "RM-1011",
    item: "Brass Fitting",
    type: "raw-material",
    location: "storage",
    description: "1/2 inch brass pipe fitting",
    attribute1: "Lead-free",
    quantity: 250,
    unit: "units"
  },
  {
    number: "RM-1012",
    item: "Carbon Fiber Sheet",
    type: "raw-material",
    location: "storage",
    description: "1m x 1m 3K twill weave",
    attribute1: "1.2mm thick",
    quantity: 35,
    unit: "sheets"
  },
  {
    number: "RM-1013",
    item: "Silicone Sealant",
    type: "raw-material",
    location: "production",
    description: "300ml cartridge silicone sealant",
    attribute1: "Neutral cure",
    quantity: 120,
    unit: "cartridges"
  },
  {
    number: "RM-1014",
    item: "Stainless Steel Screw",
    type: "raw-material",
    location: "storage",
    description: "M5 x 20mm machine screw",
    attribute1: "A2-70 grade",
    quantity: 2000,
    unit: "units"
  },
  {
    number: "RM-1015",
    item: "Polyester Fabric",
    type: "raw-material",
    location: "storage",
    description: "150cm width waterproof fabric",
    attribute1: "600D oxford",
    quantity: 180,
    unit: "meters"
  },
  {
    number: "RM-1016",
    item: "Epoxy Resin",
    type: "raw-material",
    location: "receipt",
    description: "2-part epoxy adhesive",
    attribute1: "30min work time",
    quantity: 80,
    unit: "kits"
  },
  {
    number: "RM-1017",
    item: "Aluminum Extrusion",
    type: "raw-material",
    location: "storage",
    description: "20mm x 20mm T-slot profile",
    attribute1: "Anodized",
    quantity: 400,
    unit: "meters"
  },
  {
    number: "RM-1018",
    item: "PVC Pipe",
    type: "raw-material",
    location: "storage",
    description: "1 inch diameter schedule 40",
    attribute1: "White",
    quantity: 300,
    unit: "meters"
  },
  {
    number: "RM-1019",
    item: "Ceramic Tile",
    type: "raw-material",
    location: "loading",
    description: "30cm x 30cm porcelain tile",
    attribute1: "Matte finish",
    quantity: 500,
    unit: "tiles"
  },
  {
    number: "RM-1020",
    item: "Nickel Strip",
    type: "raw-material",
    location: "storage",
    description: "10mm wide pure nickel strip",
    attribute1: "0.15mm thick",
    quantity: 200,
    unit: "meters"
  },

  // ========== COMPONENTS (20 items) ==========
  {
    number: "CP-2001",
    item: "Bicycle Frame",
    type: "component",
    location: "production",
    description: "18-inch aluminum bicycle frame",
    attribute1: "Red",
    attribute2: "Size M",
    quantity: 45,
    unit: "units"
  },
  {
    number: "CP-2002",
    item: "Bicycle Wheel",
    type: "component",
    location: "storage",
    description: "26-inch alloy bicycle wheel",
    attribute1: "Silver",
    attribute2: "36-spoke",
    quantity: 120,
    unit: "units"
  },
  {
    number: "CP-2003",
    item: "Handlebar Set",
    type: "component",
    location: "storage",
    description: "Mountain bike handlebar with grips",
    attribute1: "Black",
    attribute2: "680mm width",
    quantity: 75,
    unit: "sets"
  },
  {
    number: "CP-2004",
    item: "Chair Base",
    type: "component",
    location: "production",
    description: "5-star nylon chair base",
    attribute1: "Black",
    attribute2: "300kg capacity",
    quantity: 60,
    unit: "units"
  },
  {
    number: "CP-2005",
    item: "Seat Cushion",
    type: "component",
    location: "storage",
    description: "Office chair memory foam cushion",
    attribute1: "Black fabric",
    attribute2: "50cm x 50cm",
    quantity: 85,
    unit: "units"
  },
  {
    number: "CP-2006",
    item: "Bluetooth Speaker Case",
    type: "component",
    location: "storage",
    description: "Waterproof speaker enclosure",
    attribute1: "Blue",
    attribute2: "IP67 rated",
    quantity: 110,
    unit: "units"
  },
  {
    number: "CP-2007",
    item: "Power Tool Battery",
    type: "component",
    location: "storage",
    description: "20V lithium-ion battery pack",
    attribute1: "4.0Ah",
    quantity: 95,
    unit: "units"
  },
  {
    number: "CP-2008",
    item: "LED Display Panel",
    type: "component",
    location: "production",
    description: "10.1-inch IPS LCD panel",
    attribute1: "1920x1200",
    quantity: 70,
    unit: "units"
  },
  {
    number: "CP-2009",
    item: "Hydraulic Pump",
    type: "component",
    location: "storage",
    description: "12V DC hydraulic power unit",
    attribute1: "2.2kW",
    quantity: 40,
    unit: "units"
  },
  {
    number: "CP-2010",
    item: "Smartphone Housing",
    type: "component",
    location: "receipt",
    description: "Aluminum smartphone chassis",
    attribute1: "Space Gray",
    quantity: 200,
    unit: "units"
  },
  {
    number: "CP-2011",
    item: "Gearbox Assembly",
    type: "component",
    location: "production",
    description: "3-speed gear reduction unit",
    attribute1: "10:1 ratio",
    quantity: 55,
    unit: "units"
  },
  {
    number: "CP-2012",
    item: "Touchscreen Digitizer",
    type: "component",
    location: "storage",
    description: "7-inch capacitive touch panel",
    attribute1: "Glass",
    quantity: 90,
    unit: "units"
  },
  {
    number: "CP-2013",
    item: "Electric Motor",
    type: "component",
    location: "storage",
    description: "500W brushless DC motor",
    attribute1: "48V",
    quantity: 65,
    unit: "units"
  },
  {
    number: "CP-2014",
    item: "Power Supply Unit",
    type: "component",
    location: "production",
    description: "600W ATX power supply",
    attribute1: "80+ Gold",
    quantity: 80,
    unit: "units"
  },
  {
    number: "CP-2015",
    item: "Water Pump",
    type: "component",
    location: "storage",
    description: "12V DC centrifugal pump",
    attribute1: "800L/h flow",
    quantity: 50,
    unit: "units"
  },
  {
    number: "CP-2016",
    item: "Controller Board",
    type: "component",
    location: "receipt",
    description: "Arduino-compatible microcontroller",
    attribute1: "ESP32",
    quantity: 150,
    unit: "units"
  },
  {
    number: "CP-2017",
    item: "LED Light Strip",
    type: "component",
    location: "storage",
    description: "5m RGB LED strip with controller",
    attribute1: "IP65",
    quantity: 120,
    unit: "rolls"
  },
  {
    number: "CP-2018",
    item: "Cooling Fan",
    type: "component",
    location: "production",
    description: "120mm PWM cooling fan",
    attribute1: "4-pin",
    quantity: 200,
    unit: "units"
  },
  {
    number: "CP-2019",
    item: "Hinges Set",
    type: "component",
    location: "storage",
    description: "Set of 4 stainless steel hinges",
    attribute1: "100mm",
    quantity: 85,
    unit: "sets"
  },
  {
    number: "CP-2020",
    item: "Drawer Slides",
    type: "component",
    location: "storage",
    description: "Pair of 45cm ball-bearing slides",
    attribute1: "45kg load",
    quantity: 70,
    unit: "pairs"
  },
  {
    number: "RM-5001",
    item: "Steel Coil",
    type: "raw-material",
    location: "storage",
    description: "1m wide cold-rolled steel coil",
    attribute1: "Grade 1018",
    attribute2: "0.5mm thickness",
    quantity: 12500,
    unit: "meters",
    minStockLevel: 2000
  },
  {
    number: "RM-5002",
    item: "Plastic Pellets (PP)",
    type: "raw-material",
    location: "storage",
    description: "Polypropylene granules for injection molding",
    attribute1: "Natural color",
    attribute2: "MFI 20g/10min",
    quantity: 8500,
    unit: "kg",
    minStockLevel: 1000
  },
  {
    number: "RM-5003",
    item: "Pine Wood Plank",
    type: "raw-material",
    location: "storage",
    description: "Standard 2x4 construction lumber",
    attribute1: "KD-19",
    attribute2: "2.44m length",
    quantity: 22000,
    unit: "planks",
    minStockLevel: 5000
  },
  {
    number: "RM-5004",
    item: "Glass Microspheres",
    type: "raw-material",
    location: "storage",
    description: "Hollow glass spheres for composites",
    attribute1: "50μm average",
    attribute2: "0.6g/cc density",
    quantity: 15000,
    unit: "kg",
    minStockLevel: 2000
  },
  {
    number: "RM-5005",
    item: "Copper Wire Spool",
    type: "raw-material",
    location: "storage",
    description: "12 AWG bare copper wire",
    attribute1: "99.9% pure",
    attribute2: "5kg spool",
    quantity: 1800,
    unit: "spools",
    minStockLevel: 300
  },
  {
    number: "RM-5006",
    item: "Rubber Compound",
    type: "raw-material",
    location: "storage",
    description: "SBR rubber for molding",
    attribute1: "Shore A 60",
    attribute2: "Black color",
    quantity: 9500,
    unit: "kg",
    minStockLevel: 1500
  },
];

export const dataProducts = [
  {
    name: "Deluxe Office Chair",
    price: 199.99,
    currency: "USD",
    description: "Ergonomic office chair with memory foam and 5-star base.",
    category: "Furniture",
    rating: 4.5,
    supply: 50,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2004", // Chair Base
        quantityNeeded: 1,
        notes: "Base frame"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2005", // Seat Cushion
        quantityNeeded: 1,
        notes: "Seating support"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1007", // Memory Foam Block
        quantityNeeded: 1,
        notes: "Internal padding"
      }
    ]
  },
  {
    name: "Electric Scooter Control Unit",
    price: 129.5,
    currency: "USD",
    description: "Controller system for lightweight electric scooter.",
    category: "Electronics",
    rating: 4.2,
    supply: 80,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Main microcontroller"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2013", // Electric Motor
        quantityNeeded: 1,
        notes: "Brushless motor"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2014", // Power Supply Unit
        quantityNeeded: 1,
        notes: "Power source"
      }
    ]
  },  
  {
    name: "Premium Bicycle Kit",
    price: 299.99,
    currency: "USD",
    description: "Full bicycle frame kit with wheel, frame, and handlebar.",
    category: "Sports",
    rating: 4.8,
    supply: 30,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2001", // Bicycle Frame
        quantityNeeded: 1,
        notes: "Main body"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2002", // Bicycle Wheel
        quantityNeeded: 2,
        notes: "Front and rear wheels"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2003", // Handlebar Set
        quantityNeeded: 1,
        notes: "Steering component"
      }
    ]
  },
  {
    name: "Smart Home Sensor Kit",
    price: 89.99,
    currency: "USD",
    description: "Sensor and controller kit for smart home automation.",
    category: "Electronics",
    rating: 4.4,
    supply: 120,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "IoT control board"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1010", // Motion Sensor
        quantityNeeded: 2,
        notes: "Movement detection"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1009", // Temperature Sensor
        quantityNeeded: 1,
        notes: "Environmental sensing"
      }
    ]
  },
  {
    name: "Electric Drill Set",
    price: 149.99,
    currency: "USD",
    description: "Heavy-duty electric drill with ergonomic grip and lithium battery.",
    category: "Tools",
    rating: 4.7,
    supply: 75,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2013", // Electric Motor
        quantityNeeded: 1,
        notes: "Rotary power"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2014", // Power Supply Unit
        quantityNeeded: 1,
        notes: "Battery pack"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2005", // Seat Cushion
        quantityNeeded: 1,
        notes: "Used as grip padding"
      }
    ]
  },
  {
    name: "Autonomous Toy Car",
    price: 59.99,
    currency: "USD",
    description: "Miniature car with controller and ultrasonic sensor for collision avoidance.",
    category: "Toys",
    rating: 4.3,
    supply: 200,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Automaton Chip"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2013", // Electric Motor
        quantityNeeded: 2,
        notes: "Drive motors"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1011", // Ultrasonic Sensor
        quantityNeeded: 1,
        notes: "Front obstacle detection"
      }
    ]
  },
  {
    name: "Thermal Monitoring System",
    price: 74.99,
    currency: "USD",
    description: "System to monitor temperature using microcontroller and sensor.",
    category: "Electronics",
    rating: 4.1,
    supply: 110,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Data processor"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1009", // Temperature Sensor
        quantityNeeded: 2,
        notes: "For dual-zone monitoring"
      }
    ]
  },
  {
    name: "Motion-Activated Light Module",
    price: 39.99,
    currency: "USD",
    description: "Light unit activated by motion sensor and powered by small controller.",
    category: "Home Automation",
    rating: 4.6,
    supply: 180,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Logic controller"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1010", // Motion Sensor
        quantityNeeded: 1,
        notes: "Detects presence"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2014", // Power Supply Unit
        quantityNeeded: 1,
        notes: "Power for light module"
      }
    ]
  },
  {
    name: "Wireless Smart Doorbell",
    price: 64.99,
    currency: "USD",
    description: "Smart doorbell with motion detection and wireless controller.",
    category: "Home Security",
    rating: 4.2,
    supply: 95,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Wi-Fi communication and processing"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1010", // Motion Sensor
        quantityNeeded: 1,
        notes: "Detects visitors"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2014", // Power Supply Unit
        quantityNeeded: 1,
        notes: "Powers the entire module"
      }
    ]
  },
  {
    name: "Portable Air Quality Monitor",
    price: 89.99,
    currency: "USD",
    description: "Handheld device measuring air quality with real-time data output.",
    category: "Health",
    rating: 4.3,
    supply: 85,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Sensor interface and display logic"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1009", // Temperature Sensor
        quantityNeeded: 1,
        notes: "Temperature compensation"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2014", // Power Supply Unit
        quantityNeeded: 1,
        notes: "Battery powered"
      }
    ]
  },
  {
    name: "Smart Plant Watering System",
    price: 54.99,
    currency: "USD",
    description: "Automatically waters plants using motion and environmental sensors.",
    category: "Gardening",
    rating: 4.5,
    supply: 60,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Controls timing and logic"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1009", // Temperature Sensor
        quantityNeeded: 1,
        notes: "Environmental feedback"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1010", // Motion Sensor
        quantityNeeded: 1,
        notes: "Detects movement near plants"
      }
    ]
  },
  {
    name: "DIY RC Boat Kit",
    price: 79.99,
    currency: "USD",
    description: "Remote-controlled boat kit with high torque motor and control board.",
    category: "Toys",
    rating: 4.1,
    supply: 70,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2013", // Electric Motor
        quantityNeeded: 1,
        notes: "Drives the propeller"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Receives signals"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2014", // Power Supply Unit
        quantityNeeded: 1,
        notes: "Powers entire system"
      }
    ]
  },
  {
    name: "Motion-Triggered Alarm System",
    price: 45.99,
    currency: "USD",
    description: "Security alarm activated by motion sensor input.",
    category: "Security",
    rating: 4.0,
    supply: 150,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "RM-1010", // Motion Sensor
        quantityNeeded: 1,
        notes: "Main trigger"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Controls buzzer/alert"
      }
    ]
  },
  {
    name: "Automated Pet Feeder",
    price: 99.99,
    currency: "USD",
    description: "Programmable feeding device for pets, controllable remotely.",
    category: "Pet Supplies",
    rating: 4.6,
    supply: 55,
    assemblyRequired: true,
    components: [
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2016", // Controller Board (ESP32)
        quantityNeeded: 1,
        notes: "Handles remote signals and timing"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2013", // Electric Motor
        quantityNeeded: 1,
        notes: "Rotates dispenser"
      },
      {
        stockRef: new ObjectId(),
        stockItem: "CP-2014", // Power Supply Unit
        quantityNeeded: 1,
        notes: "Powers the feeder"
      }
    ]
  },                      
];

export const dataUsers = [
  {
    name: "Jane Lorence",
    email: "jane.lorence@prodm.com",
    password: "jane1234",
    city: "Montreal",
    state: "QC",
    country: "CA",
    phoneNumber: "+1 239 507 4781",
    tasks: [],
    role: "unauthorized",
    permission: "products",
  },
  {
    name: "Chris Jacobs",
    email: "chris.jacobs@prodm.com",
    password: "chris1234",
    city: "New York",
    state: "NY",
    country: "USA",
    phoneNumber: "+1 239 507 4781",
    tasks: [],
    role: "unauthorized",
    permission: "location",
  },
  {
    name: "John Doe",
    email: "john.doe@prodm.com",
    password: "john1234",
    city: "New York",
    state: "NY",
    country: "USA",
    phoneNumber: "+1 234 567 8901",
    tasks: [],
    role: "worker",
    permission: "location",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@prodm.com",
    password: "jane1234",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    phoneNumber: "+1 234 567 8902",
    tasks: [],
    role: "worker",
    permission: "location",
  },
  {
    name: "Sam Wayne",
    email: "sam.wayne@prodm.com",
    password: "sam1234",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    phoneNumber: "+1 234 567 9087",
    tasks: [],
    role: "worker",
    permission: "location",
  },
  {
    name: "Anthony Lenny",
    email: "anthony.lenny@prodm.com",
    password: "anthony1234",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    phoneNumber: "+1 950 170 0037",
    tasks: [],
    role: "worker",
    permission: "location",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@prodm.com",
    password: "alice1234",
    city: "Chicago",
    state: "IL",
    country: "USA",
    phoneNumber: "+1 234 567 8903",
    tasks: [],
    role: "manager",
    permission: "management",
  },
  {
    name: "Bob Brown",
    email: "bob.brown@prodm.com",
    password: "bob1234",
    city: "Houston",
    state: "TX",
    country: "USA",
    phoneNumber: "+1 234 567 8904",
    tasks: [],
    role: "worker",
    permission: "products",
  },
  {
    name: "Charlie Davis",
    email: "charlie.davis@prodm.com",
    password: "charlie1234",
    city: "Miami",
    state: "FL",
    country: "USA",
    phoneNumber: "+1 234 567 8905",
    tasks: [],
    role: "manager",
    permission: "stocks",
  },
  {
    name: "David Harris",
    email: "david.harris@prodm.com",
    password: "david1234",
    city: "Dallas",
    state: "TX",
    country: "USA",
    phoneNumber: "+1 234 567 8906",
    tasks: [],
    role: "worker",
    permission: "location",
  },
  {
    name: "Eva Martinez",
    email: "eva.martinez@prodm.com",
    password: "eva1234",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    phoneNumber: "+1 234 567 8907",
    tasks: [],
    role: "manager",
    permission: "dashboard",
  },
  {
    name: "Frank White",
    email: "frank.white@prodm.com",
    password: "frank1234",
    city: "Phoenix",
    state: "AZ",
    country: "USA",
    phoneNumber: "+1 234 567 8908",
    tasks: [],
    role: "worker",
    permission: "management",
  },
  {
    name: "Grace King",
    email: "grace.king@prodm.com",
    password: "grace1234",
    city: "Boston",
    state: "MA",
    country: "USA",
    phoneNumber: "+1 234 567 8909",
    tasks: [],
    role: "worker",
    permission: "stocks",
  },
  {
    name: "Johnny Miller",
    email: "johnny.miller@prodm.com",
    password: "johnny1234",
    city: "Montreal",
    state: "QC",
    country: "CA",
    phoneNumber: "+1 514 123 4567",
    tasks: [],
    role: "worker",
    permission: "products",
  },
  {
    name: "Administrator",
    email: "admin@prodm.com",
    password: "admin",
    city: "Admin City",
    state: "Admin State",
    country: "Admin Country",
    phoneNumber: "+1 234 567 8910",
    tasks: [],
    role: "admin",
    permission: "management",
  }
]

export const dataSales = [
  {
    productName: "Laptop",
    productId: "607c1f77bcf86cd799439011",
    price: 799.99,
    quantity: 2,
    saleDate: "2025-04-01T10:00:00Z",
  },
  {
    productName: "Washing Machine",
    productId: "607c1f77bcf86cd799439012",
    price: 499.99,
    quantity: 1,
    saleDate: "2025-04-02T11:00:00Z",
  },
  {
    productName: "Headphones",
    productId: "607c1f77bcf86cd799439013",
    price: 129.99,
    quantity: 5,
    saleDate: "2025-04-03T12:30:00Z",
  },
  {
    productName: "Smartphone",
    productId: "607c1f77bcf86cd799439014",
    price: 699.99,
    quantity: 3,
    saleDate: "2025-04-04T13:45:00Z",
  },
  {
    productName: "Bluetooth Speaker",
    productId: "607c1f77bcf86cd799439015",
    price: 59.99,
    quantity: 10,
    saleDate: "2025-04-05T14:15:00Z",
  },
  {
    productName: "Smartwatch",
    productId: "607c1f77bcf86cd799439016",
    price: 199.99,
    quantity: 7,
    saleDate: "2025-04-06T15:00:00Z",
  },
  {
    productName: "TV",
    productId: "607c1f77bcf86cd799439017",
    price: 499.99,
    quantity: 1,
    saleDate: "2025-04-07T16:20:00Z",
  },
  {
    productName: "Digital Camera",
    productId: "607c1f77bcf86cd799439018",
    price: 399.99,
    quantity: 4,
    saleDate: "2025-04-08T17:00:00Z",
  },
  {
    productName: "Tablet",
    productId: "607c1f77bcf86cd799439019",
    price: 299.99,
    quantity: 8,
    saleDate: "2025-04-09T18:10:00Z",
  },
  {
    productName: "Game Console",
    productId: "607c1f77bcf86cd799439020",
    price: 399.99,
    quantity: 2,
    saleDate: "2025-04-10T19:30:00Z",
  }
]
