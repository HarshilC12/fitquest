document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-plan');
    const userGoalsInput = document.getElementById('user-goals');
    const planResult = document.getElementById('plan-result');
    const nutritionContainer = document.getElementById('nutrition-container');

    generateBtn.addEventListener('click', function() {
        const userGoals = userGoalsInput.value.trim();
        
        if (!userGoals) {
            alert('Please enter your nutrition goals');
            return;
        }

        // Show loading state
        nutritionContainer.style.display = 'block';
        planResult.innerHTML = '<p class="loading">Generating your personalized nutrition plan...</p>';
        
        // Simulate AI processing
        setTimeout(() => {
            generateNutritionPlan(userGoals);
        }, 1500);
    });

    function generateNutritionPlan(goals) {
        // Analyze user input for key components
        const goalsLower = goals.toLowerCase();
        const isWeightLoss = goalsLower.includes('loss') || goalsLower.includes('weight') || goalsLower.includes('lean') || goalsLower.includes('slim');
        const isMuscleGain = goalsLower.includes('muscle') || goalsLower.includes('gain') || goalsLower.includes('bulk') || goalsLower.includes('strength');
        const isVegan = goalsLower.includes('vegan') || goalsLower.includes('plant');
        const isKeto = goalsLower.includes('keto') || goalsLower.includes('low carb');
        const isAthlete = goalsLower.includes('athlet') || goalsLower.includes('train') || goalsLower.includes('performance');
        const isHealth = goalsLower.includes('health') || goalsLower.includes('balance') || goalsLower.includes('wellness');
        const isDiabetic = goalsLower.includes('diabet') || goalsLower.includes('blood sugar');
        const isEnergy = goalsLower.includes('energy') || goalsLower.includes('vitality') || goalsLower.includes('fatigue');
        
        // Base meal templates
        const mealTemplates = {
            proteinSources: {
                regular: ["chicken breast", "turkey", "lean beef", "salmon", "tuna", "eggs"],
                vegan: ["tofu", "tempeh", "lentils", "chickpeas", "black beans", "edamame"],
                keto: ["salmon", "mackerel", "ribeye steak", "bacon", "eggs", "chicken thighs"]
            },
            carbSources: {
                regular: ["brown rice", "quinoa", "sweet potato", "whole wheat pasta", "oatmeal"],
                lowCarb: ["cauliflower rice", "zucchini noodles", "spaghetti squash", "shirataki noodles"],
                diabetic: ["quinoa", "barley", "bulgur", "wild rice", "steel-cut oats"]
            },
            fatSources: {
                regular: ["avocado", "olive oil", "nuts", "seeds"],
                keto: ["avocado", "coconut oil", "olive oil", "nuts", "cheese", "heavy cream"]
            },
            vegetables: ["broccoli", "spinach", "kale", "bell peppers", "carrots", "brussels sprouts", "asparagus"],
            fruits: ["berries", "apples", "oranges", "bananas", "pears"]
        };

        // Generate customized plan based on analysis
        let plan = {
            title: "",
            description: "",
            meals: {},
            tips: []
        };

        // Determine plan focus
        if (isWeightLoss) {
            plan.title = "Weight Management Plan";
            plan.description = "This plan focuses on nutrient-dense foods with moderate calorie reduction for sustainable weight loss.";
            plan.tips.push(
                "Aim for a 300-500 calorie deficit daily",
                "Include protein with every meal to maintain muscle mass",
                "Choose high-fiber foods to stay full longer"
            );
        } else if (isMuscleGain) {
            plan.title = "Muscle Building Plan";
            plan.description = "Higher protein and calorie intake to support muscle growth and recovery.";
            plan.tips.push(
                "Consume 1.6-2.2g of protein per kg of body weight",
                "Time carbohydrates around workouts for energy and recovery",
                "Ensure adequate calorie surplus (300-500 calories above maintenance)"
            );
        } else if (isHealth) {
            plan.title = "Balanced Nutrition Plan";
            plan.description = "A varied, nutrient-rich approach for overall health and wellbeing.";
            plan.tips.push(
                "Eat a rainbow of fruits and vegetables daily",
                "Include healthy fats with each meal",
                "Stay hydrated with water and herbal teas"
            );
        } else {
            plan.title = "Personalized Nutrition Plan";
            plan.description = "Customized based on your specific goals and preferences.";
        }

        // Apply dietary preferences
        if (isVegan) {
            plan.title += " (Vegan)";
            plan.description += " Completely plant-based using high-quality vegan protein sources.";
            plan.tips.push(
                "Combine different plant proteins throughout the day",
                "Consider supplementing with B12 and omega-3s",
                "Include iron-rich foods with vitamin C for better absorption"
            );
        }

        if (isKeto) {
            plan.title += " (Keto)";
            plan.description += " Very low carbohydrate, high fat approach to promote ketosis.";
            plan.tips.push(
                "Limit carbs to 20-50g net carbs per day",
                "Monitor electrolyte intake",
                "Test ketone levels if desired"
            );
        }

        if (isDiabetic) {
            plan.title += " (Blood Sugar Friendly)";
            plan.description += " Focuses on low glycemic impact foods and balanced meals.";
            plan.tips.push(
                "Pair carbs with protein and fat to slow glucose absorption",
                "Monitor portion sizes of carbohydrate foods",
                "Choose high-fiber carbohydrates"
            );
        }

        if (isAthlete) {
            plan.title += " (Athlete)";
            plan.description += " Optimized for performance and recovery with proper nutrient timing.";
            plan.tips.push(
                "Time carbohydrates around training sessions",
                "Include 20-40g protein post-workout",
                "Stay well hydrated with electrolytes during intense training"
            );
        }

        if (isEnergy) {
            plan.title += " (Energy Boost)";
            plan.description += " Focuses on foods that provide sustained energy throughout the day.";
            plan.tips.push(
                "Eat small, frequent meals to maintain energy",
                "Include complex carbohydrates with each meal",
                "Limit processed sugars that cause energy crashes"
            );
        }

        // Generate meals based on preferences
        const proteinSource = isVegan ? mealTemplates.proteinSources.vegan : 
                                isKeto ? mealTemplates.proteinSources.keto : 
                                mealTemplates.proteinSources.regular;
        
        const carbSource = isKeto || isWeightLoss ? mealTemplates.carbSources.lowCarb : 
                          isDiabetic ? mealTemplates.carbSources.diabetic : 
                          mealTemplates.carbSources.regular;
        
        const fatSource = isKeto ? mealTemplates.fatSources.keto : mealTemplates.fatSources.regular;

        // Helper function to randomize selections
        function getRandom(items) {
            return items[Math.floor(Math.random() * items.length)];
        }

        // Generate meal suggestions
        plan.meals = {
            breakfast: isKeto ? 
                `Scrambled eggs with spinach and avocado` : 
                isVegan ?
                `Tofu scramble with ${getRandom(mealTemplates.vegetables)} and whole grain toast` :
                `${getRandom(mealTemplates.fruits)} smoothie with protein powder and ${getRandom(['almond butter', 'chia seeds', 'flaxseeds'])}`,
            
            lunch: isKeto ?
                `Grilled ${getRandom(proteinSource)} with ${getRandom(['cauliflower mash', 'zucchini noodles'])} and ${getRandom(mealTemplates.vegetables)}` :
                `${getRandom(proteinSource)} with ${getRandom(carbSource)} and ${getRandom(mealTemplates.vegetables)} salad`,
            
            dinner: isVegan ?
                `${getRandom(mealTemplates.proteinSources.vegan)} curry with ${getRandom(carbSource)} and steamed greens` :
                `Baked ${getRandom(proteinSource)} with roasted ${getRandom(mealTemplates.vegetables)} and ${isKeto ? 'cauliflower rice' : getRandom(carbSource)}`,
            
            snacks: isWeightLoss ?
                `${getRandom(mealTemplates.fruits)} with ${isVegan ? 'almond butter' : 'Greek yogurt'}` :
                isKeto ?
                `Cheese with nuts or keto fat bombs` :
                `Handful of nuts and seeds or protein shake`
        };

        // Add additional tips based on analysis
        if (goalsLower.includes('gluten')) {
            plan.tips.push("Choose gluten-free grains like quinoa, rice, and buckwheat");
        }
        if (goalsLower.includes('dairy')) {
            plan.tips.push("Use dairy alternatives like almond milk or coconut yogurt");
        }
        if (goalsLower.includes('digest') || goalsLower.includes('gut')) {
            plan.tips.push("Include probiotic-rich foods and plenty of fiber for gut health");
        }

        // Generate HTML for the plan
        let html = `
            <div class="plan-header">
                <h2>${plan.title}</h2>
                <p>${plan.description}</p>
                <p class="user-goals"><strong>Your goals:</strong> ${goals}</p>
            </div>
            
            <div class="meal-plan">
                <h3>Sample Daily Meals</h3>
                <div class="meal">
                    <h4>Breakfast</h4>
                    <p>${plan.meals.breakfast}</p>
                </div>
                <div class="meal">
                    <h4>Lunch</h4>
                    <p>${plan.meals.lunch}</p>
                </div>
                <div class="meal">
                    <h4>Dinner</h4>
                    <p>${plan.meals.dinner}</p>
                </div>
                <div class="meal">
                    <h4>Snacks</h4>
                    <p>${plan.meals.snacks}</p>
                </div>
            </div>
            
            <div class="tips">
                <h3>Personalized Nutrition Tips</h3>
                <ul>
                    ${plan.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <div class="variations">
                <h3>Meal Variation Ideas</h3>
                <p>Try rotating these options throughout your week:</p>
                <ul>
                    <li><strong>Proteins:</strong> ${proteinSource.join(', ')}</li>
                    <li><strong>Carbs:</strong> ${carbSource.join(', ')}</li>
                    <li><strong>Vegetables:</strong> ${mealTemplates.vegetables.join(', ')}</li>
                </ul>
            </div>
            
            <p class="disclaimer">Note: This is a generated suggestion. For medical conditions or specific dietary needs, please consult a registered dietitian or healthcare provider.</p>
        `;
        planResult.innerHTML = html;
    }
});