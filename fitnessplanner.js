'use strict'
document.getElementById('fitnessForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get user inputs
    const fitnessLevel = document.getElementById('fitnessLevel').value;
    const goals = document.getElementById('goals').value;
    const daysPerWeek = parseInt(document.getElementById('daysPerWeek').value);
    const equipment = document.getElementById('equipment').value;
    const workoutLength = parseInt(document.getElementById('workoutLength').value);
    
    // Show loading state
    const planResult = document.getElementById('planResult');
    const planContent = document.getElementById('planContent');
    planResult.style.display = 'block';
    planContent.innerHTML = '<p class="loading">Creating your personalized fitness plan... This may take a moment.</p>';
    
    // Simulate AI processing delay
    setTimeout(() => {
        // Generate the plan
        const plan = generateFitnessPlan(fitnessLevel, goals, daysPerWeek, equipment, workoutLength);
        
        // Display the plan
        planContent.innerHTML = plan;
        
        // Scroll to results
        planResult.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

function generateFitnessPlan(level, goal, days, equipment, length) {
    // Exercise database
    const exercises = {
        // Cardio exercises
        cardio: [
            { name: "Brisk Walking", intensity: "low", time: "10-30 min" },
            { name: "Jogging/Running", intensity: "moderate", time: "10-20 min" },
            { name: "Cycling", intensity: "moderate", time: "15-30 min" },
            { name: "Jump Rope", intensity: "high", time: "5-15 min" },
            { name: "Stair Climbing", intensity: "moderate", time: "10-20 min" }
        ],
        
        // Bodyweight exercises
        bodyweight: [
            { name: "Push-ups", sets: "3-4", reps: "8-15", rest: "30-60s" },
            { name: "Bodyweight Squats", sets: "3-4", reps: "12-20", rest: "30-60s" },
            { name: "Lunges", sets: "3", reps: "10-12 each leg", rest: "30-60s" },
            { name: "Plank", sets: "3", reps: "30-60s hold", rest: "30s" },
            { name: "Glute Bridges", sets: "3", reps: "12-15", rest: "30s" }
        ],
        
        // Equipment exercises
        with_equipment: [
            { name: "Dumbbell Shoulder Press", sets: "3-4", reps: "8-12", rest: "60s" },
            { name: "Dumbbell Rows", sets: "3", reps: "10-12", rest: "60s" },
            { name: "Resistance Band Pull-Aparts", sets: "3", reps: "12-15", rest: "30s" },
            { name: "Dumbbell Deadlifts", sets: "3", reps: "8-10", rest: "60-90s" }
        ],
        
        // Gym equipment exercises
        gym_equipment: [
            { name: "Lat Pulldown", sets: "3-4", reps: "8-12", rest: "60s" },
            { name: "Leg Press", sets: "3", reps: "10-12", rest: "60-90s" },
            { name: "Chest Press Machine", sets: "3", reps: "8-12", rest: "60s" },
            { name: "Seated Row Machine", sets: "3", reps: "10-12", rest: "60s" }
        ],
        
        // Core exercises
        core: [
            { name: "Bicycle Crunches", sets: "3", reps: "12-15 each side", rest: "30s" },
            { name: "Russian Twists", sets: "3", reps: "12-15 each side", rest: "30s" },
            { name: "Leg Raises", sets: "3", reps: "10-12", rest: "30s" },
            { name: "Mountain Climbers", sets: "3", reps: "30-45s", rest: "30s" }
        ]
    };
    
    // Determine workout focus based on goal
    let workoutFocus = [];
    switch(goal) {
        case "weight_loss":
            workoutFocus = ["cardio", "full_body", "hiit"];
            break;
        case "muscle_gain":
            workoutFocus = ["strength", "hypertrophy", "progressive"];
            break;
        case "endurance":
            workoutFocus = ["cardio", "circuit", "stamina"];
            break;
        default:
            workoutFocus = ["balanced", "full_body", "variety"];
    }
    
    // Generate workout days
    let workoutPlan = "";
    
    // Add plan introduction
    workoutPlan += `<h3>Your ${level} ${goal.replace("_", " ")} Plan</h3>`;
    workoutPlan += `<p>This ${days}-day plan is designed for ${level} level focusing on ${goal.replace("_", " ")} with ${equipment.replace("_", " ")} equipment. Each workout lasts approximately ${length} minutes.</p>`;
    workoutPlan += `<p><strong>Instructions:</strong> Warm up for 5-10 minutes before each workout. Stay hydrated and listen to your body.</p>`;
    
    // Generate each day's workout
    for (let day = 1; day <= days; day++) {
        workoutPlan += `<div class="workout-day"><div class="day-title">Day ${day}: ${getDayFocus(day, days, goal)}</div>`;
        
        // Add warmup
        workoutPlan += `<div class="exercise"><span class="exercise-name">Warmup:</span> 
            <div class="exercise-details">5-10 minutes of dynamic stretching and light cardio (jumping jacks, high knees, arm circles)</div></div>`;
        
        // Add main exercises
        const dayExercises = getExercisesForDay(day, days, goal, level, equipment, exercises);
        dayExercises.forEach(ex => {
            workoutPlan += `<div class="exercise"><span class="exercise-name">${ex.name}:</span> 
                <div class="exercise-details">${ex.sets || ex.time} ${ex.reps ? `× ${ex.reps}` : ''} ${ex.rest ? `(Rest: ${ex.rest})` : ''}</div></div>`;
        });
        
        // Add cooldown
        workoutPlan += `<div class="exercise"><span class="exercise-name">Cooldown:</span> 
            <div class="exercise-details">5 minutes of static stretching focusing on worked muscles</div></div>`;
        
        workoutPlan += `</div>`;
    }
    
    // Add general tips
    workoutPlan += `<div class="workout-day"><h4>Additional Tips</h4>`;
    workoutPlan += `<ul>`;
    workoutPlan += `<li>${getRandomTip(goal)}</li>`;
    workoutPlan += `<li>${getRandomTip(level)}</li>`;
    workoutPlan += `<li>${getRandomTip("recovery")}</li>`;
    workoutPlan += `</ul></div>`;
    
    return workoutPlan;
}

function getDayFocus(day, totalDays, goal) {
    const focuses = {
        "weight_loss": ["Cardio Focus", "Full Body Circuit", "HIIT Day", "Active Recovery"],
        "muscle_gain": ["Upper Body", "Lower Body", "Push Focus", "Pull Focus", "Leg Day"],
        "endurance": ["Long Cardio", "Interval Training", "Circuit Training", "Tempo Work"],
        "general_fitness": ["Total Body", "Strength + Cardio", "Functional Fitness", "Variety Day"]
    };
    
    const goalFocus = focuses[goal] || focuses["general_fitness"];
    return goalFocus[(day-1) % goalFocus.length];
}

function getExercisesForDay(day, totalDays, goal, level, equipment, exerciseDB) {
    let exercises = [];
    const dayFocus = getDayFocus(day, totalDays, goal);
    
    // Determine exercise types based on day focus
    if (dayFocus.includes("Cardio") || dayFocus.includes("HIIT")) {
        // Cardio-focused day
        exercises.push(getRandomExercise(exerciseDB.cardio));
        exercises.push(getRandomExercise(exerciseDB.cardio));
        if (dayFocus.includes("HIIT")) {
            exercises.push({ 
                name: "HIIT Circuit", 
                time: "20-30 minutes", 
                details: "30s work / 30s rest: Jump squats, burpees, mountain climbers, high knees" 
            });
        }
    } else {
        // Strength-focused day
        if (equipment === "none") {
            exercises.push(getRandomExercise(exerciseDB.bodyweight));
            exercises.push(getRandomExercise(exerciseDB.bodyweight));
            exercises.push(getRandomExercise(exerciseDB.core));
        } else if (equipment === "basic") {
            exercises.push(getRandomExercise(exerciseDB.with_equipment));
            exercises.push(getRandomExercise(exerciseDB.bodyweight));
            exercises.push(getRandomExercise(exerciseDB.with_equipment));
        } else {
            exercises.push(getRandomExercise(exerciseDB.gym_equipment));
            exercises.push(getRandomExercise(exerciseDB.gym_equipment));
            exercises.push(getRandomExercise(exerciseDB.with_equipment));
        }
        
        // Add core work to most days
        if (!dayFocus.includes("Leg Day")) {
            exercises.push(getRandomExercise(exerciseDB.core));
        }
    }
    
    // Adjust for fitness level
    exercises = exercises.map(ex => {
        if (level === "beginner") {
            if (ex.sets) ex.sets = ex.sets.replace("3-4", "2-3").replace("3", "2");
            if (ex.reps) ex.reps = ex.reps.replace(/\d+/g, num => Math.floor(parseInt(num) * 0.8));
            if (ex.time) ex.time = ex.time.replace(/\d+/g, num => Math.floor(parseInt(num) * 0.7));
        } else if (level === "advanced") {
            if (ex.sets) ex.sets = ex.sets.replace("3-4", "4-5").replace("3", "4");
            if (ex.reps) ex.reps = ex.reps.replace(/\d+/g, num => Math.floor(parseInt(num) * 1.2));
            if (ex.time) ex.time = ex.time.replace(/\d+/g, num => Math.floor(parseInt(num) * 1.3));
        }
        return ex;
    });
    
    return exercises;
}

function getRandomExercise(exerciseArray) {
    return exerciseArray[Math.floor(Math.random() * exerciseArray.length)];
}

function getRandomTip(type) {
    const tips = {
        "beginner": "Start slow and focus on form rather than intensity.",
        "intermediate": "Challenge yourself by gradually increasing weights or reps each week.",
        "advanced": "Incorporate periodization into your training for continued progress.",
        "weight_loss": "Combine this workout plan with a balanced diet for best results.",
        "muscle_gain": "Ensure you're consuming enough protein to support muscle growth.",
        "endurance": "Track your progress to see improvements in stamina over time.",
        "recovery": "Get adequate sleep and consider active recovery days.",
        "general": "Stay consistent - results come from regular effort over time."
    };
    
    return tips[type] || tips["general"];
}