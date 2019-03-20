import React, { Component } from 'react';
import axios from 'axios';

class Currents extends Component {



  constructor(props){
    super(props);

    this.state = { valiutos: [], btc: 0, select: null, display: [true, true, true]};
  };

  componentDidMount() {
    this.loadJson();
    this.props.displayed(this.state.display);

    setInterval(() => {
      this.loadJson();
    }, 60000);
  };


  componentWillReceiveProps(verte){

    if (verte.click) {
      this.addNewCurrent(verte.select);
      this.props.return(false);
    }

    if (verte.value !== this.state.btc) {
        this.updateState(verte.value);
    }

  };

  addNewCurrent = (id) => {
    var json = this.state.display;
    json[id] = true;
    this.setState({ valiutos: this.state.valiutos, btc: this.state.btc, select: this.state.select, display: json });
    this.props.displayed(this.state.display);

  };

  updateState = (newValue) => {

    this.setState({ valiutos: this.state.valiutos, btc: Number(newValue), select: this.state.select, display: this.state.display });
  };

  delete = (dd) => {
    var json = this.state.display;
    json[dd] = false;
    this.setState({ valiutos: this.state.valiutos, btc: this.state.btc, select: this.state.select, display: json });
    this.props.displayed(this.state.display);
  };

  loadJson = () => {

        axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then( (response) => {
        var valiutos = response.data.bpi;
        var valiutos2 = Object.keys(response.data.bpi);
        valiutos2 = valiutos2.map((number, index) =>
          valiutos2[index] = Object.assign(valiutos[number])
        );
        this.setState({ valiutos: valiutos2, btc: this.state.btc, select: this.state.select, display: this.state.display });
      })
      .catch( (error) => {
        console.log(error);
      });

  };

  convertHTMLEntity(text){
    const span = document.createElement('span');

    return text
    .replace(/&[#A-Za-z0-9]+;/gi, (entity,position,text)=> {
        span.innerHTML = entity;
        return span.innerText;
    });
};

  render(){

    var listItems = this.state.valiutos.map((valiuta, index) =>
       {
        return (this.state.display[index]) ?
         (<div key={index} className="bg-secondary rounded text-white p-2 mb-2">{this.convertHTMLEntity(valiuta.symbol)} {(valiuta.rate_float * this.state.btc).toFixed(2) }<div className="float-right font-weight-bold nocursor" onClick={() => this.delete(index)}>X</div></div>)
         : false
        });


    return(
      <div>
        {listItems}
      </div>
    );
  }
}

export default Currents;
