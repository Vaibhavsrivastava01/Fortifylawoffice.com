/* ===========================
   BCI Disclaimer Popup Script
   =========================== */

class DisclaimerPopup {
    constructor() {
        this.storageKey = 'fortify-law-disclaimer-accepted';
        this.init();
    }

    init() {
        // Check if disclaimer has been accepted
        if (!this.hasAcceptedDisclaimer()) {
            this.show();
        }
    }

    hasAcceptedDisclaimer() {
        const accepted = localStorage.getItem(this.storageKey);
        return accepted === 'true';
    }

    show() {
        this.createPopup();
        this.attachEventListeners();
    }

    createPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'disclaimer-popup-overlay';
        overlay.id = 'disclaimerPopup';

        overlay.innerHTML = `
            <div class="disclaimer-popup-container">
                <div class="disclaimer-popup-header">
                    <i class="fas fa-balance-scale"></i>
                    <h2>Legal Disclaimer</h2>
                </div>
                
                <div class="disclaimer-popup-content">
                    <span class="disclaimer-badge">⚖️ Important Notice</span>
                    <h3>Professional Disclaimer</h3>
                    
                    <div class="disclaimer-text">
                        <p>
                            <strong>Fortify Law Office</strong> is a professional law firm providing legal services in accordance with the laws of India. This website and all content herein are provided for informational purposes only and do not constitute legal advice.
                        </p>
                        
                        <p>
                            <strong>Attorney-Client Relationship:</strong> Viewing or using this website does not create an attorney-client relationship between you and Fortify Law Office. An attorney-client relationship is established only upon written agreement.
                        </p>
                        
                        <p>
                            <strong>No Legal Advice:</strong> The information provided on this website is general in nature and should not be construed as legal advice for any specific situation. You should not act or refrain from acting on the basis of any content included in this site without seeking appropriate legal or professional advice.
                        </p>
                        
                        <p>
                            <strong>Jurisdiction & Choice of Law:</strong> This website and all materials therein are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.
                        </p>
                        
                        <p>
                            <strong>Bar Council of India (BCI) Compliance:</strong> Our firm is regulated by the Bar Council of India. We comply with all BCI regulations regarding professional conduct and client confidentiality. For more information, visit <a href="https://www.barcouncilofindia.org" target="_blank">www.barcouncilofindia.org</a>.
                        </p>
                        
                        <p>
                            <strong>Confidentiality:</strong> While we take reasonable measures to protect your information, you should not send any confidential information through this website unless explicitly instructed to do so. Any unsolicited information sent to us through this website will not be treated as confidential.
                        </p>
                        
                        <p>
                            <strong>Past Results:</strong> Past performance or results do not guarantee or predict future outcomes. Each matter is unique and dependent on its own specific facts and circumstances.
                        </p>
                        
                        <p>
                            <strong>Changes to Website:</strong> Fortify Law Office reserves the right to modify or discontinue any portion of this website at any time without notice.
                        </p>
                        
                        <p>
                            <strong>Third-Party Links:</strong> This website may contain links to third-party websites. We are not responsible for the content or accuracy of external websites and their inclusion does not constitute an endorsement.
                        </p>
                    </div>
                </div>
                
                <div class="disclaimer-popup-footer">
                    <label class="disclaimer-checkbox">
                        <input type="checkbox" id="disclaimerCheckbox" />
                        <span class="checkbox-label">I have read and understand the disclaimer</span>
                    </label>
                    <button class="proceed-button" id="proceedButton" disabled>
                        <span>Proceed to Website</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.prepend(overlay);

        // Blur main content
        const mainContent = document.querySelector('.main-content-wrapper');
        if (mainContent) {
            mainContent.classList.add('blurred');
        }
    }

    attachEventListeners() {
        const checkbox = document.getElementById('disclaimerCheckbox');
        const proceedButton = document.getElementById('proceedButton');
        const popup = document.getElementById('disclaimerPopup');

        checkbox.addEventListener('change', () => {
            proceedButton.disabled = !checkbox.checked;
        });

        proceedButton.addEventListener('click', () => {
            this.acceptDisclaimer();
        });

        // Close on Escape key (but only if checkbox is checked)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && checkbox.checked) {
                this.acceptDisclaimer();
            }
        });
    }

    acceptDisclaimer() {
        localStorage.setItem(this.storageKey, 'true');
        
        const popup = document.getElementById('disclaimerPopup');
        popup.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        setTimeout(() => {
            popup.remove();
            
            // Remove blur from main content
            const mainContent = document.querySelector('.main-content-wrapper');
            if (mainContent) {
                mainContent.classList.remove('blurred');
            }
        }, 300);
    }

    reset() {
        localStorage.removeItem(this.storageKey);
        this.show();
    }
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DisclaimerPopup();
    });
} else {
    new DisclaimerPopup();
}