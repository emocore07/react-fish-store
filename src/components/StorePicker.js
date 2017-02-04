import React from 'react'; // react should be listed in package.json
import { getFunName } from '../helpers';
// es6 class
class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        { /* Comments are weird in jsx */ }
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
