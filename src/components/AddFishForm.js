import React from 'react';

class AddFishForm extends React.Component {
  createFish = (event) => {
    event.preventDefault();
    const newFish = {
      name: this.fishName.value,
      price: this.fishPrice.value,
      status: this.fishAvailability.value,
      desc: this.fishDescription.value,
      image: this.fishImage.value
    };
    console.log(newFish);
    this.props.addFish(newFish);
    this.fishForm.reset();
  }

  render() {
    return (
      <form
        ref={(input) => {this.fishForm = input}}
        onSubmit={this.createFish} className="fish-edit">
        <input
          type="text"
          ref={(input) => { this.fishName = input }}
          placeholder="Fish Name"
        />
        <input
          type="text"
          ref={(input) => { this.fishPrice = input }}
          placeholder="Fish Price"
        />
        <select ref={(input) => { this.fishAvailability = input }}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea
          placeholder="Fish Desc"
          ref={ (input) => { this.fishDescription = input } }
        >
        </textarea>
        <input
          type="text"
          ref={ (input) => { this.fishImage = input } }
          placeholder="Fish Image" />
        <button type="submit">+ Add Item</button>
      </form>
    );
  }
}

export default AddFishForm;
