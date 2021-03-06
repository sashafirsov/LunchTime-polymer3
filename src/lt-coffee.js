/**
 * team list with add and change member ability
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';

import './shared-styles.js';
import {matchCoffee, bookCoffee} from './match-coffee';

class LtCoffee extends PolymerElement {
    static get template() {
        return html`
            <style include="shared-styles">
                :host {
                    display: block;
                    padding: 10px;
                }
                img{ max-width: 10em;max-height: 10em; }
                .card img{ float: right }
                label{ display: inline-block }
            </style>
    
            <div class="card" style="text-align: center">
                <template is="dom-if" if="{{coffeeCandidates.length}}">
                    <h1>Lets get coffee with someone random </h1>
                    <div>
                        <paper-radio-button>
                            <div> [[seeker.nickname]] </div>
                            <img src="[[seeker.imageUrl]]"/>
                        </paper-radio-button>
                        <paper-radio-button>
                            <div></div>
                            <img src="http://www.stickpng.com/assets/images/5a01907e7ca233f48ba62720.png"/>
                        </paper-radio-button>
                        <paper-radio-button>
                            <div> [[selected.nickname]]</div>
                            <img src="[[selected.imageUrl]]"/>
                        </paper-radio-button>
                    </div>
                
                    <paper-button raised on-click="_save"> Lets go!</paper-button>
                </template>
                <template is="dom-if" if="{{!coffeeCandidates.length}}">
                    <p>You've already caffeinated with everyone! Try <a href="./lunch" >lunch</a> instead.</p>
                </template>
            </div>
            <lt-team-list selected="{{selected}}" team="[[coffeeCandidates]]" ></lt-team-list>  
            <template is="dom-if" if="{{caffeinated.length}}">
                <hr/>  
                <h3>Caffeinated together</h3>    
                <lt-team-list team="[[caffeinated]]" ></lt-team-list>  
            </template>      
        `;
    }

    static get properties() {
        return {
            seeker: {type:Object, observer: '_seekerChanged'},
            selected: Object,
            team: Array,
            coffeeCandidates: Array,
            caffeinated: {type:Array,value:[]}
        };
    }

    ready() {
        this._seekerChanged();
        super.ready();
    }

    updateCaffeinated(){ this.caffeinated = this.seeker.coffeeBreaks.map( id=> this.team.find( el=> el.id===id ) ) }

    _seekerChanged(){
        this.coffeeCandidates = matchCoffee( this.team, this.seeker );
        this.selected = this.coffeeCandidates[ Math.floor( Math.random() * this.coffeeCandidates.length ) ];
        this.updateCaffeinated();
    }

    _save() {
        bookCoffee( this.team, this.seeker, this.selected );
        this._seekerChanged();
    }

}

window.customElements.define('lt-coffee', LtCoffee);
