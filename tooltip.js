class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
    }
    
    connectedCallback() {
        console.log('Connected callback');
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this.appendChild(tooltipIcon);
    }

    _showTooltip() {
        console.log('Show tooltip');
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = "This is the tooltip text!"
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        console.log('Hide Tooltip');
        this._
    }

    disconnectedCallback() {
        console.log('DisconnectedCallback');
    }
}

customElements.define('components-tooltip', Tooltip)