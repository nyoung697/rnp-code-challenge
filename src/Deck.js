import React from 'react';
import { Panel } from 'react-bootstrap';
//var shuffle = require('knuth-shuffle').knuthShuffle;
import shuffleArray from './shuffleArray';

//Manually create the deck, as it never changes
const cards = [
  'CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', //Clubs
  'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', //Diamonds
  'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', //Hearts
  'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK'  //Spades
];

class Deck extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cards,
      numPlayers: 1,
      hands: [
      ]
    };

    this.handleChangeNumPlayers = this.handleChangeNumPlayers.bind(this);
    this.handleClickShuffle = this.handleClickShuffle.bind(this);
    this.handleClickDeal = this.handleClickDeal.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChangeNumPlayers(event) {
    var n = event.target.value;
    if (n < 1) n = 1;
    this.setState({numPlayers: Number(n)});
  }

  handleClickShuffle() {
    this.setState({
      cards: this.shuffleCards()
    });
  }

  handleClickDeal(numCards) {
    const { numPlayers } = this.state;

    var obj = this.dealCards(numPlayers, numCards);

    this.setState({
      cards: obj.cardsCopy,
      hands: obj.handsCopy
    });
  }

  handleReset() {
    this.setState({
      cards,
      hands: [
      ]
    })
  }

  shuffleCards() {
    return shuffleArray(this.state.cards.slice());
  }

  dealCards(numPlayers, numCards) {
    const { cards, hands } = this.state;

    //create copy of cards and hands array as not to mutate
    var cardsCopy = cards.slice();
    var handsCopy = hands.map(hand => {
      return hand.slice();
    })

    //figure out how many cards to deal in total
    //if -1 is passed in, then deal all cards
    var cardsToDeal = numPlayers * numCards;
    if (cardsToDeal < 0 || cardsToDeal > 52) cardsToDeal = 52;

    var cardCounter = 0;
    while (cardsCopy.length > 0 && cardCounter < cardsToDeal) {
      for (let iPlayer = 0; iPlayer < numPlayers; iPlayer++) {
        //always get top card on deck (first item in array)
        const card = cardsCopy[0];

        //break out of this loop if there are no cards left in the array
        if (!card)
          break;

        //create hand or grab existing hand
        if (handsCopy.length <= iPlayer) {
          handsCopy.push([ ]);
        }

        var hand = handsCopy[iPlayer];

        hand.push(card);

        //remove card from cardsCopy
        cardsCopy.splice(0, 1);

        //increment card counter
        cardCounter++;
      }
    }

    //return cardsCopy and handsCopy arrays
    return {
      cardsCopy,
      handsCopy
    }
  }

  render() {
    const { cards, hands } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-lg-4">
            <Panel header="Deck" bsStyle="danger">
              <strong>Count: </strong> {cards.length} <br />
              <strong>Cards: </strong>
              {cards.join(', ')}
            </Panel>            
          </div>
          <div className="col-lg-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                Hands
              </div>
              <PlayerHands hands={hands} />
            </div>
          </div>
          <div className="col-lg-2">
            <Panel header="Deck Controls" bsStyle="info">
              <form>
                <div className="form-group">
                  <label>Num Players</label>
                  <input className="form-control" type="number" min={1} value={this.state.numPlayers} onChange={this.handleChangeNumPlayers} />
                </div>
              </form>
              <button className="btn btn-primary btn-block" onClick={() => this.handleClickShuffle()}><strong>Shuffle</strong></button>
              <button className="btn btn-success btn-block" onClick={() => this.handleClickDeal(1)}><strong>Deal 1</strong></button>
              <button className="btn btn-success btn-block" onClick={() => this.handleClickDeal(-1)}><strong>Deal All</strong></button>
              <button className="btn btn-danger btn-block" onClick={() => this.handleReset()}><strong>New Game</strong></button> 
            </Panel>
          </div>
        </div>
      </div>      
    )
  }
}

const PlayerHands = (props) => {
  const { hands } = props;
  const listItems = hands.map((hand, i) => 
    <li key={i} className="list-group-item">
      <strong>Player {i + 1} ({hand.length}): </strong> {hand.join(', ')}
    </li>
  );

  return (
    <ul className="list-group">
      {listItems}
    </ul>    
  )
}

export default Deck;