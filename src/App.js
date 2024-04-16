// App.js
import React, { useEffect, useState } from "react";

export default function App() {
  return (
    <div className="app">
      <Heading />
      <div className="price-card">
        <PriceCardComponent />
        <div className="price-card__features">
          <FeaturesListComponent />
          <ButtonComponent />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <header className="app__heading">
      <h1 className="app__title">Simple, traffic-based pricing</h1>
      <p className="app__subtitle">
        Sign-up for our 30-day trial. No credit card required
      </p>
    </header>
  );
}

function PriceCardComponent() {
  const [value, setValue] = useState(100);
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);
  const pricePerUnit = 0.16;
  let calculatedPrice = (value * pricePerUnit).toFixed(2);

  if (isYearlyBilling) {
    calculatedPrice = (calculatedPrice * 12 * 0.75).toFixed(2);
  }

  return (
    <div className="price-card__inner">
      <div className="price-card__info ">
        <PageviewsComponent />
        <PricingComponent
          price={calculatedPrice}
          isYearlyBilling={isYearlyBilling}
        />
      </div>
      <Slider value={value} setValue={setValue} />
      <BillingToggleComponent
        isYearlyBilling={isYearlyBilling}
        setIsYearlyBilling={setIsYearlyBilling}
      />
    </div>
  );
}

function PageviewsComponent() {
  return <div className="price-card__pageviews">100K PAGEVIEWS</div>;
}

function PricingComponent({ price, isYearlyBilling }) {
  return (
    <div className="price-card__pricing">
      <span className="price-card__pricing-amount">${price}</span>
      <span className="price-card__pricing-unit">
        {isYearlyBilling ? "/ year" : "/ month"}
      </span>
    </div>
  );
}

function BillingToggleComponent({ isYearlyBilling, setIsYearlyBilling }) {
  const [discountText, setDiscountText] = useState("25% discount");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 500) {
        setDiscountText("25%");
      } else {
        setDiscountText("25% discount");
      }
    }

    // Set text on initial load
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="billing-toggle">
      <span className="billing-toggle__option monthly">Montly Billing</span>
      <label className="billing-toggle__switch switch">
        <input
          type="checkbox"
          checked={isYearlyBilling}
          onChange={() => setIsYearlyBilling(!isYearlyBilling)}
          className="billing-toggle__checkbox"
        />
        <span className="billing-toggle__slider slider round"></span>
      </label>
      <span className="billing-toggle__option yearly">Yearly Billing</span>

      <span className="billing-toggle__discount-tag"> {discountText} </span>
    </div>
  );
}

function Slider({ value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const sliderPercentage = ((value - 1) / (200 - 1)) * 100;

  const sliderStyle = {
    background: `linear-gradient(90deg, hsl(174, 77%, 80%) ${sliderPercentage}%, hsl(224, 65%, 95%) ${sliderPercentage}%)`,
  };
  return (
    <div className="slider-container">
      <input
        type="range"
        min="1"
        max="200"
        value={value}
        onChange={handleChange}
        className="slider-pricing"
        style={sliderStyle}
      />
    </div>
  );
}

function FeaturesListComponent() {
  return (
    <div className="features-list">
      <ul className="features-list__items">
        <li className="features-list__item">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="8">
            <path
              fill="none"
              stroke="#10D8C4"
              strokeWidth="2"
              d="M1 4.134l1.907 1.908L7.949 1"
            />
          </svg>
          <span>Unlimited websites</span>
        </li>
        <li className="features-list__item">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="8">
            <path
              fill="none"
              stroke="#10D8C4"
              strokeWidth="2"
              d="M1 4.134l1.907 1.908L7.949 1"
            />
          </svg>
          <span>100% data ownership</span>
        </li>
        <li className="features-list__item">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="8">
            <path
              fill="none"
              stroke="#10D8C4"
              strokeWidth="2"
              d="M1 4.134l1.907 1.908L7.949 1"
            />
          </svg>
          <span>Email reports</span>
        </li>
      </ul>
    </div>
  );
}

function ButtonComponent() {
  return <button className="button button--primary">Start my trial</button>;
}
