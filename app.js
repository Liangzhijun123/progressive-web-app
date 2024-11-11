document.addEventListener("DOMContentLoaded", async function () {
    const gridContainer = document.querySelector(".grid-container");
  
    // Fetch the JSON data
    async function loadLocationsData() {
      try {
        const response = await fetch("locationsData.json");
        const data = await response.json();
        displayLocations(data.locations);
      } catch (error) {
        console.error("Error fetching locations data:", error);
      }
    }
  
    // Display locations in grid container
    function displayLocations(locations) {
      locations.forEach((location) => {
        const locationDiv = document.createElement("div");
        locationDiv.classList.add("location");
  
        // Populate location data into locationDiv
        const img = document.createElement("img");
        img.src = location.image;
        img.style.width = "100%";
        locationDiv.appendChild(img);
  
        const title = document.createElement("h3");
        title.textContent = location.title;
        locationDiv.appendChild(title);
  
        const cost = document.createElement("p");
        cost.textContent = `Cost: ${location.cost}`;
        locationDiv.appendChild(cost);
  
        const review = document.createElement("p");
        review.textContent = `Review: ${"⭐".repeat(location.review)}`;
        locationDiv.appendChild(review);
  
        const address = document.createElement("p");
        address.textContent = `Address: ${location.address}`;
        locationDiv.appendChild(address);
  
        gridContainer.appendChild(locationDiv);
      });
    }
  
    loadLocationsData();
  });
  