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

    // Estimate how many days the current water can support
    const currentDays = currentWater / dailyUsage;

    // Estimate water remaining when the expected supply arrives
    const waterAtInflow = currentWater - (dailyUsage * inflowDays);

    // Calculate shortage date based on current supply
    const today = new Date();
    const shortageDate = new Date(today);
    shortageDate.setDate(
        today.getDate() + Math.ceil(currentDays)
    );

    // Calculate risk
    let riskLevel;
    let recommendation;

    if (currentDays <= 1) {
        riskLevel = "CRITICAL";
        recommendation =
            "Arrange additional water supply immediately and reduce non-essential consumption.";
    } else if (currentDays <= 3) {
        riskLevel = "HIGH";
        recommendation =
            "Arrange a tanker within 2 days and reduce non-essential water usage.";
    } else if (currentDays <= 5) {
        riskLevel = "MEDIUM";
        recommendation =
            "Monitor consumption closely and reduce non-essential water usage.";
    } else {
        riskLevel = "LOW";
        recommendation =
            "Water supply looks stable. Continue monitoring daily consumption.";
    }

    // Display results
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("riskLevel").textContent = riskLevel;

    document.getElementById("daysRemaining").textContent =
        currentDays.toFixed(1) + " days";

    document.getElementById("shortageDate").textContent =
        shortageDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    document.getElementById("recommendationText").textContent =
        recommendation;

    console.log("WaterShield Analysis:", {
        communityName,
        tankCapacity,
        currentWater,
        dailyUsage,
        expectedInflow,
        inflowDays,
        waterAtInflow,
        currentDays,
        riskLevel
    });
}