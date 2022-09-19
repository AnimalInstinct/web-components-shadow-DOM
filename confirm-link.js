class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', e => {
            if (!confirm('Do you really wont to leave?')) {
                e.preventDefault();
            }
        })
    }
}

customElements.define('confirm-link', ConfirmLink, {extends: 'a'})