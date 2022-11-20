function search() {
  const input = document.getElementById("city-input").value;
  fetch(
    `https://app.ticketmaster.com/discovery/v2/venues?apikey=g2OZIw7lpR4NrRjG6qWjRiTQGW3sZbBL&locale=*&countryCode=AU&city=${input}*`
  )
    .then((response) => {
      // https://developer.ticketmaster.com/api-explorer/v2/
      return response.json();
    })
    .then((data) => {
      let count = data._embedded.venues.length;
      let number = 1;
      output = data._embedded.venues.forEach((venue) => {
        // https://github.com/lucia-gm/note-app/blob/master/app.js
        const paragraph = document.body.appendChild(
          document.createElement("a")
        );
        // put paragraph in a div to style it with a grid and give it a class of "venuediv"
        const div = document.body.appendChild(document.createElement("div"));
        div.className = "venuediv";
        div.appendChild(paragraph);

        paragraph.style.background = "#3278c5";
        paragraph.style.fontSize = "20px";
        paragraph.style.padding = "10px 10px";
        paragraph.style.border = "3px solid #235489";
        paragraph.style.margin = "10px";
        paragraph.href = venue.url;
        paragraph.textContent = `[${number++}] ` + venue.name;
        paragraph.style.textAlign = "center";
        paragraph.appendChild(document.createElement("br"));

        // add some info about the venue and append it to the paragraph
        const info = document.createElement("p");
        paragraph.appendChild(info);

        info.style.fontSize = "15px";
        info.style.padding = "10px 10px";
        info.style.margin = "10px";
        info.style.textAlign = "center";
        info.textContent = venue.generalInfo.generalRule;

        // add an image to the paragraph
        const image = document.createElement("img");
        image.src = venue.images[0].url;
        image.style.width = "100px";
        image.style.height = "100px";
        image.style.margin = "10px";
        image.style.border = "3px solid #235489";
        paragraph.appendChild(image);
      }); //           console.log(JSON.stringify(venue) + ` ----  ${counter}`)
      document.getElementById("search").innerHTML = `Search [${count} Results]`;
    })
    .catch((err) => {
      // if error
      output = "There was an error";
      console.log(err);
    });
  document.getElementById("output").value = output;
}
