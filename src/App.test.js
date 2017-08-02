import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Deck from './Deck';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it ('deck component renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Deck />, div);
});

test ('deck has correct number of cards', () => {
  var deck = new Deck();
  var cards = deck.state.cards;
  expect(cards.length).toBe(52);
});

test ('deck has 51 cards after dealing 1 hand of 1 card', () => {
  var deck = new Deck();
  var obj = deck.dealCards(1, 1);
  expect(obj.cardsCopy.length).toBe(51);
});

test ('deck has 36 cards after dealing 4 hands of 4 cards', () => {
  //52 - 16 = 36
  var deck = new Deck();
  var obj = deck.dealCards(4, 4);
  expect(obj.cardsCopy.length).toBe(36);
});

