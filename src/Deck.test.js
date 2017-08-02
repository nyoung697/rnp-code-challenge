import React from 'react';
import ReactDOM from 'react-dom';
import Deck from './Deck';

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

test ('deck is dealt from top', () => {
  //unshuffled deck starts with clubs CA, C2, C3, C4, etc...
  var deck = new Deck();
  var obj = deck.dealCards(4, 1); //4 players, 1 card each
  expect(obj.handsCopy[0][0]).toBe("CA");
  expect(obj.handsCopy[1][0]).toBe("C2");
  expect(obj.handsCopy[2][0]).toBe("C3");
  expect(obj.handsCopy[3][0]).toBe("C4");
})

test ('deck is shuffled', () => {
  var deck = new Deck();
  var cards = deck.state.cards
  var shuffledCards= deck.shuffleCards();

  //These tests could potentially fail even if the array gets shuffled... if by coincidence the random sampled index doesn't get swapped.
  expect(shuffledCards[0]).not.toBe(cards[0]);
  expect(shuffledCards[8]).not.toBe(cards[8]);
  expect(shuffledCards[47]).not.toBe(cards[47]);
})