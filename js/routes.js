import { $id, $cl } from './util';

const root = null;
const useHash = true; // Defaults to: false
const hash = '#!'; // Defaults to: '#'
let router = new Navigo(root, useHash, hash);

const frontPage = $id('front-page');