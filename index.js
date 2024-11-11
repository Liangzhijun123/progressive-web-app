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
        description:
          "Highland Park, also known as Highland Botanical Park, is an arboretum in Rochester, New York, United States. Its administrative office is located at 171 Reservoir Avenue in Rochester. ",
      },
      {
        title: "The Strong National Museum of Play",
        cost: "$18 per adult, $15 for children",
        address: "1 Manhattan Square Dr, Rochester, NY 14607",
        review: "4",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/External_view_of_Museum_of_Play.jpg/250px-External_view_of_Museum_of_Play.jpg",
        description:
          "The Strong National Museum of Play (also known as just The Strong Museum or simply the Strong) is part of The Strong in Rochester, New York, United States. Established in 1969 and initially based on the personal collection of Rochester native Margaret Woodbury Strong, the museum opened to the public in 1982, after several years of planning, cataloguing, and exhibition development for the museum's new building in downtown Rochester.",
      },
      {
        title: "George Eastman Museum",
        cost: "$20 per adult, $18 for seniors, $7 for students",
        address: "900 East Ave, Rochester, NY 14607",
        review: "2",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/George-Eastman-House%3DExterior.JPG/250px-George-Eastman-House%3DExterior.JPG",
        description:
          "The George Eastman Museum, also referred to as George Eastman House and the International Museum of Photography and Film, is the world's oldest museum dedicated to photography and one of the world's oldest film archives, opened to the public in 1949 in Rochester, New York.",
      },
      {
        title: "Rochester Public Market",
        cost: "Free to enter",
        address: "280 Union St N, Rochester, NY 14609",
        review: "1",
        image:
          "https://www.cityofrochester.gov/sites/default/files/2024-10/RPM%20web%20homepage%20new%20banner%20photo%20%281%29.png",
        description:
          "The Rochester Public Market has served the community at its 280 North Union Street site since 1905! The Market is open Tuesday, Thursday and Saturday, year-round (except Thanksgiving, Christmas Days, or Independence Days that fall on Market days). On average, Saturdays have the most vendors, followed by Thursdays, and Tuesdays.",
      },
      {
        title: "Seneca Park Zoo",
        cost: "$12 per adult, $9 for children",
        address: "2222 St Paul St, Rochester, NY 14621",
        review: "3",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Seneca_Park_Zoo_Entrance.jpg/220px-Seneca_Park_Zoo_Entrance.jpg",
        description:
          "Seneca Park Zoo is a 20-acre zoo located in the city of Rochester, New York, US. The zoo is home to over 90 species including mammals, reptiles, birds, amphibians, fish, and arachnids. It is accredited by the Association of Zoos and Aquariums.",
      },
      {
        title: "Memorial Art Gallery",
        cost: "$15 per adult, $12 for seniors, $6 for students",
        address: "500 University Ave, Rochester, NY 14607",
        review: "2",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Memorial_Art_Gallery_main_gallery_west_side.JPG/250px-Memorial_Art_Gallery_main_gallery_west_side.JPG",
        description:
          "The Memorial Art Gallery is a civic art museum in Rochester, New York. Founded in 1913, it is part of the University of Rochester and occupies the southern half of the University's former Prince Street campus.",
      },
      {
        title: "Seabreeze Amusement Park",
        cost: "$37 per person (general admission)",
        address: "4600 Culver Rd, Rochester, NY 14622",
        review: "5",
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Seabreeze_Amusement_Park_logo.png/250px-Seabreeze_Amusement_Park_logo.png",
        description:
          "Seabreeze Amusement Park is a historic family amusement park located in Irondequoit, New York, a suburb of Rochester, where Irondequoit Bay meets Lake Ontario.",
      },
      {
        title: "Genesee Riverway Trail",
        cost: "Free",
        address: "Start at Corn Hill Landing, Rochester, NY",
        review: "2",
        image:
          "https://cloudfront.traillink.com/photos/genesee-riverway-trail_158112_sc.jpg",
        description:
          "The Genesee Riverway Trail (GRT) is an off-road trail for walking, running and bicycling along the Genesee River. It extends through the scenic, historic and cultural heart of Rochester, from the Erie Canal to downtown and Lake Ontario.  It provides pedestrian access to the Genesee River, its scenic gorge, three waterfalls, eight pedestrian bridges, and eleven parks, including four historic parks designed by Frederick Law Olmsted.  ",
      },
      {
        title: "Ontario Beach Park",
        cost: "Free",
        address: "4799 Lake Ave, Rochester, NY 14612",
        review: "5",
        image:
          "https://daytrippingroc.com/wp-content/uploads/Ontario-Beach-Park-pier-winter-cover-875x492.jpg",
        description:
          "Popular beachside park known for its century-old carousel, swimming, boating & rentable shelters.",
      },
      {
        title: "The Eastman Theatre",
        cost: "Varies by performance",
        address: "26 Gibbs St, Rochester, NY 14604",
        review: "4",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Rochester_Eastman_Theatre_-_Exterior.jpg/250px-Rochester_Eastman_Theatre_-_Exterior.jpg",
        description:
          "Kodak Hall at Eastman Theatre is the largest performance venue at the Eastman School of Music of the University of Rochester, located in downtown Rochester, New York, United States.",
      },
    ],
  };

  const gridContainer = document.querySelector(".grid-container");

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
  closeModal.textContent = "✖"; // Black X icon
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

    const img = document.createElement("img");
    img.src = location.image;
    img.style.width = "100%";
    img.style.position = "relative";
    img.style.zIndex = "0";
    locationDiv.appendChild(img);

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
      modalContent.innerHTML = `
    <img src="${location.image}" style="width: 100%; height: auto; margin-bottom: 20px;" alt="${location.title}">
    <h2 style="color: black;">${location.title}</h2>
    <p style="color: black;"><strong>Cost:</strong> ${location.cost}</p>
    <p style="color: black;"><strong>Address:</strong> ${location.address}</p>
    <p style="color: black;"><strong>Description:</strong> ${location.description}</p>
  `;

      modalContent.appendChild(closeModal); 
      modal.style.display = "flex";
    });

    gridContainer.appendChild(locationDiv);
  });
});
