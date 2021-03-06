'use strict';

require('./lib/test-setup.js');

const angular = require('angular');
const cowsay = require('cowsay-browser');

describe('Cowsay Controller', function() {
  beforeEach(() => {
    angular.mock.module('cowsayApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });

  describe('initial properties', () => {
    it('title property should equal Cow Creator.', () => {
      expect(this.cowsayCtrl.title).toBe('Cow Creator.');
    });
    it('the second title property should equal make it view it and undo it', ()=> {
      expect(this.cowsayCtrl.secondTitle).toBe('make it, view it, and undo it!');
    });
    it('sub title 1 should say view it', () => {
      expect(this.cowsayCtrl.subTitle1).toBe('view it!');
    });
    it('sub title 2 should say check out the cow you made!', () => {
      expect(this.cowsayCtrl.subTitle2).toBe('check out the cow you just made!');
    });
    it('history property should be an empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });
    it('list of cowfiles should show proper cowfiles', ()=> {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
        expect(this.cowsayCtrl.current).toEqual(list[0]);
      });
    });
  });

  describe('#update', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current});
      let result = this.cowsayCtrl.update('testing');
      expect(result).toEqual(expected);
    });
  });

  describe('#speak', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      this.cowsayCtrl.speak('testing');
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history[0]).toEqual(expected);
    });
  });

  describe('#undo', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      this.cowsayCtrl.speak('testing');
      this.cowsayCtrl.speak('testing again');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history.length).toEqual(0);
    });
  });
});
