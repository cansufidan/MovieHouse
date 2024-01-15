const container = document.querySelector(".container");

const count = document.getElementById("count");

const amount = document.getElementById("amount");

const movieList = document.querySelector("#movie");

const infoText = document.querySelector(".infoText");

const seats = document.querySelectorAll(".seat:not(.reserved)");

const saveSeatsToDatabase = (seatIndex) => {
 
  localStorage.setItem("seatsIndex", JSON.stringify(seatIndex));

  localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex));
};

const getSeatsFromDatabase = () => {
  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
  
  if (dbSelectedSeats !== null && dbSelectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  movieList.selectedIndex = dbSelectedMovie;
};

getSeatsFromDatabase();

const createSeatsIndex = () => {

  const allSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  const allSelectedSeatsArray = [];

  const allSelectedSeats = container.querySelectorAll(".seat.selected");
  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  const selectedSeatsIndexs = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  saveSeatsToDatabase(selectedSeatsIndexs);
};
const calculateTotal = () => {
  createSeatsIndex();

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
 
  count.innerText = selectedSeatsCount;
  
  amount.innerText = selectedSeatsCount * movieList.value;

  if (selectedSeatsCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};
calculateTotal();

container.addEventListener("click", (mouseEvent) => {
  
  const clickedSeat = mouseEvent.target.offsetParent;
 

  if (
    
    clickedSeat.classList.contains("seat") &&
 
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});

movieList.addEventListener("change", () => {
  calculateTotal();
});