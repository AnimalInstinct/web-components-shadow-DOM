class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: grey;
                    color: white;
                    position: absolute;
                }

                p {
                    position: relative;
                }
            </style>
            <slot>Default tooltip text</slot>
            <span>(?)</span>
        `;
    }
    
    connectedCallback() {
        this._tooltipText = this.getAttribute('text');
        console.log('Connected callback');
        const tooltipIcon = this.shadowRoot.querySelector('span')
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.shadowRoot.appendChild(tooltipIcon);
    }

    _showTooltip() {
        console.log('Show tooltip');
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText || "Dummy"
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        console.log('Hide Tooltip');
        this.shadowRoot.removeChild(this._tooltipContainer)
    }

    disconnectedCallback() {
        console.log('DisconnectedCallback');
    }
}

customElements.define('components-tooltip', Tooltip)