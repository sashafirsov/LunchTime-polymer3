import {matchCoffee, bookCoffee} from '../src/match-coffee.js';

suite('matchCoffee tests', function () {
    const sel = { id:17, coffeeBreaks:[] };
    const pair = { id:19, coffeeBreaks:[] };
    const clone = a => JSON.parse(JSON.stringify(a));

    test('list should exclude selection, beginning', function () {
        let  team = [ sel, { id:2, pair } ];

        let arr = matchCoffee( team, sel );
        assert.equal( team.length, arr.length + 1  );
        assert.equal( team.find( el=> el.id == sel.id), sel         );
        assert.equal(  arr.find( el=> el.id == sel.id), undefined   );
    });
    test('list should exclude selection, middle', function () {
        let  team = [ { id:1, coffeeBreaks:[] }, sel, pair ];

        let arr = matchCoffee( team, sel );
        assert.equal( team.length, arr.length + 1  );
        assert.equal( team.find( el=> el.id == sel.id), sel         );
        assert.equal(  arr.find( el=> el.id == sel.id), undefined   );
    });
    test('set coffee pair should add to coffeeBreaks', function () {
        const s = clone(  sel )
        ,     p = clone( pair );
        let  team = [ { id:1, coffeeBreaks:[] }, s, p ];

        let arr = bookCoffee( team, s, p );
        assert.equal( team.length, arr.length + 2  );
        assert.equal( s.coffeeBreaks.includes( pair.id ), true     ,'pair stored in selection' );
        assert.equal( p.coffeeBreaks.includes(  sel.id ), true     ,'selection stored in pair' );
        assert.equal(  arr.find( el=> el.id == sel.id), undefined  ,'selection is excluded from result' );
        assert.equal(  arr.find( el=> el.id ==pair.id), undefined  ,'pair is excluded from result'      );
    });
});
