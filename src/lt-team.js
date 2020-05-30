/**
 * team list with add and change member ability
 */

import {PolymerElement, html} from 'https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/@polymer/polymer/polymer-element.js';

import './shared-styles.js';
import './lt-team-list.js';

class LtTeam extends PolymerElement {
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
    
            <div class="card">
                <img src="[[imageUrl]]" />
                <p>Lets get someone random to go get coffee or join group for lunch  </p>
                <h1>Who am I?   </h1>
                <paper-input always-float-label label="Nickname"           name="nickname"  value="{{nickname}}" ></paper-input>
                <paper-input always-float-label label="Avatar Image URL"   name="image-url" value="{{imageUrl}}" ></paper-input>
                <paper-button raised on-click="_save"    > Update     </paper-button>
                <paper-button raised on-click="_create"  > Create     </paper-button>
            </div>
            <lt-team-list selected="{{selected}}" team="[[team]]" nickname="{{nickname}}" image-url="{{imageUrl}}" selected-id="{{selectedId}}"></lt-team-list>
        `;
    }

    static get properties() {
        return {
              nickname: String,
              imageUrl: String,
            selectedId: { type:String, notify: true },
              selected: { type:Object, notify: true, observer:'_onSelected' },
                  team: { type: Array, notify: true  },
        };
    }
    ready() {
        if( !this.selected )
            this.selected = this.team[ this.team.length - 1 ];
        this.nickname   = this.selected.nickname;
        this.imageUrl   = this.selected.imageUrl;
        this.selectedId = this.selected.id;

        super.ready();
    }
    _onSelected(){
        this.nickname = this.selected.nickname;
        this.imageUrl = this.selected.imageUrl;
    }

    _fixPersonal(){
        if( !this.nickname )
            this.nickname = "Anonymous";
        if( !this.imageUrl )
            this.imageUrl = "images/Witch.png";
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

        const o = { id: this.team.length, nickname: this.nickname, imageUrl: this.imageUrl, coffeeBreaks:[] };
        this.unshift( 'team', o );
        this.selected   = o;
        this.selectedId = o.id;
    }
}

window.customElements.define('lt-team', LtTeam);
