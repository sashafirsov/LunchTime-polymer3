/**
 * team list with add and change member ability
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';

import './shared-styles.js';

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
        .team-list{ text-align: center }
        .team-list label{ max-width: 10em }
        paper-radio-button img{ display: block }
        paper-radio-button{ --layout-inline_-_display:none }
        paper-radio-button[checked]{ box-shadow: inset 0 0 3em green }
        paper-radio-button{ border: dashed 2px transparent }
        paper-radio-button:focus{ border:dashed silver 2px }
        paper-radio-button div{ text-align: center  }
      </style>

      <div class="card" style="text-align: center">        
        <h1>Lets get coffee with someone random  </h1>
        <div >
            <paper-radio-button>
                <div> [[seeker.nickname]] </div>
                <img src="[[seeker.imageUrl]]" />
            </paper-radio-button>
            <paper-radio-button>
                <div>  </div>
                <img src="http://www.stickpng.com/assets/images/5a01907e7ca233f48ba62720.png" />
            </paper-radio-button>
            <paper-radio-button>
                <div> [[selected.nickname]] </div>
                <img src="[[selected.imageUrl]]" />
            </paper-radio-button>
        </div>
        
        <paper-button raised on-click="_save"    > Lets go!     </paper-button>
      </div>
      <div class="team-list">
        <paper-radio-group selected="{{selectedId}}">
          <template is="dom-repeat" items="[[team]]">
            <paper-radio-button name="[[item.id]]" >
                [[item.nickname]]
                <img src="[[item.imageUrl]]" />
            </paper-radio-button>         
          </template>
        </paper-radio-group>
        
      </div>
    `;
    }

    static get properties() {
        return {
                seeker: Object,
            selectedId: { type:String, observer: '_idChanged', notify: true },
              selected: { type:Object , notify: true },
                  team: { type: Array },
        };
    }
    ready() {
        if( !this.selected )
            this.selected = this.team[ this.team.length - 1 ];
        this.nickname = this.selected.nickname;
        this.imageUrl = this.selected.imageUrl;

        super.ready();
    }

    _idChanged( id ) {
        const o = this.team.find( el=> el.id === id );
        Object.assign( this, o );
        this.set('selected', o);
    }
    _fixPersonal(){
        if( !this.nickname )
            this.nickname = "Anonymous";
        if( !this.imageUrl )
            this.imageUrl = "http://www.stickpng.com/assets/images/5874cfb542e4d628738559e5.png";
    }
    _save(){
        this._fixPersonal();
        let i = this.team.indexOf( this.selected );
        this.set(`selected.nickname`   , this.nickname );
        this.set(`selected.imageUrl`   , this.imageUrl );
        this.notifyPath(`team.${i}.nickname`  , this.nickname );
        this.notifyPath(`team.${i}.imageUrl`  , this.imageUrl );
    }
    _create(){
        this._fixPersonal();

        const o = { id: this.team.length, nickname: this.nickname, imageUrl: this.imageUrl };
        this.unshift( 'team', o );
        this.selected   = o;
        this.selectedId = o.id;
    }
}

window.customElements.define('lt-coffee', LtCoffee);
