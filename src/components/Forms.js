import { ethers } from "ethers";
import React from "react";
import { useForm } from "react-hook-form";

function Form() {
  const {
    setError,
    formState: { errors },
  } = useForm();

  const setValidation = (Raddress, amount) => {
    if (!ethers.utils.isAddress(Raddress)) {
      console.log("This address is not a valid ethereum address");
      return true;
    } else if (!(amount > 0)) {
      console.log("The amount value should be greater than zero");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear();
    const address = e.target.Raddress.value;
    const amount = e.target.Amount.value;
    if (setValidation(address, amount) == true) return false;

    try {
      if (window.ethereum) {
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tx = await signer.sendTransaction({
          to: ethers.utils.getAddress(address),
          value: ethers.utils.parseEther(amount),
        });
        console.log({ amount, address });
        console.log("tx:", tx);
      } else {
        console.log("Please install Metamask");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <div className="box">
        <h1>WELCOME</h1>
        <h2>Transfer Your ETH Tokens</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            autoComplete="off"
            name="Raddress"
            placeholder="Recipent address"
          />

          <br />
          <br />
          <input
            type="text"
            required
            autoComplete="off"
            name="Amount"
            placeholder="Amount"
          />
          <br />
          <br />
          <button type="submit">Transfer</button>
        </form>
      </div>
    </div>
  );
}
export default Form;
