document.getElementById('ratingFilter').addEventListener('change', function () {
    const selected = this.value;
    document.querySelectorAll('#destinations .column').forEach(card => {
      const rating = parseInt(card.getAttribute('data-rating'));
      card.style.display = (selected === 'all' || rating == parseInt(selected)) ? '' : 'none';
    });
  });


  async function toggleFavorite(element, destinationId) {
    element.classList.toggle("favorited");
    const isFavorited = element.classList.contains("favorited");
  
    if (isFavorited) {
      await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user27",
          destinationId,
          name: element.dataset.name,
          image: element.dataset.img,
          rating: parseInt(element.dataset.rating)
        })
      });
    } else {
      await fetch(`http://localhost:5000/api/favorites/user27/${destinationId}`, {
        method: "DELETE"
      });
    }
  }
  

  function bookNow(destinationId) {
    document.getElementById("modalDestinationId").value = destinationId;
    const modal = new bootstrap.Modal(document.getElementById("bookNowModal"));
    modal.show();
  }
  
  document.getElementById("bookNowForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const bookingData = {
      destinationId: document.getElementById("modalDestinationId").value,
      name: document.getElementById("userName").value,
      email: document.getElementById("userEmail").value,
      travelDate: document.getElementById("travelDate").value,
    };
  
    console.log("Booking Submitted:", bookingData);
  
    // TODO: send to server using fetch()
    alert("Booking confirmed!");
    const modal = bootstrap.Modal.getInstance(document.getElementById("bookNowModal"));
    modal.hide();
    
  
    this.reset();
  });

  
  
  
  
  
  