/**
 * team list with add and change member ability
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';

import './shared-styles.js';

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
        paper-radio-button img{ display: block }
        .team-list{ text-align: center }
        paper-radio-button { --layout-inline_-_display:none }
        .team-list label{ max-width: 10em }
        .team-list paper-radio-button[checked]{ box-shadow: inset 0 0 3em green }
        .team-list paper-radio-button{ border: dashed 2px transparent }
        .team-list paper-radio-button:focus{ border:dashed silver 2px }
      </style>

      <div class="card">
        <img src="[[imageUrl]]" />
        <div class="intro">Lets get someone random to go get coffee or join group for lunch
        </div>
        <h1>Who am I?   </h1>
        <paper-input always-float-label label="Nickname"           name="nickname"  value="{{nickname}}" ></paper-input>
        <paper-input always-float-label label="Avatar Image URL"   name="image-url" value="{{imageUrl}}" ></paper-input>
        <paper-button raised on-click="_save"    > Update     </paper-button>
        <paper-button raised on-click="_create"  > Create     </paper-button>
      </div>
      <div class="team-list">
        <paper-radio-group selected="{{selectedId}}">
          <template is="dom-repeat" items="{{team}}">
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
              nickname: String,
              imageUrl: String,
            selectedId: { type:String, observer: '_idChanged', notify: true },
              selected: { type:Object , notify: true },
                  team: { type: Array },
        };
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
        this.set(`selected.nickname`   , this.nickname );
        this.set(`selected.imageUrl`   , this.imageUrl );
    }
    _create(){
        this._fixPersonal();

        const o = { id: this.team.length, nickname: this.nickname, imageUrl: this.imageUrl };
        this.unshift( 'team', o );
        this.selected = o;
    }
}

window.customElements.define('lt-team', LtTeam);
