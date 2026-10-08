function calculateRisk() {
    const communityName =
        document.getElementById("communityName").value.trim();

    const tankCapacity =
        Number(document.getElementById("tankCapacity").value);

    const currentWater =
        Number(document.getElementById("currentWater").value);

    const dailyUsage =
        Number(document.getElementById("dailyUsage").value);

    const expectedInflow =
        Number(document.getElementById("expectedInflow").value);

    const inflowDays =
        Number(document.getElementById("inflowDays").value);

    // Validate input
    if (
        !communityName ||
        tankCapacity <= 0 ||
        currentWater < 0 ||
        dailyUsage <= 0 ||
        expectedInflow < 0 ||
        inflowDays < 0
    ) {
        alert("Please enter valid community water data.");
        return;
    }

    if (currentWater > tankCapacity) {
        alert("Current water cannot be greater than tank capacity.");
        return;
    }

    // Function to simulate water usage
    function simulateWater(usagePerDay) {
        let water = currentWater;
        let shortageInDays = null;

        const MAX_FORECAST_DAYS = 30;

        for (let day = 1; day <= MAX_FORECAST_DAYS; day++) {

            // Daily consumption
            water -= usagePerDay;

            // Expected supply arrives
            if (day === inflowDays) {
                water += expectedInflow;

                // Tank cannot exceed capacity
                water = Math.min(water, tankCapacity);
            }

            // Shortage detected
            if (water <= 0) {
                shortageInDays = day;
                break;
            }
        }

        // No shortage within 30 days
        if (shortageInDays === null) {
            shortageInDays = 30;
        }

        return shortageInDays;
    }

    // Normal forecast
    const shortageInDays = simulateWater(dailyUsage);

    // What-if forecast: reduce consumption by 10%
    const reducedUsage = dailyUsage * 0.90;
    const savedShortageInDays = simulateWater(reducedUsage);

    // Determine risk
    let riskLevel;
    let recommendation;

    if (shortageInDays <= 1) {
        riskLevel = "CRITICAL";
        recommendation =
            "Arrange additional water supply immediately and reduce non-essential consumption.";
    } else if (shortageInDays <= 3) {
        riskLevel = "HIGH";
        recommendation =
            "Arrange a tanker within 2 days and reduce non-essential water usage.";
    } else if (shortageInDays <= 5) {
        riskLevel = "MEDIUM";
        recommendation =
            "Monitor consumption closely and reduce non-essential water usage.";
    } else {
        riskLevel = "LOW";
        recommendation =
            "Water supply looks stable. Continue monitoring daily consumption.";
    }

    // Calculate shortage date
    const today = new Date();
    const shortageDate = new Date(today);

    shortageDate.setDate(
        today.getDate() + shortageInDays
    );

    // Display main result
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("riskLevel").textContent =
        riskLevel;

    document.getElementById("daysRemaining").textContent =
        shortageInDays + " days";

    document.getElementById("shortageDate").textContent =
        shortageInDays >= 30
            ? "No shortage in next 30 days"
            : shortageDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
            });

    document.getElementById("recommendationText").textContent =
        recommendation;

    // Display What-If scenario
    document.getElementById("currentPlan").textContent =
        shortageInDays >= 30
            ? "No shortage in next 30 days"
            : shortageInDays + " days until shortage";

    document.getElementById("savedPlan").textContent =
        savedShortageInDays >= 30
            ? "No shortage in next 30 days"
            : savedShortageInDays + " days until shortage";

    const waterSaved = dailyUsage * 0.10;

    document.getElementById("waterSaved").textContent =
        Math.round(waterSaved) + " litres/day";

    // Console information
    console.log("WaterShield Forecast:", {
        communityName,
        tankCapacity,
        currentWater,
        dailyUsage,
        expectedInflow,
        inflowDays,
        shortageInDays,
        savedShortageInDays,
        waterSaved,
        riskLevel
    });
}