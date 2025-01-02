import dotenv from 'dotenv';
dotenv.config();  // Load .env file

import mongoose from 'mongoose';
import Level from './Question.js';
import { DailyQuestion } from './dailyNewQuestion.js';

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("mongodb connected...");
})
.catch((error) => {
    console.log("mongodb not connected: ", error);
});


// const sampleData = {
    
//         level: 1,
//         fluency: "Beginner",
//         modules: [
//           {
//             moduleNumber: 1,
//             moduleName: "Everyday Essentials",
//             questions: [
//               {
//                 question: "What would you say to greet someone in the morning?",
//                 options: [
//                   { option: "Good Night" },
//                   { option: "Good Afternoon" },
//                   { option: "Good Morning" },
//                   { option: "Hello" }
//                 ],
//                 answer: "Good Morning",
//                 hint: "It’s something you say when you wake up."
//               },
//               {
//                 question: "You introduce yourself by saying: 'Hello, my ___ is John.'",
//                 options: [
//                   { option: "Job" },
//                   { option: "Name" },
//                   { option: "Address" },
//                   { option: "Hobby" }
//                 ],
//                 answer: "Name",
//                 hint: "It’s a word people use to identify you."
//               }
//             ]
//           },
//           {
//             moduleNumber: 2,
//             moduleName: "Food and Beverages",
//             questions: [
//               {
//                 question: "Which of these is a fruit?",
//                 options: [
//                   { option: "Carrot" },
//                   { option: "Apple" },
//                   { option: "Cabbage" },
//                   { option: "Potato" }
//                 ],
//                 answer: "Apple",
//                 hint: "It’s red, sweet, and crunchy."
//               },
//               {
//                 question: "What is a common drink served at breakfast?",
//                 options: [
//                   { option: "Juice" },
//                   { option: "Soup" },
//                   { option: "Soda" },
//                   { option: "Milkshake" }
//                 ],
//                 answer: "Juice",
//                 hint: "It’s often made from fruits."
//               }
//             ]
//           },
//           {
//             moduleNumber: 3,
//             moduleName: "Colors, Shapes, and Sizes",
//             questions: [
//               {
//                 question: "What color is the sky on a clear day?",
//                 options: [
//                   { option: "Green" },
//                   { option: "Blue" },
//                   { option: "Red" },
//                   { option: "Yellow" }
//                 ],
//                 answer: "Blue",
//                 hint: "It’s the same color as the ocean."
//               },
//               {
//                 question: "A ripe banana is ___.",
//                 options: [
//                   { option: "Yellow" },
//                   { option: "Purple" },
//                   { option: "Orange" },
//                   { option: "Brown" }
//                 ],
//                 answer: "Yellow",
//                 hint: "It’s a bright, cheerful color."
//               }
//             ]
//           }
//         ]
//       };



//     const sampleData =   {
//         level: 2,
//         fluency: "Elementary",
//         modules: [
//           {
//             moduleNumber: 1,
//             moduleName: "Home and Neighborhood",
//             questions: [
//               {
//                 question: "What do you call the place where you sleep at night?",
//                 options: [
//                   { option: "Kitchen" },
//                   { option: "Living Room" },
//                   { option: "Bedroom" },
//                   { option: "Bathroom" }
//                 ],
//                 answer: "Bedroom",
//                 hint: "It's where you rest and sleep."
//               },
//               {
//                 question: "A place in your neighborhood where you can buy groceries is a ___.",
//                 options: [
//                   { option: "Market" },
//                   { option: "Library" },
//                   { option: "Cinema" },
//                   { option: "Park" }
//                 ],
//                 answer: "Market",
//                 hint: "It’s a place where you buy food and other essentials."
//               }
//             ]
//           },
//           {
//             moduleNumber: 2,
//             moduleName: "Travel and Transportation",
//             questions: [
//               {
//                 question: "What is a common way to travel on the ground?",
//                 options: [
//                   { option: "Plane" },
//                   { option: "Bus" },
//                   { option: "Boat" },
//                   { option: "Helicopter" }
//                 ],
//                 answer: "Bus",
//                 hint: "It is a large vehicle that carries many people."
//               },
//               {
//                 question: "A small vehicle used by people to drive from one place to another is called a ___.",
//                 options: [
//                   { option: "Car" },
//                   { option: "Bus" },
//                   { option: "Train" },
//                   { option: "Bicycle" }
//                 ],
//                 answer: "Car",
//                 hint: "It’s a personal vehicle, typically with four wheels."
//               }
//             ]
//           }
//         ]
//       };
   
  


//   const addSampleData = async () => {
//     try {
//         // Create a new Level document and insert sample data
//         const level = new Level(sampleData);
//         await level.save();
//         console.log('Sample data added successfully');
//     } catch (error) {
//         console.error('Error adding sample data:', error);
//     }
// };

// // Run the function to add sample data
// addSampleData();


// const addMultipleQuestions = async () => {
//     const questions = [
//       {
//         question: 'What is the capital of Japan?',
//         correctAnswer: 'Tokyo',
//         incorrectAnswers: ['Seoul', 'Beijing', 'Bangkok'],
//         date: new Date('2025-01-02T00:00:00Z'),
//         expiresAt: new Date('2025-01-03T00:00:00Z'),
//       },
//       {
//         question: 'What is the largest planet in our solar system?',
//         correctAnswer: 'Jupiter',
//         incorrectAnswers: ['Earth', 'Mars', 'Saturn'],
//         date: new Date('2025-01-03T00:00:00Z'),
//         expiresAt: new Date('2025-01-04T00:00:00Z'),
//       },
//       {
//         question: 'Who developed the theory of relativity?',
//         correctAnswer: 'Albert Einstein',
//         incorrectAnswers: ['Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'],
//         date: new Date('2025-01-04T00:00:00Z'),
//         expiresAt: new Date('2025-01-05T00:00:00Z'),
//       },
//     ];
  
//     try {
//       await DailyQuestion.insertMany(questions);
//       console.log('Questions added successfully!');
//     } catch (error) {
//       console.error('Error adding multiple questions:', error);
//     }
//   };
  
//   addMultipleQuestions();
  