import React, { useReducer } from "react";
import { useCreatePizzaOrderMutation } from "../state/orderListApi";

const initialFormState = {
  fullName: "",
  size: "",
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };
    case "TOGGLE_TOPPING":
      return { ...state, [action.payload.toppingId]: action.payload.checked };
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
};

const PizzaForm = () => {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [createPizzaOrder, { error, isLoading }] = useCreatePizzaOrderMutation();

  const onChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const toggleTopping = (e) => {
    dispatch({
      type: "TOGGLE_TOPPING",
      payload: { toppingId: e.target.name, checked: e.target.checked },
    });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { fullName, size } = state;

    if (!fullName.trim() || !size.trim()) {
      // Handle form validation error
      return;
    }

    const toppings = Object.keys(state)
      .filter((key) => ["1", "2", "3", "4", "5"].includes(key) && state[key])
      .map((key) => parseInt(key));

    createPizzaOrder({ fullName, size, toppings })
      .unwrap()
      .then((data) => {
        console.log("Order created:", data);
        resetForm();
      })
      .catch((err) => {
        console.error("Error creating order:", err);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {error && <div className="failure">Order failed: {error.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input data-testid="fullNameInput" id="fullName" name="fullName" placeholder="Type full name" type="text" value={state.fullName} onChange={onChange} />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select data-testid="sizeSelect" id="size" name="size" value={state.size} onChange={onChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={state["1"]} onChange={toggleTopping} />
          Pepperoni
          <br />
        </label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={state["2"]} onChange={toggleTopping} />
          Green Peppers
          <br />
        </label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={state["3"]} onChange={toggleTopping} />
          Pineapple
          <br />
        </label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={state["4"]} onChange={toggleTopping} />
          Mushrooms
          <br />
        </label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={state["5"]} onChange={toggleTopping} />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" disabled={!state.fullName.trim() || !state.size.trim()} />
    </form>
  );
};

export default PizzaForm;
