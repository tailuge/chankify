import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Entry } from './Entry'
import { HanDict } from './HanDict'

const testDict = [
    { hanzi: "a", pinyin: "ah", meaning: "any" },
    { hanzi: "b", pinyin: "be", meaning: "anyb" },
    { hanzi: "bb", pinyin: "bebe", meaning: "anybb" }
];

const dict = new HanDict(testDict)

test('finds word', () => {
    expect(dict.longestPrefixMatch("a")).toBeDefined()
    expect(dict.longestPrefixMatch("a").hanzi).toEqual("a")
});

test('does not find word', () => {
    expect(dict.longestPrefixMatch("x").hanzi).toEqual("")
});
