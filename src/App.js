import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Currents from './components/Currents';

class App extends Component {
  constructor(props){
    super(props);

    this.state = { btc: 0, select: 0, click: false, displayed: [true, true, true] };
  }

  componentDidMount() {

    this.setState({ btc: this.state.btc, select: this.state.select, click: this.state.click, displayed: this.state.displayed })

  }

  btcValue = (event) => {
    if(event !== event.target.value)
    {
      this.setState({ btc: event.target.value, select: this.state.select, click: this.state.click, displayed: this.state.displayed })
    }
  }

  select = () => {
    var e = document.getElementById("select");
    var value = e.options[e.selectedIndex].value;
    if(value !== this.state.select)
    {
      this.setState({ btc: this.state.btc, select: Number(value), click: true, displayed: this.state.displayed })
    }
  }

  clickreturn = (signal) => {

    this.setState({ btc: this.state.btc, select: this.state.select, click: signal, displayed: this.state.displayed })

  }

  displayed = (elements) => {

    this.setState({ btc: this.state.btc, select: this.state.select, click: this.state.click, displayed: elements })

  }

  render() {

    var currents = ["USD", "GBD", "EURO"]

    var options = this.state.displayed.map((value, index) =>
       {
        return this.state.displayed[index] ?
          false : (<option key={index} value={index}>{currents[index]}</option> )
       });

    var filtered = options.filter(word => word !== false);

    var currentsOptions;

    if (filtered.length > 0 )
    {
      currentsOptions =
      <div><label>Add Currency:</label><select id="select" className="form-control">
       {filtered}
       </select> <button type="button" className="btn btn-secondary mt-2 w-100" onClick={this.select.bind(this)}>Add</button></div>;
    }
    else
    {
      currentsOptions =
      <div><label>Add Currency:</label></div>;

    }

    var viskas =
    <div className="row p-2">
      <div className="col-4">
          <div className="form-group">
            <label>BTC value:</label>
            <input maxLength="10" className="form-control" onChange={this.btcValue} />
          </div>
      </div>
      <div className="col-4">
          <div className="form-group">
            <label>Value in Currency:</label>
                <Currents value={this.state.btc} select={this.state.select} click={this.state.click} return={this.clickreturn.bind(this)} displayed={this.displayed.bind(this)} />
          </div>
      </div>
      <div className="col-4">
          <div className="form-group">
              {currentsOptions}
          </div>
      </div>
    </div>;


    return (
      <div className="App">

          <div className="bg-light center mt-5 rounded shadow" style={{width: "80%", minWidth: "700px"}}>
             {viskas}
          </div>

      </div>
    );
  }
}

export default App;
