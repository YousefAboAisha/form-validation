import React, { useState, useEffect } from "react";
import "./ContactUs.css";
import Spinner from "../../Components/Spinner/Spinner";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [tax, setTax] = useState("");
  const [NameErr, setNameErr] = useState("");
  const [CountryErr, setCountryErr] = useState("");
  const [TaxErr, setTaxErr] = useState("");
  const [FetchErr, setFetchErr] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);

  const states = [
    {
      value: "Austria",
      type: "eu_vat",
    },
    {
      value: "Belgium",
      type: "eu_vat",
    },
    {
      value: "Brazil",
      type: "br_cnpj",
    },
    {
      value: "Canada",
      type: "ca_bn",
    },
    {
      value: "Chile",
      type: "cl_tin",
    },
    {
      value: "Croatia",
      type: "eu_vat",
    },
    {
      value: "Georgia",
      type: "ge_vat",
    },
    {
      value: "Hungary",
      type: "hu_tin",
    },
    {
      value: "India",
      type: "in_gst",
    },
    {
      value: "Indonesia",
      type: "id_npwp",
    },
  ];

  const clearInputs = () => {
    setName("");
    setCountry("");
    setTax("");
    setMessage("");
  };

  const nameHandler = () => {
    let flag = false;
    if (name.trim() === "") {
      setNameErr("Name must be filled!");
    } else if (name.length < 3) {
      setNameErr("Name must be more than 3 characters!");
    } else {
      setNameErr("");
      flag = true;
    }
    return flag;
  };

  const countryHandler = () => {
    let flag = false;
    if (country.trim() === "") {
      setCountryErr("Country must be Chosen!");
    } else if (states.filter((elem) => elem.value === country) <= 0) {
      setCountryErr("Please, choose valid country");
    } else {
      setCountryErr("");
      flag = true;
    }
    return flag;
  };

  const taxHandler = () => {
    let flag = false;
    if (tax.trim() === "") {
      setTaxErr("Tax must be filled!");
    } else {
      setTaxErr("");
      flag = true;
    }
    return flag;
  };

  const ClickHandler = (e) => {
    e.preventDefault();
    nameHandler();
    countryHandler();
    taxHandler();
    if (nameHandler() && countryHandler() && taxHandler()) {
      fetchData();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    let data = {
      value: "DE123456789",
      type: "eu_vat",
    };

    const response = await fetch(
      "https://api.stripe.com/v1/customers/cus_4fdAW5ftNQow1a/tax_ids",
      {
        method: "POST",
        headers: {
          Authorization:
            "sk_test_51L9bFhAkoD3TxRvMXd7QhV67EC95fT59vC4FJOQc4h43e4Q5nWIM3OiLnu27dntid97guMTwjxKuCHMIMmZAxNDo00mgwioDEl",
        },
        body: JSON.stringify(data),
      }
    );

    setLoading(false);

    const result = await response.json();
    console.log(result);

    console.log(response.status); // 200

    if (response.status === 200) {
      setData(result);
      setFetchErr("");
      clearInputs();
    } else {
      setLoading(false);
      setFetchErr(result.error.type);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="wrapper">
      <form className="right" onSubmit={ClickHandler}>
        <div className="input">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            onKeyUp={nameHandler}
          />
          <span className="erorr">{NameErr}</span>
        </div>
        <div className="input">
          <input
            list="Countries"
            name="browser"
            id="browser"
            placeholder="Select country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            onKeyUp={countryHandler}
          />
          <span className="erorr">{CountryErr}</span>

          <datalist id="Countries">
            {states.map((elem, index) => {
              return (
                <option key={index} value={elem.value}>
                  {elem.value}
                </option>
              );
            })}
          </datalist>
        </div>

        <div className="input">
          <input
            type="text"
            placeholder="Tax"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            onKeyUp={taxHandler}
          />
          <span className="erorr">{TaxErr}</span>
        </div>

        <button>Submit</button>
        <span className="error">{FetchErr}</span>
      </form>
    </div>
  );
};

export default ContactUs;
