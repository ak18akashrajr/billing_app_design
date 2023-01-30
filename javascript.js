"use strict";

// Personal-info
const nameInput = document.querySelector(".name-input");
const mailInput = document.querySelector(".mail-input");
const phoneInput = document.querySelector(".phone-input");
const allInputs = document.querySelectorAll(".input");
const form = document.querySelector(".all-inputs");
const sections = document.querySelectorAll(".section");
const stepNumbers = document.querySelectorAll(".step-num");
const btnNext = document.querySelector(".go-next-btn");
const btnGoBack = document.querySelector(".go-back-btn");
const nameErrorMessage = document.querySelector(".required__name");
const mailErrorMessage = document.querySelector(".required__mail");
const telErrorMessage = document.querySelector(".required__phone");

const proceedToDiffSection = (current, other) => {
  sections[current].classList.remove("active-section");
  sections[other].classList.add("active-section");
  stepNumbers[current].classList.remove("active-step");
  stepNumbers[other].classList.add("active-step");
};

const checkAllTrue = (el) => el.value.replaceAll(" ", "").match(matcher(el));

const removeClassHelper = (elem, className) => {
  elem.classList.remove(className);
};
const addClassHelper = (elem, className) => {
  elem.classList.add(className);
};

const errMessage = (currentEl) => {
  if (currentEl === nameInput) return nameErrorMessage;
  if (currentEl === mailInput) return mailErrorMessage;
  if (currentEl === phoneInput) return telErrorMessage;
};

const matcher = (currentEl) => {
  const letters = /^[A-Za-z]+$/;
  const emailChars =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const telephone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (currentEl === nameInput) return letters;
  if (currentEl === mailInput) return emailChars;
  if (currentEl === phoneInput) return telephone;
};

const error = (el, errMessage) => {
  addClassHelper(el, "border-error");
  removeClassHelper(errMessage, "hide");
};

const inputChecker = (el, errMessage, matcher) => {
  el.addEventListener("input", () => {
    if (el.value.replaceAll(" ", "").match(matcher)) {
      removeClassHelper(el, "border-error");
      addClassHelper(errMessage, "hide");
    }
  });
};
const formCheck = function () {
  const arr = Array.from(allInputs);
  if (arr.every(checkAllTrue)) {
    proceedToDiffSection(0, 1);
    removeClassHelper(btnGoBack, "hide");
  }
  allInputs.forEach((el) => {
    if (!el.value.replaceAll(" ", "").match(matcher(el))) {
      error(el, errMessage(el));
      inputChecker(el, errMessage(el), matcher(el));
    }
  });
};
//  END OF PERSONAL INFO
//  SELECT YOUR PLAN
const plansContainer = document.querySelector(".all-plans");
const allPlans = document.querySelectorAll(".plan-container");
const toggleBtn = document.querySelector(".toggle-button");

const activeplan = (e) => {
  if (e.target.classList.contains("plan-container")) {
    allPlans.forEach((el) => {
      removeClassHelper(el, "plan-container-active");
    });
    addClassHelper(e.target, "plan-container-active");
  }
};
plansContainer.addEventListener("click", activeplan);

toggleBtn.addEventListener("click", () => {
  const btnChecked = toggleBtn.checked;
  const arcadePrice = document.querySelector(".price-description__arcade ");
  const advancedPrice = document.querySelector(".price-description__advanced ");
  const proPrice = document.querySelector(".price-description__pro ");
  const month = document.querySelector(".monthly-price");
  const year = document.querySelector(".yearly-price");

  const btnCheck = (arcPrice, advPrice, proPriceFunVar) => {
    arcadePrice.textContent = arcPrice;
    advancedPrice.textContent = advPrice;
    proPrice.textContent = proPriceFunVar;
    year.classList.toggle("active-price");
    month.classList.toggle("active-price");
  };
  if (!btnChecked) {
    btnCheck("$9/mo", "$12/mo", "$15/mo");
    allPlans.forEach((el) => {
      el.querySelector(".free-months").remove();
    });
  }
  if (btnChecked) {
    btnCheck("$90/mo", "$120/mo", "$150/mo");
    allPlans.forEach((el) => {
      el.insertAdjacentHTML(
        "beforeend",
        `<span class="free-months">2 months free</span>`
      );
    });
  }
});
let plan = {
  yearly: "",
  planItself: "",
  planPrice: "0",
};
let selectedAddons = {};

const noPlanError = document.querySelector(".no-plan-error");
const planChecker = function () {
  plan.yearly = toggleBtn.checked;
  allPlans.forEach((el) => {
    if (el.classList.contains("plan-container-active")) {
      if (noPlanError) {
        addClassHelper(noPlanError, "hide");
      }
      plan.planPrice = el.querySelector(
        ".plan-container-flex"
      ).children[1].innerText;
      plan.planItself = el.querySelector(".plan-name").textContent;
      proceedToDiffSection(1, 2);
    }
    if (!el.classList.contains("plan-container-active")) {
      removeClassHelper(noPlanError, "hide");
    }
  });
};
// END OF PLAN
// ADDONS SECTION
const addonsContainers = document.querySelectorAll(".addon-container");
const addonsCheckboxes = document.querySelectorAll(".addons-checkbox");
const addonsSection = document.querySelector(".addons");
const addonprices = document.querySelectorAll(".addon-price");
const onlinePrice = document.querySelector(".addon-price__online");
const largerPrice = document.querySelector(".addon-price__larger");
const costumPrice = document.querySelector(".addon-price__costume");

