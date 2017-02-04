import React from 'react';
import AddFishForm from './AddFishForm.js';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      owner: null,
    };
  }

  componentDidMount = () => {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange = (event, key) => {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [event.target.name]: event.target.value,
    };
    this.props.updateFish(key, updatedFish);
  }

  authenticate = (provider) => {
    console.log('Try to auth');
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout = () => {
    console.log('LOGOUT!');
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler = (err, authData) => {
    console.log(authData);
    if(err) {
      console.error(err);
      return;
    }

    const storeRef = base.database().ref(this.props.storeId);
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // If current store does not have owner yet
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid,
      });
    });
  }

  renderInventory = (key) => {
    const fish = this.props.fishes[key];
    return (
      <div className='fish-edit' key={key}>
        <input type="text" name="name" value={fish.name} onChange={(e) => this.handleChange(e, key)} placeholder="Fish Name"/>
        <input type="text" name="price" value={fish.price} onChange={(e) => this.handleChange(e, key)} placeholder="Fish Price"/>
        <select type="text" name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)} placeholder="Fish Status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)} placeholder="Fish Description">
        </textarea>
        <input type="text" name="image" value={fish.image} onChange={(e) => this.handleChange(e, key)} placeholder="Fish Image"/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  }

  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's Inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>
          Log in with Github
        </button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>
          Log in with Facebook
        </button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>
          Log in with Twitter
        </button>
      </nav>
    );
  }


  render = () => {
    const logout = <button onClick={() => this.logout()}>Log Out!</button>;

    if (this.state.uid === null) {
      return this.renderLogin();
    }

    if (this.state.uid !== this.state.owner) {
      return(
        <div>
          <p>Sorry, You're not the owner of current store!</p>
        </div>
      );
    }

    return (
      <div>
        {logout}
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired,
};

export default Inventory;
