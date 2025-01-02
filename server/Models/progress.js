 import mongoose from 'mongoose';

// const progressSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true, index: true }, // Indexed for faster lookups
//     levels: [
//       {
//         level: { type: Number, required: true },
//         modules: [
//           {
//             value: { type: Number, required: true, default: 0, min: 0, max: 100 },
//             completed: { type: Boolean, required: true, default: false },
//           },
//         ],
//         completed: { type: Boolean, default: false }, // Optional field for level completion
//       },
//     ],
//   },
//   { timestamps: true } // Adds createdAt and updatedAt fields
// );

// // Pre-save hook to check level completion
// progressSchema.pre('save', function (next) {
//   this.levels.forEach(level => {
//     if (level.modules) {
//       level.completed = level.modules.every(module => module.completed);
//     } else {
//       level.completed = false; // In case there are no modules, mark level as not completed
//     }
//   });
//   next();
// });

// // Custom method to find level progress
// progressSchema.methods.findLevelProgress = function (levelNumber) {
//   return this.levels.find(level => level.level === levelNumber);
// };

// // Static method to find progress by userId
// progressSchema.statics.findByUserId = async function (userId) {
//   return this.findOne({ userId });
// };

// const Progress = mongoose.model('Progress', progressSchema);

// export default Progress;


const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User collection
      ref: 'users',
      required: true,
      index: true,
    },
    levels: {
      type: [
        {
          level: { type: Number, required: true },
          modules: [
            {
              moduleId: { type: Number, required: true },
              value: { type: Number, required: true, default: 0, min: 0, max: 100 },
              completed: { type: Boolean, required: true, default: false },
            },
          ],
          completed: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    totalProgress: { type: Number, default: 0, min: 0, max: 100 },
    history: [
      {
        date: { type: Date, default: Date.now },
        changes: String,
      },
    ],
  },
  { timestamps: true }
);



// Create a compound index to ensure that each user can have only one level for each level number
progressSchema.index({ userId: 1, 'levels.level': 1 }, { unique: true });

// Pre-save hook to check level completion and update total progress
progressSchema.pre('save', function (next) {
  this.levels.forEach(level => {
    if (level.modules && level.modules.length > 0) {
      level.completed = level.modules.every(module => module.completed);
    } else {
      level.completed = false; // Mark as not completed if no modules exist
    }
  });

  // Calculate total progress as the average of all module values across levels
  const totalModules = this.levels.reduce((count, level) => count + (level.modules?.length || 0), 0);
  const totalValue = this.levels.reduce(
    (sum, level) =>
      sum + level.modules.reduce((moduleSum, module) => moduleSum + module.value, 0),
    0
  );

  this.totalProgress = totalModules > 0 ? totalValue / totalModules : 0;

  next();
});

// Custom method to find level progress
progressSchema.methods.findLevelProgress = function (levelNumber) {
  return this.levels.find(level => level.level === levelNumber);
};

// Static method to find progress by userId
progressSchema.statics.findByUserId = async function (userId) {
  return this.findOne({ userId }).populate('userId'); // Populate user details
};

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