//  CREATE ORIGINAL PRICES TEXT AND SAVE IT FOR LATER
const clones = [];
for (let i = 0; i < addonprices.length; i++) {
  clones.push(addonprices[i].cloneNode(true).textContent);
}
//////////////

const fixPrices = (onlinePrc, largerPrc, costumPrc) => {
  onlinePrice.textContent = onlinePrc;
  largerPrice.textContent = largerPrc;
  costumPrice.textContent = costumPrc;
};

const yearlyAddonPrices = () => {
  if (plan.yearly) {
    addonprices.forEach((el) => {
      fixPrices("+$10/yr", "+$20/yr", "+$20/yr");
    });
  } else {
    addonprices.forEach((el) => {
      fixPrices("+$1/yr", "+$2/yr", "+$2/yr");
    });
  }
};
addonsSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("addons-checkbox")) {
    e.target.parentNode.classList.toggle("addon-container-checked");
  }
});

const addonsSectionProceed = () => {
  addonsCheckboxes.forEach((el) => {
    if (el.checked) {
      selectedAddons[el.dataset.name] =
        el.parentNode.querySelector(".price").textContent;
    }
  });
  proceedToDiffSection(2, 3);
};
// END OF ADDONS

// SUMMARY
const addonsContainer = document.querySelector(".extra-addons-container");
const planPrice = document.querySelector(".finishing-price-plan");
const perMoOrYr = document.querySelector(".per-time");
const summaryNameMoYr = document.querySelector(".finishing-plan-mo-yr");
const finishingPlan = document.querySelector(".finishing-plan-name");
const totalPriceEl = document.querySelector(".finishing-total-price");
const totalPriceDateEl = document.querySelector(".finishint-total-date");
const changeBtn = document.querySelector(".change-btn");

const finishPricesAndInsertEl = () => {
  const pricesArr = [+plan.planPrice.match(/\d+/)[0]];
  planPrice.textContent = plan.planPrice;
  finishingPlan.textContent = plan.planItself;
  for (const [key, value] of Object.entries(selectedAddons)) {
    addonsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="rest-finishing-texts">
                  <span class="price-description">${key}</span>
                  <span class="price">${value}</span>
                </div>`
    );
    pricesArr.push(+value.match(/\d+/)[0]);
  }
  const totalPrice = pricesArr.reduce((total, cur) => total + cur, 0);
  totalPriceEl.textContent = totalPrice;
};

const moOrYr = () => {
  if (plan.yearly) {
    summaryNameMoYr.textContent = "(Yearly)";
    perMoOrYr.textContent = " Year";
    totalPriceDateEl.textContent = "yr";
  } else {
    summaryNameMoYr.textContent = "(Monthly)";
    perMoOrYr.textContent = " Month";
    totalPriceDateEl.textContent = "mo";
  }
};

const returnToFirstPage = () => {
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("active-section");
    stepNumbers[i].classList.remove("active-step");
  }
  allPlans.forEach((el) => {
    removeClassHelper(el, "plan-container-active");
  });
  sections[0].classList.add("active-section");
  stepNumbers[0].classList.add("active-step");
};

const resetPlanObject = () => {
  plan = {
    yearly: "",
    planItself: "",
    planPrice: "0",
  };
};

const hidePlanError = () => {
  if (!noPlanError) return;
  if (noPlanError) noPlanError.classList.add("hide");
};

// -- BUTTONS LISTENERS //
const test = function () {
  returnToFirstPage();
  selectedAddons = {};
  resetPlanObject();
  btnNext.textContent = "Next Step";
  btnGoBack.classList.add("hide");
  for (let i = 0; i < addonprices.length; i++) {
    addonprices[i].textContent = clones[i];
  }
  hidePlanError();
  addonsContainer.innerHTML = "";
};

changeBtn.addEventListener("click", () => {
  test();
});

btnNext.addEventListener("click", () => {
  if (sections[0].classList.contains("active-section")) {
    formCheck();
    console.log("clicked");
    return;
  }
  if (sections[1].classList.contains("active-section")) {
    planChecker();
    yearlyAddonPrices();
    return;
  }
  if (sections[2].classList.contains("active-section")) {
    addonsSectionProceed();
    finishPricesAndInsertEl();
    moOrYr();
    btnNext.textContent = "Confirm";
    return;
  }
  if (sections[3].classList.contains("active-section")) {
    addClassHelper(btnNext, "hide");
    proceedToDiffSection(3, 4);
    addClassHelper(btnGoBack, "hide");
    allInputs.forEach((el) => {
      el.value = "";
    });
    setTimeout(test, 8000);
  }
});

btnGoBack.addEventListener("click", () => {
  if (sections[1].classList.contains("active-section")) {
    proceedToDiffSection(1, 0);
    addClassHelper(btnGoBack, "hide");
    return;
  }
  if (sections[2].classList.contains("active-section")) {
    proceedToDiffSection(2, 1);
    for (let i = 0; i < addonprices.length; i++) {
      addonprices[i].textContent = clones[i];
    }
    hidePlanError();
    return;
  }
  if (sections[3].classList.contains("active-section")) {
    selectedAddons = {};
    proceedToDiffSection(3, 2);
    addonsContainer.innerHTML = "";
    btnNext.textContent = "Next Step";
    return;
  }
});
