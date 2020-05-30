import {PolymerElement, html} from 'https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/@polymer/polymer/polymer-element.js';
import {setPassiveTouchGestures, setRootPath} from 'https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/@polymer/polymer/lib/utils/settings.js';
import  'https://cdn.xml4jquery.com/web-elements-loader/build/esm-unbundled/node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
        .disclaimer{font-family: cursive; text-align: right;}
        img{ max-width: 100%;}
        .selected{ font-family: monospace; text-align: right;}
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
      
      <app-localstorage-document key="team"      data="{{team}}"      ></app-localstorage-document>
      <app-localstorage-document key="luncheons" data="{{luncheons}}" ></app-localstorage-document>
      
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <!--<a name="view1" href="[[rootPath]]view1">Coffee </a>-->
            <!--<a name="view2" href="[[rootPath]]view2">Lunch  </a>-->
            <!--<a name="view3" href="[[rootPath]]view3">Team   </a>-->
            <a name="coffee" href="[[rootPath]]coffee">Coffee </a>
            <a name="lunch"  href="[[rootPath]]lunch" >Lunch  </a>
            <a name="team"   href="[[rootPath]]team"  >
                Team   
                <template is="dom-if" if="{{selected}}">
                    <div class="selected">
                        I am [[selected.nickname]]
                        <img src="[[selected.imageUrl]]" />
                    </div>
                </template>
            </a>   
            <a name="about"  href="[[rootPath]]about" >About  </a>
         </iron-selector>
         <div class="disclaimer">
         Images by <a href="http://www.stickpng.com/es/cat/al-cine/dibujos-animados/blancanieves?page=1">stickpng.com</a><br/>
         &copy; Sasha Firsov
         </div>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="Lunch Time">Lunch Time</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <!--<my-view1 name="view1"></my-view1>-->
            <!--<my-view2 name="view2"></my-view2>-->
            <!--<my-view3 name="view3"></my-view3>-->
            <lt-coffee  name="coffee" team="{{team}}"  seeker="[[selected]]"   ></lt-coffee>
            <lt-lunch   name="lunch"  team="[[team]]"  seeker="[[selected]]"   luncheons="{{luncheons}}"></lt-lunch>
            <lt-team    name="team"   team="{{team}}"  selected="{{selected}}" ></lt-team>
            <lt-about   name="about" ></lt-about>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
    }

    static get properties() {
        return {
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            },
            routeData: Object,
            subroute: Object,
            selected: Object,
            luncheons: {type:Array,value:[], notify: true },
            team: {
                type: Array,
                value:
                    [
                        {
                            id: 1,
                            nickname: 'Snow ',
                            coffeeBreaks:[],
                            imageUrl: 'images/SnowWhite.png'
                        },
                        {
                            id: 2,
                            nickname: 'Sneeze',
                            coffeeBreaks:[],
                            imageUrl: 'images/Sneeze.png'
                        },
                        {
                            id: 3,
                            nickname: 'Bashful',
                            coffeeBreaks:[],
                            imageUrl: 'images/Bashful.png'
                        },
                        {
                            id: 4,
                            nickname: 'Dopey',
                            coffeeBreaks:[],
                            imageUrl: 'images/Dopey.png'
                        },
                        {
                            id: 5,
                            nickname: 'Grumpy',
                            coffeeBreaks:[],
                            imageUrl: 'images/Grumpy.png'
                        },
                        {
                            id: 6,
                            nickname: 'Sleepy',
                            coffeeBreaks:[],
                            imageUrl: 'images/Sleepy.png'
                        },
                        {
                            id: 7,
                            nickname: 'Doc',
                            coffeeBreaks:[],
                            imageUrl: 'images/Doc.png'
                        },
                        {
                            id: 8,
                            nickname: 'Happy',
                            coffeeBreaks:[],
                            imageUrl: 'images/Happy.png'
                        }
                    ]

            }
        };
    }

    static get observers() {
        return [
            '_routePageChanged(routeData.page)'
        ];
    }

    _routePageChanged(page) {
        // Show the corresponding page according to the route.
        //
        // If no page was found in the route data, page will be an empty string.
        // Show 'team' in that case. And if the page doesn't exist, show 'view404'.
        if (!page) {
            this.page = 'team';
        } else if ([ 'coffee', 'lunch', 'team', 'about', 'view1', 'view2', 'view3' ].indexOf(page) !== -1) {
            if( !this.selected && page!== 'team' )
                return this.set('routeData.page','team');
            this.page = page;
        } else {
            this.page = 'view404';
        }

        // Close a non-persistent drawer when the page & route are changed.
        if (!this.$.drawer.persistent) {
            this.$.drawer.close();
        }
    }

    _pageChanged(page) {
        // Import the page component on demand.
        //
        // Note: `polymer build` doesn't like string concatenation in the import
        // statement, so break it up.
        switch (page) {
            case 'team':
                import('./lt-team.js');
                break;
            case 'coffee':
                import('./lt-coffee.js');
                break;
            case 'lunch':
                import('./lt-lunch.js');
                break;
            case 'about':
                import('./lt-about.js');
                break;
            case 'view404':
                import('./my-view404.js');
                break;
        }
    }
}

window.customElements.define('my-app', MyApp);
