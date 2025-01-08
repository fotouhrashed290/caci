document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to question 8 input fields (Sample preparation time and analysis time)
    const prepTimeInput = document.getElementById('prepTime');
    const analysisTimeInput = document.getElementById('analysisTime');

    prepTimeInput.addEventListener('input', displayTotalPoints);
    analysisTimeInput.addEventListener('input', displayTotalPoints);

    // Add event listeners for group 3 (questions 3a, 3b, and 3c)
    const question3a = document.querySelector(`select[name="question3a"]`);
    const question3b = document.querySelector(`select[name="question3b"]`);
    const question3c = document.querySelector(`select[name="question3c"]`);

    question3a.addEventListener('change', handleGroup3Change);
    question3b.addEventListener('change', handleGroup3Change);
    question3c.addEventListener('change', handleGroup3Change);

    // Add event listeners for group 4 (questions 4a, 4b, and 4c)
    const question4a = document.querySelector(`select[name="question4a"]`);
    const question4b = document.querySelector(`select[name="question4b"]`);
    const question4c = document.querySelector(`select[name="question4c"]`);

    question4a.addEventListener('change', handleGroup4Change);
    question4b.addEventListener('change', handleGroup4Change);
    question4c.addEventListener('change', handleGroup4Change);

    // Add event listeners for questions 1 to 7
    for (let i = 1; i <= 7; i++) {
        const selectElement = document.querySelector(`select[name="question${i}"]`);
        if (selectElement) {
            selectElement.addEventListener('change', function () {
                const points = parseInt(selectElement.value, 10) || 0;
                updateLayerVisibility(points, i); // Update layer visibility
                displayTotalPoints(); // Recalculate total points
            });
        }
    }
});

function handleGroup3Change() {
    const groupPoints = calculateGroup3Points();
    updateLayerVisibility(groupPoints, 3); // Pass the raw total to update visibility
    displayTotalPoints(); // Recalculate total points
}

function handleGroup4Change() {
    const groupPoints = calculateGroup4Points();
    updateLayerVisibility(groupPoints, 4); // Pass the raw total to update visibility
    displayTotalPoints(); // Recalculate total points
}

function showLayer(layerName, isVisible) {
    const layer = document.querySelector('.' + layerName);
    if (layer) {
        layer.style.visibility = isVisible ? 'visible' : 'hidden';
        layer.setAttribute('data-visible', isVisible ? 'true' : 'false');
    }
}

function updateLayerVisibility(selectedValue, questionNumber) {
    const points = parseInt(selectedValue, 10);

    if (questionNumber >= 1 && questionNumber <= 7) {
        showLayer(`g${questionNumber}`, points >= 3); // green layer for points >= 3
        showLayer(`yy${questionNumber}`, points === 2); // yellow layer for points == 2
        showLayer(`rr${questionNumber}`, points === 1); // red layer for points == 1
    }

    // Special handling for question 3 group (3a, 3b, 3c)
    if (questionNumber === 3) {
        showLayer(`g3`, points >= 9); // green layer for total group points >= 9
        showLayer(`yy3`, points >= 6 && points < 9); // yellow for 6-8 points
        showLayer(`rr3`, points < 6); // red layer for total group points < 6
    }

    // Special handling for question 4 group (4a, 4b, 4c)
    if (questionNumber === 4) {
        showLayer(`g4`, points >= 9); // green layer for total group points >= 9
        showLayer(`yy4`, points >= 6 && points < 9); // yellow for 6-8 points
        showLayer(`rr4`, points < 6); // red layer for total group points < 6
    }
}

function calculateGroup3Points() {
    const question3a = parseInt(document.querySelector(`select[name="question3a"]`).value, 10) || 0;
    const question3b = parseInt(document.querySelector(`select[name="question3b"]`).value, 10) || 0;
    const question3c = parseInt(document.querySelector(`select[name="question3c"]`).value, 10) || 0;

    // Calculate the total (sum of 3a, 3b, and 3c)
    return question3a + question3b + question3c;
}

function calculateGroup4Points() {
    const question4a = parseInt(document.querySelector(`select[name="question4a"]`).value, 10) || 0;
    const question4b = parseInt(document.querySelector(`select[name="question4b"]`).value, 10) || 0;
    const question4c = parseInt(document.querySelector(`select[name="question4c"]`).value, 10) || 0;

    // Calculate the total (sum of 4a, 4b, and 4c)
    return question4a + question4b + question4c;
}

function calculateQuestion8Points() {
    let prepTime = document.getElementById('prepTime').value;
    let analysisTime = document.getElementById('analysisTime').value;

    if (prepTime === '') prepTime = 150;
    if (analysisTime === '') analysisTime = 150;

    const totalMinutes = parseInt(prepTime, 10) + parseInt(analysisTime, 10);

    let question8Points = 0;
    if (totalMinutes <= 5) {
        question8Points = 6;
    } else if (totalMinutes <= 10) {
        question8Points = 5.5;
    } else if (totalMinutes <= 20) {
        question8Points = 5;
    } else if (totalMinutes <= 30) {
        question8Points = 4.5;
    } else if (totalMinutes <= 60) {
        question8Points = 4;
    } else if (totalMinutes <= 90) {
        question8Points = 3.5;
    } else if (totalMinutes <= 120) {
        question8Points = 3;
    } else if (totalMinutes < 180) {
        question8Points = 2.5;
    } else if (totalMinutes <= 300) {
        question8Points = 2;
    } else if (totalMinutes > 300) {
        question8Points = 1;
    } else {
        question8Points = 0;
    }

    return question8Points;
}

function displayTotalPoints() {
    let totalPoints = 0;
    const maxPoints = 27; // Updated maximum score: 15 for Q1, Q2, Q5-Q7 + 3 for Group 3 + 3 for Group 4 + 6 for Q8

    console.log("Calculating total points...");
    
    // Loop through questions 1 to 7
    for (let i = 1; i <= 7; i++) {
        const selectElement = document.querySelector(`select[name="question${i}"]`);
        if (selectElement) {
            const points = parseInt(selectElement.value, 10) || 0;
            console.log(`Question ${i} points:`, points);
            totalPoints += points;
        }
    }

    // Add the average points from group 3 (divide by 3 to scale to max of 3)
    let group3Points = calculateGroup3Points() / 3;
    group3Points = Math.max(0, group3Points); // Ensure no negative values
    console.log("Group 3 Points (scaled):", group3Points);
    totalPoints += group3Points;

    // Add the average points from group 4 (divide by 3 to scale to max of 3)
    let group4Points = calculateGroup4Points() / 3;
    group4Points = Math.max(0, group4Points); // Ensure no negative values
    console.log("Group 4 Points (scaled):", group4Points);
    totalPoints += group4Points;

    // Add the points from question 8 (total minutes)
    let question8Points = calculateQuestion8Points();
    console.log("Question 8 Points:", question8Points);
    totalPoints += question8Points;

    // Ensure totalPoints does not go negative
    totalPoints = Math.max(0, totalPoints);
    console.log("Final Total Points:", totalPoints);

    // Calculate percentage
    const percentage = ((totalPoints / maxPoints) * 100).toFixed(0);

    // Update the score in the points circle
    const pointsCircle = document.getElementById('pointsCircle');
    if (pointsCircle) {
        pointsCircle.textContent = `${percentage}`;
    } else {
        console.error("Element with ID 'pointsCircle' not found!");
    }
}