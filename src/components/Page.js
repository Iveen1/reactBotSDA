import React from "react";
import accountData from '../BotSDA/accountDump.json';
import itemsData from '../BotSDA/itemsDump.json';
import Card from './Card';
const SteamTotp = require('steam-totp');
const accounts = accountData.accounts;
const items = itemsData.items;


export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 10 };
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
    
    render() {
        if(this.props.name === '2FA'){
            return (
                    <div class="header">
                        <h2>{this.props.name}</h2>
                        {accounts.map(data => (<Card header={<h2>{data.login}</h2>} second={<h3>Пароль: {data.passwd}</h3>} third={<h3>2FA: {SteamTotp.generateAuthCode(data.secret_key)}</h3>} fourth={<p>Последний пользователь: {data.last_user} в {data.last_request_time} </p>} count={this.state.seconds} dontchange={true}></Card>))}
                    </div>
            )
        }else if(this.props.name === 'Маркет'){
            return(
                    <div class="header">
                        <h2>{this.props.name}</h2>
                        {items.map(data => (<Card header={<a href={`${data.item_link}`}>{<img src={`${data.img_url}`}/>}</a> } second={<h3>Цена: {data.price}</h3>} fou={<h3>{data.last_update_date}</h3>} hoveredinfo={data.item_name}></Card>))}
                    </div>
            )
        }else{
            return(
                <div className="header">
                <article>
                    <h2>шото не туда ты попал</h2>
                </article>
            </div>
            )
        }
        
    }
}