import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  addFish = fish => {
    // maak een kopie
    const fishes = { ...this.state.fishes };
    // nieuwe vis toevoegen
    fishes[`fish${Date.now()}`] = fish;
    // nieuwe vis object in state zetten
    this.setState({ fishes }); // fishes: fishes
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  deleteFish = key => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null; // anders pakt firebase het niet
    // 3. update state
    this.setState({ fishes });
  };

  removeFromOrder = key => {
    // 1. kopie van state
    const order = { ...this.state.order };
    // 2 remove item from order and update order
    delete order[key];
    // 3. setsate om state te updaten
    this.setState({ order }); // order: order
  };

  addToOrder = key => {
    // 1. kopie van state
    const order = { ...this.state.order };
    // 2 update order of update de order
    order[key] = order[key] + 1 || 1;
    // 3. setsate om state te updaten
    this.setState({ order }); // order: order
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
