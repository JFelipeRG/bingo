import { getBingoNumbers } from "../js/getBingoNumbers";
import { userIcon, displayIcon } from "../js/getIcons";

export class BingoCard extends HTMLElement {
  numbers = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */ `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          background: #9e1c23;
          width: 300px;
          height: 225px;
          display: flex;
          flex-direction: column;
        }

        h1 {
          color: #fff;
          text-align: center;
          width: 100%;
          height: fit-content;
          display: flex;
          flex-direction: row-reverse;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin: 6px 0;
        }

        h1 svg {
          width: 30px;
          height: 30px;
        }

        .numbers {
          flex: 1;
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
          padding: 5px;
        }

        .numbers div {
          background: #eee;
          display: grid;
          place-content: center;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .numbers div.checked {
          color:  #54090d;
          text-decoration: line-through;
          background: transparent;
        }
    `;
  }

  connectedCallback() {
    this.render();
    this.insertNumbersToPlay();
    this.insertIcon();
  }

  checkCell(id, index) {
    const cellNumber = this.shadowRoot.getElementById(id);
    cellNumber.classList.add("checked");
    this.numbers.splice(index, 1);
  }

  insertNumbersToPlay() {
    const numbers = getBingoNumbers();
    const numbersContainer = this.shadowRoot.querySelector(".numbers");

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers[randomIndex];
      if (this.numbers.includes(randomNumber)) {
        i--;
      } else {
        this.numbers.push(numbers[randomIndex]);
      }
    }

    for (const number of this.numbers) {
      const numberCell = document.createElement("div");
      numberCell.id = number;
      numberCell.textContent = number;
      numbersContainer.appendChild(numberCell);
    }
  }

  insertIcon() {
    let icon;

    if (this.getAttribute("name") === "CPU") {
      icon = displayIcon();
    } else {
      icon = userIcon();
    }

    const playerTag = this.shadowRoot.querySelector("h1");
    Array.from(icon.node).map(n => playerTag.appendChild(n));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
        <style>${BingoCard.styles}</style>
        <div class="container">
            <h1>${this.getAttribute("name")}</h1>
            <div class="numbers"></div>
        </div>
    `;
  }
}

customElements.define("bingo-card", BingoCard);
