document.addEventListener("DOMContentLoaded", function () {
  const savedLocations =
    JSON.parse(localStorage.getItem("savedLocations")) || [];
  const savedContainer = document.querySelector(".saved-container");

  if (savedLocations.length === 0) {
    // If there are no saved locations, display a message
    const noSavedMessage = document.createElement("p");
    noSavedMessage.textContent = "No saved locations.";
    savedContainer.appendChild(noSavedMessage);
  } else {
    // If there are saved locations, display them
    savedLocations.forEach((location) => {
      const locationDiv = document.createElement("div");
      locationDiv.classList.add("location");
      locationDiv.style.position = "relative";

      const img = document.createElement("img");
      img.src = location.image;
      img.style.width = "100%";
      locationDiv.appendChild(img);

      // Add title, cost, review, and address (same as in the main page)
      const title = document.createElement("h3");
      title.textContent = location.title;
      locationDiv.appendChild(title);

      const cost = document.createElement("p");
      cost.textContent = `Cost: ${location.cost}`;
      locationDiv.appendChild(cost);

      const review = document.createElement("p");
      review.textContent = `Review: ${location.review}`;
      locationDiv.appendChild(review);

      const address = document.createElement("p");
      address.textContent = `Address: ${location.address}`;
      locationDiv.appendChild(address);

      savedContainer.appendChild(locationDiv);
    });
  }
});
