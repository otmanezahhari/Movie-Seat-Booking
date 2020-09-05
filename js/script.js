// Get All Input
let allSeat = document.querySelectorAll(".container .seat");
let count = document.getElementById("count");
let total = document.getElementById("total");
let movie = document.getElementById("movie");
let moviePrice = localStorage.getItem("selectedMoviePrice") || movie.value;
populateUI();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Function uppdatePrice
function uppdatePrice() {
  let selectedSeats = document.querySelectorAll(".container .selected");
  const seatsIndex = [...selectedSeats].map((seat) =>
    [...allSeat].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  count.innerHTML = selectedSeats.length;
  localStorage.setItem("selectedSeatsIndex", selectedSeats.length);
  total.innerHTML = moviePrice * selectedSeats.length;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    allSeat.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
  }
}

//Add Event Listner
allSeat.forEach((elem) => {
  elem.addEventListener("click", (ev) => {
    if (!ev.target.classList.contains("occupied")) {
      ev.target.classList.toggle("selected");
      uppdatePrice();
    }
  });
});

movie.addEventListener("change", (ev) => {
  moviePrice = ev.target.value;
  setMovieData(ev.target.selectedIndex, moviePrice);
  uppdatePrice();
});

// Initial count and total set
uppdatePrice();
