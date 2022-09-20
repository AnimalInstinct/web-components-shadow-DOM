class Collapsible extends HTMLElement {
    constructor() {
        super();
        this._isOpened = false
        this._button;
        this._drawer;
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
        <style>@import "collapsible.css"</style>
        <button></button>
        <div><slot>No content...</slot></div>
        `;
    }

    connectedCallback() {
        this._initButton();
        this._initDrawer();
    }

    _initButton() {
        const button = this.shadowRoot.querySelector('button')
        this._button = button;
        button.innerText = "Show hidden"
        button.addEventListener('click', this._toggleDrawer.bind(this))
    }

    _initDrawer() {
        const drawer = this.shadowRoot.querySelector('div')
        this._drawer = drawer;
    }

    _toggleDrawer() {
        if (this._isOpened) {
            this._isOpened = false;
            this._drawer.style.display = "none"
            this._button.innerText = "Show hidden"
        } else {
            this._isOpened = true;
            this._drawer.style.display = "block"
            this._button.innerText = "Hide"
        }
    }
}

customElements.define('components-collapsible', Collapsible)