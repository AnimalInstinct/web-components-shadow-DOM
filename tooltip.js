class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = "Default tooltip text from the constructor";
        console.log('Constructor::tooltipText:: ', this._tooltipText);
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
        <style>
            @import "tooltip.css";
        </style>
        <slot>Default tooltip text</slot>
        <span>?</span>
        <a id="test" href="#">Click me to set new tooltip text</a>
        `;
    }
    
    connectedCallback() {
        console.log('Component connected');
        this._tooltipText = this.getAttribute('text');
        this._tooltipIcon = this.shadowRoot.querySelector('span')
        console.log('connectedCallback::tooltipText:: ', this._tooltipText);

        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.shadowRoot.appendChild(this._tooltipIcon);

        const testButton = this.shadowRoot.querySelector('#test')
        testButton.addEventListener('click', this.changeHandler.bind(this))
    }

    disconnectedCallback() {
        console.log('Component disconnected');
    }

    changeHandler() {
        this._tooltipText = 'New tooltip text changed!'
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'text') {
            console.log('attributeChangedCallback::Tooltip text changed to::', newValue);
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text']
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();
    }

    _render() {
        console.log('Render function');
        let tooltipContainer;

        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText || "Dummy"
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            tooltipContainer = this.shadowRoot.querySelector('div')
            tooltipContainer && this.shadowRoot.removeChild(tooltipContainer)
        }
    }
}

customElements.define('components-tooltip', Tooltip)