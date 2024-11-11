let savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];

function isLocationSaved(title) {
  return savedLocations.some((location) => location.title === title);
}

document.addEventListener("DOMContentLoaded", async function () {
  const gridContainer = document.querySelector(".grid-container");

  // Fetch JSON data
  async function loadLocationsData() {
    try {
      const response = await fetch("./locationsData.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const locationsData = await response.json();
      displayLocations(locationsData.locations); 
    } catch (error) {
      console.error("Error fetching locations data:", error);
    }
  }

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.style.display = "none";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "1000";

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.style.backgroundColor = "#fff";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "5px";
  modalContent.style.width = "80%";
  modalContent.style.maxWidth = "600px";
  modalContent.style.position = "relative";

  const closeModal = document.createElement("span");
  closeModal.textContent = "✖";
  closeModal.style.position = "absolute";
  closeModal.style.top = "10px";
  closeModal.style.right = "10px";
  closeModal.style.fontSize = "24px";
  closeModal.style.fontWeight = "bold";
  closeModal.style.color = "black";
  closeModal.style.cursor = "pointer";

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalContent.appendChild(closeModal);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  function displayLocations(locations) {
    locations.forEach((location) => {
      const locationDiv = document.createElement("div");
      locationDiv.classList.add("location");
      locationDiv.style.position = "relative";

      const backgroundDiv = document.createElement("div");
      backgroundDiv.style.position = "absolute";
      backgroundDiv.style.top = "0";
      backgroundDiv.style.left = "0";
      backgroundDiv.style.width = "100%";
      backgroundDiv.style.height = "100%";
      backgroundDiv.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      backgroundDiv.style.zIndex = "1";
      locationDiv.appendChild(backgroundDiv);

      const img = document.createElement("img");
      img.src = location.image;
      img.style.width = "100%";
      img.style.position = "relative";
      img.style.zIndex = "0";
      locationDiv.appendChild(img);

      const heartIcon = document.createElement("img");
      heartIcon.src = isLocationSaved(location.title)
        ? "./image/filled_heart.png"
        : "./image/blank_heart.png";
      heartIcon.alt = "heart";
      heartIcon.classList.add("heartIcon");
      heartIcon.style.position = "absolute";
      heartIcon.style.top = "30px";
      heartIcon.style.right = "20px";
      heartIcon.style.width = "23px";
      heartIcon.style.height = "23px";
      heartIcon.style.cursor = "pointer";
      heartIcon.style.zIndex = "2";

      heartIcon.addEventListener("click", function (e) {
        e.stopPropagation();
        const index = savedLocations.findIndex(
          (saved) => saved.title === location.title
        );

        if (index === -1) {
          savedLocations.push(location);
          heartIcon.src = "./image/filled_heart.png";
        } else {
          savedLocations.splice(index, 1);
          heartIcon.src = "./image/blank_heart.png";
        }

        localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
      });
      locationDiv.appendChild(heartIcon);

      const title = document.createElement("h3");
      title.textContent = location.title;
      locationDiv.appendChild(title);

      const descriptionWrapper = document.createElement("div");
      descriptionWrapper.style.display = "flex";
      descriptionWrapper.style.flexDirection = "row";
      descriptionWrapper.style.justifyContent = "space-around";
      descriptionWrapper.style.columnGap = "280px";

      const cost = document.createElement("p");
      cost.textContent = `Cost: ${location.cost}`;
      descriptionWrapper.appendChild(cost);

      const reviewWrapper = document.createElement("div");
      reviewWrapper.style.display = "flex";
      reviewWrapper.style.flexDirection = "row";
      reviewWrapper.style.justifyContent = "center";
      reviewWrapper.style.gap = "10px";
      reviewWrapper.style.whiteSpace = "nowrap";

      const reviewCount = parseInt(location.review);
      for (let i = 0; i < 5; i++) {
        const starImg = document.createElement("img");
        starImg.src = "./image/star.png";
        starImg.alt = "star";
        starImg.style.width = "20px";
        starImg.style.height = "20px";

        if (i < reviewCount) {
          reviewWrapper.appendChild(starImg);
        }
      }

      descriptionWrapper.appendChild(reviewWrapper);
      locationDiv.appendChild(descriptionWrapper);

      const address = document.createElement("p");
      address.textContent = `Address: ${location.address}`;
      locationDiv.appendChild(address);

      locationDiv.addEventListener("click", () => {
        console.log("Location clicked: ", location.title); // Debugging
        modalContent.innerHTML = `
          <img src="${location.image}" style="width: 100%; height: auto; margin-bottom: 20px;" alt="${location.title}">
          <h2 style="color: black;">${location.title}</h2>
          <p style="color: black;"><strong>Cost:</strong> ${location.cost}</p>
          <p style="color: black;"><strong>Address:</strong> ${location.address}</p>
          <p style="color: black;"><strong>Description:</strong> ${location.description}</p>
        `;

        modalContent.appendChild(closeModal);
        modal.style.display = "flex"; // Ensure modal is displayed
        console.log("Modal displayed."); // Debugging
      });

      gridContainer.appendChild(locationDiv);
    });
  }

  loadLocationsData();
});

