class app {
  constructor() {
    this.select = document.getElementsByTagName("select");
    this.listing = document.getElementById("listing");
    this.nameInput = document.getElementsByClassName("text-input");
    this.checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    this.checkboxLabel = document.querySelector(".price-filter label");
    this.items = JSON.parse(localStorage.getItem('items'));
    this.filters = {};
    this.filteredItems = this.items;
    this.ranges = {
      0: {
        min: 0,
        max: 10000,
      },
      1: {
        min: 10000,
        max: 20000,
      },
      2: {
        min: 20000,
        max: 30000,
      },
      3: {
        min: 30000,
        max: 40000,
      },
      4: {
        min: 40000,
        max: 50000,
      },
      5: {
        min: 50000,
        max: Number.MAX_SAFE_INTEGER,
      },
    };
  }
  render() {
    while (this.listing.hasChildNodes()) {
      this.listing.removeChild(this.listing.firstChild);
    }
    this.filteredItems.map((item) => {
      const div = document.createElement("div");
      const { name, ram, rom, imageUrl, color, price } = item;
      const template = ` 
        <div class="row">
            <div class="mobile-image">
                <img src="images/sample-mobile.webp" />
            </div>
            <div class="mobile-content">
                <h3>
                    ${name} (${rom} ROM, ${ram} RAM, ${color})
                </h3>
                <h3>
                    INR ${price}
                </h3>
            </div>
        </div>`;
      div.innerHTML = template;
      this.listing.appendChild(div);
    });
  }

  bindEvents() {
    // alert("bind Events");
    this.checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    this.nameInput[0].addEventListener("input", (event) => {
      this.filters.name = event.target.value;
      this.finalResult();
    });
    this.select[0].addEventListener("change", (event) => {
      this.filters.brand = event.target.value;
      this.finalResult();
    });
    this.checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", (event) => {
        if (!this.filters.price) {
          this.filters.price = [];
        }
        const index = this.filters.price.indexOf(event.target.value);
        if(index === -1) {
            this.filters.price.push(event.target.value);
        } else {
            this.filters.price.splice(index, 1);
        }
        this.finalResult();
      });
    });
  }
  finalResult() {
    console.log(this.filters);
    this.filteredItems = this.items.filter((item) => {
      let filter = true;
      if (
        this.filters.name &&
        !item.name
          .toLocaleLowerCase()
          .includes(this.filters.name.toLocaleLowerCase())
      ) {
        filter = false;
      }
      if (
        filter &&
        this.filters.brand &&
        !item.brand
          .toLocaleLowerCase()
          .includes(this.filters.brand.toLocaleLowerCase())
      ) {
        filter = false;
      }
      if (filter && this.filters.price && this.filters.price.length > 0) {
        const result = this.filters.price.map((price) => {
          return this.ranges[price];
        });
        const filteredResult = result.filter(({ min, max }) => {
          if (item.price >= min && item.price < max) return true;
        });
        if (filteredResult.length === 0) filter = false;
      }
      return filter;
    });
    this.render();
  }
}

const instance = new app();
instance.render();
instance.bindEvents();
