const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Get entity name from command line arguments
const entityName = process.argv[2];

if (!entityName) {
  console.log(chalk.red('❌ Please provide an entity name.'));
  console.log(chalk.blue('👉 Usage: npm run make-entity EntityName'));
  process.exit(1);
}

// Convert entity name for different cases
const entityLower = entityName.toLowerCase();
const entityUpper = entityName.charAt(0).toUpperCase() + entityName.slice(1);

// Define file paths
const modelPath = path.join(__dirname, `../models/${entityUpper}.js`);
const controllerPath = path.join(__dirname, `../controllers/${entityLower}Controller.js`);
const routesPath = path.join(__dirname, `../routes/${entityLower}Routes.js`);

// MODEL FILE
const modelContent = `// models/${entityUpper}.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ${entityUpper} = sequelize.define(
  '${entityUpper}',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    group_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: '${entityLower}s',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

module.exports = ${entityUpper};
`;

// CONTROLLER FILE
const controllerContent = `// controllers/${entityLower}.js

const { ${entityUpper} } = require('../models/associations');

// Create a new ${entityUpper}
exports.create${entityUpper} = async (req, res) => {
  try {
    const { name, description } = req.body;
    const new${entityUpper} = await ${entityUpper}.create({ name, description });
    res.status(201).json({ message: '${entityUpper} created successfully', ${entityLower}: new${entityUpper} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating ${entityLower}' });
  }
};

// Get all ${entityUpper}s
exports.get${entityUpper}s = async (req, res) => {
  try {
    const ${entityLower}s = await ${entityUpper}.findAll();
    res.status(200).json(${entityLower}s);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching ${entityLower}s' });
  }
};

// Get ${entityUpper} by ID
exports.get${entityUpper}ById = async (req, res) => {
  try {
    const id = req.params.id;
    const ${entityLower} = await ${entityUpper}.findByPk(id);

    if (!${entityLower}) {
      return res.status(404).json({ message: '${entityUpper} not found' });
    }

    res.status(200).json(${entityLower});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching ${entityLower}' });
  }
};

// Update ${entityUpper}
exports.update${entityUpper} = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    
    const ${entityLower} = await ${entityUpper}.findByPk(id);
    if (!${entityLower}) {
      return res.status(404).json({ message: '${entityUpper} not found' });
    }

    await ${entityLower}.update({ name, description });
    res.status(200).json({ message: '${entityUpper} updated successfully', ${entityLower} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating ${entityLower}' });
  }
};

// Delete ${entityUpper}
exports.delete${entityUpper} = async (req, res) => {
  try {
    const id = req.params.id;
    const ${entityLower} = await ${entityUpper}.findByPk(id);

    if (!${entityLower}) {
      return res.status(404).json({ message: '${entityUpper} not found' });
    }

    await ${entityLower}.destroy();
    res.status(200).json({ message: '${entityUpper} deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting ${entityLower}' });
  }
};
`;

// ROUTES FILE
const routesContent = `// routes/${entityLower}.js

const express = require('express');
const router = express.Router();
const ${entityLower}Controller = require('../controllers/${entityLower}Controller');

router.post('/${entityLower}s', ${entityLower}Controller.create${entityUpper});
router.get('/${entityLower}s', ${entityLower}Controller.get${entityUpper}s);
router.get('/${entityLower}s/:id', ${entityLower}Controller.get${entityUpper}ById);
router.put('/${entityLower}s/:id', ${entityLower}Controller.update${entityUpper});
router.delete('/${entityLower}s/:id', ${entityLower}Controller.delete${entityUpper});

module.exports = router;
`;

// Function to create files
const createFile = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow(`⚠️ File already exists: ${filePath}`));
  } else {
    fs.writeFileSync(filePath, content);
    console.log(chalk.green(`✅ Created: ${filePath}`));
  }
};

// Create model, controller, and routes files
createFile(modelPath, modelContent);
createFile(controllerPath, controllerContent);
createFile(routesPath, routesContent);

console.log(chalk.blue('\n🚀 Entity generation complete!'));
console.log(chalk.magenta(`📌 Model: models/${entityUpper}.js`));
console.log(chalk.magenta(`📌 Controller: controllers/${entityLower}Controller.js`));
console.log(chalk.magenta(`📌 Routes: routes/${entityLower}Routes.js`));
console.log(chalk.green('\n⚠️ Please add now your entity into:'));
console.log(chalk.green('\n-> app.js: import routes and routes use sections (see comments)'));
console.log(chalk.green('-> associations.js: add your entity in module exports (of course also import model!)'));
console.log(chalk.green('\n\n✅ You can now use this entity in your project !! 🎉 \n(Do not forget to edit your entity routes file for swagger annotations ;)'));
