import React from "react";
import Switch from '@material-ui/core/Switch';
import accountData from '../BotSDA/accountDump.json';
import itemsData from '../BotSDA/itemsDump.json';
import Card from './Card';
const SteamTotp = require('steam-totp');
let accounts = accountData.accounts;
let items = itemsData.items;

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 10, priceSwitch: false, currencySwitch: false, currentrate: 74};
    this.priceSortSwitch = this.priceSortSwitch.bind(this);
    this.currencySwitch = this.currencySwitch.bind(this);
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds - 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  priceSortSwitch() { 
    this.setState(prevState => ({ priceSwitch: !prevState.priceSwitch}));
  };

  currencySwitch() {
    this.setState(prevState => ({ currencySwitch: !prevState.currencySwitch}));
  }

  pricecheck(price){
    if (this.state.currencySwitch){
      return (parseFloat(price) * this.state.currentrate).toFixed(2) + '₽';
    } else {
      return parseFloat(price) + '$';
    }
    
  }

  render() {
    if (this.state.priceSwitch){
      (items.sort(function (a, b) {
        return b.price - a.price;
      }))
    } 
    if (this.state.priceSwitch === false){
      (items.sort(function (a, b) {
        return a.id - b.id;
      }))
    } 



    if (this.props.name === '2FA') {
      return (
        <div class="header">
          <h2>{this.props.name}</h2>
          {accounts.map(data => (<Card header={<h2>{data.login}</h2>} second={<h3>Пароль: {data.passwd}</h3>} third={<h3>2FA: {SteamTotp.generateAuthCode(data.secret_key)}</h3>} fourth={<p>Последний пользователь: {data.last_user} в {data.last_request_time} </p>} count={this.state.seconds} dontchange={true}></Card>))}
        </div>
      )
    } else if (this.props.name === 'Маркет') {
      return (
        <div class="header">
          <h2>{this.props.name}</h2>

          <p>Сортировка по цене</p> <Switch checked={this.state.priceSwitch} onChange={this.priceSortSwitch} name="priceSwitch"  inputProps={{ 'aria-label': 'secondary checkbox' }}/>
          <p>Изменение валюты</p> <Switch checked={this.state.currencySwitch} onChange={this.currencySwitch} name="currencySwitch"  inputProps={{ 'aria-label': 'secondary checkbox' }}/>
          {items.map(data => (<Card header={<a href={`${data.item_link}`}>{<img src={`${data.img_url}`} />}</a>} second={<h3>Цена: {this.pricecheck(data.price, data.currency_type)}</h3>} fourth={<h3>{data.last_update_date}</h3>} hoveredinfo={data.item_name}></Card>))}
        </div>
      )
    } else {
      return (
        <div className="header">
          <article>
            <h2>шото не туда ты попал</h2>
          </article>
        </div>
      )
    }

  }
}