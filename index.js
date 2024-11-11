let savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];

function isLocationSaved(title) {
  return savedLocations.some((location) => location.title === title);
}

document.addEventListener("DOMContentLoaded", function () {
 
  function toggleHeart(location) {
    const index = savedLocations.findIndex(
      (saved) => saved.title === location.title
    );

    if (index === -1) {
    
      savedLocations.push(location);
    } else {
      
      savedLocations.splice(index, 1);
    }

    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }

  const locationsData = {
    locations: [
      {
        title: "Highland Park",
        cost: "Free",
        address: "180 Reservoir Ave, Rochester, NY 14620",
        review: "5",
        image:
          "https://www.cityofrochester.gov/sites/default/files/2024-06/Highland%20Park.PNG",
      },
      {
        title: "The Strong National Museum of Play",
        cost: "$18 per adult, $15 for children",
        address: "1 Manhattan Square Dr, Rochester, NY 14607",
        review: "4",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/External_view_of_Museum_of_Play.jpg/250px-External_view_of_Museum_of_Play.jpg",
      },
      {
        title: "George Eastman Museum",
        cost: "$20 per adult, $18 for seniors, $7 for students",
        address: "900 East Ave, Rochester, NY 14607",
        review: "2",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/George-Eastman-House%3DExterior.JPG/250px-George-Eastman-House%3DExterior.JPG",
      },
      {
        title: "Rochester Public Market",
        cost: "Free to enter",
        address: "280 Union St N, Rochester, NY 14609",
        review: "1",
        image:
          "https://www.cityofrochester.gov/sites/default/files/2024-10/RPM%20web%20homepage%20new%20banner%20photo%20%281%29.png",
      },
      {
        title: "Seneca Park Zoo",
        cost: "$12 per adult, $9 for children",
        address: "2222 St Paul St, Rochester, NY 14621",
        review: "3",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Seneca_Park_Zoo_Entrance.jpg/220px-Seneca_Park_Zoo_Entrance.jpg",
      },
      {
        title: "Memorial Art Gallery",
        cost: "$15 per adult, $12 for seniors, $6 for students",
        address: "500 University Ave, Rochester, NY 14607",
        review: "2",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Memorial_Art_Gallery_main_gallery_west_side.JPG/250px-Memorial_Art_Gallery_main_gallery_west_side.JPG",
      },
      {
        title: "Seabreeze Amusement Park",
        cost: "$37 per person",
        address: "4600 Culver Rd, Rochester, NY 14622",
        review: "5",
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Seabreeze_Amusement_Park_logo.png/250px-Seabreeze_Amusement_Park_logo.png",
      },
      {
        title: "Genesee Riverway Trail",
        cost: "Free",
        address: "Start at Corn Hill Landing, Rochester, NY",
        review: "2",
        image:
          "https://cloudfront.traillink.com/photos/genesee-riverway-trail_158112_sc.jpg",
      },
      {
        title: "Ontario Beach Park",
        cost: "Free",
        address: "4799 Lake Ave, Rochester, NY 14612",
        review: "5",
        image:
          "https://daytrippingroc.com/wp-content/uploads/Ontario-Beach-Park-pier-winter-cover-875x492.jpg",
      },
      {
        title: "The Eastman Theatre",
        cost: "Varies by performance",
        address: "26 Gibbs St, Rochester, NY 14604",
        review: "4",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Rochester_Eastman_Theatre_-_Exterior.jpg/250px-Rochester_Eastman_Theatre_-_Exterior.jpg",
      },
    ],
  };

  const gridContainer = document.querySelector(".grid-container");

  locationsData.locations.forEach((location) => {
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

    // Add image
    const img = document.createElement("img");
    img.src = location.image;
    img.style.width = "100%";

    img.style.position = "relative"; 
    img.style.zIndex = "0"; 
    locationDiv.appendChild(img);

    // Create the heart icon at the top-right
    const heartIcon = document.createElement("img");
    heartIcon.src = "./image/blank_heart.png"; 
    heartIcon.alt = "heart";
    heartIcon.classList.add("heartIcon"); 
    heartIcon.style.position = "absolute"; 
    heartIcon.style.top = "30px"; 
    heartIcon.style.right = "20px"; 
    heartIcon.style.width = "23px"; 
    heartIcon.style.height = "23px";
    heartIcon.style.cursor = "pointer"; 
    heartIcon.style.zIndex = "2"; 

    // Add event listener to handle heart icon toggle
    heartIcon.addEventListener("click", function () {
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

    // Add title
    const title = document.createElement("h3");
    title.textContent = location.title;
    locationDiv.appendChild(title);

    // Create cost and review
    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.style.display = "flex";
    descriptionWrapper.style.flexDirection = "row";
    descriptionWrapper.style.justifyContent = "space-around";
    descriptionWrapper.style.columnGap = "280px";

    // Add cost
    const cost = document.createElement("p");
    cost.textContent = `Cost: ${location.cost}`;
    descriptionWrapper.appendChild(cost);

    // Add review with stars
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

    // Add address
    const address = document.createElement("p");
    address.textContent = `Address: ${location.address}`;
    locationDiv.appendChild(address);

 
    gridContainer.appendChild(locationDiv);
    document.querySelector(".grid-container").appendChild(locationDiv);
  }); 
});
