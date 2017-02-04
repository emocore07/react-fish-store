import React from 'react'; // react should be listed in package.json
import { getFunName } from '../helpers';
// es6 class
class StorePicker extends React.Component {
  goToStore = (event) => {
    event.preventDefault(); // prevent form submit
    console.log(this.storeInput.value);
    this.context.router.transitionTo(`store/${this.storeInput.value}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        { /* Comments are weird in jsx */ }
        <h2>Please Enter a Store</h2>
        <input
          ref={(input) => { this.storeInput = input } /* reference to access input DOM element*/}
          type="text"
          required placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

// Добавляем router в контекст компонента StorePicker
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
