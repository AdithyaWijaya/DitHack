// Bypass Detection!
// Developer : ADITHYA

(function() {
    'use strict';

    // Backup original addEventListener
    const originalAddEventListener = window.addEventListener;
    const originalDocumentAddEventListener = document.addEventListener;
    const originalEventTargetAddEventListener = EventTarget ? EventTarget.prototype.addEventListener : null;

    // Shared blocked events list
    const blockedEvents = [
        'blur', 'focus', 'visibilitychange', 'focusin', 'focusout',
        'resize',
        'fullscreenchange', 'fullscreenerror',
        'contextmenu'
    ];

    // =====================================================
    // Page Visibility API & blur/focus Events
    // =====================================================

    Object.defineProperty(document, 'hidden', {
        get: function() { return false; },
        configurable: false
    });

    Object.defineProperty(document, 'visibilityState', {
        get: function() { return 'visible'; },
        configurable: false
    });

    Object.defineProperty(document, 'onvisibilitychange', {
        get: function() { return null; },
        set: function() { },
        configurable: false
    });

    Object.defineProperty(window, 'onfocus', {
        get: function() { return function() {}; },
        set: function() { },
        configurable: false
    });

    Object.defineProperty(window, 'onblur', {
        get: function() { return function() {}; },
        set: function() { },
        configurable: false
    });

    // =====================================================
    // Bypass Window Resizing Detection
    // =====================================================

    Object.defineProperty(window, 'onresize', {
        get: function() { return function() {}; },
        set: function() { },
        configurable: false
    });

    // Mock window dimensions
    let mockWidth = window.innerWidth;
    let mockHeight = window.innerHeight;

    Object.defineProperty(window, 'innerWidth', {
        get: function() { return mockWidth; },
        configurable: true
    });

    Object.defineProperty(window, 'innerHeight', {
        get: function() { return mockHeight; },
        configurable: true
    });

    Object.defineProperty(window, 'outerWidth', {
        get: function() { return mockWidth; },
        configurable: true
    });

    Object.defineProperty(window, 'outerHeight', {
        get: function() { return mockHeight; },
        configurable: true
    });

    // Screen properties
    Object.defineProperty(screen, 'width', { get: function() { return 1920; }, configurable: true });
    Object.defineProperty(screen, 'height', { get: function() { return 1080; }, configurable: true });
    Object.defineProperty(screen, 'availWidth', { get: function() { return 1920; }, configurable: true });
    Object.defineProperty(screen, 'availHeight', { get: function() { return 1040; }, configurable: true });

    window.setMockDimensions = function(width, height) {
        mockWidth = width;
        mockHeight = height;
        console.log('[Bypass] Mock dimensions set to: ' + width + 'x' + height);
    };

    // =====================================================
    // Bypass Full Screen Detection
    // =====================================================

    Object.defineProperty(document, 'fullscreenElement', {
        get: function() { return document.createElement('div'); },
        configurable: false
    });

    Object.defineProperty(document, 'fullscreenEnabled', {
        get: function() { return false; },
        configurable: false
    });

    Object.defineProperty(document, 'onfullscreenchange', {
        get: function() { return function() {}; },
        set: function() { },
        configurable: false
    });

    Object.defineProperty(document, 'onfullscreenerror', {
        get: function() { return function() {}; },
        set: function() { },
        configurable: false
    });

    // Override fullscreen methods
    Element.prototype.requestFullscreen = function() {
        console.log('[Bypass] Blocked requestFullscreen call');
        return Promise.reject(new Error('Fullscreen request blocked'));
    };

    document.exitFullscreen = function() {
        console.log('[Bypass] Blocked exitFullscreen call');
        return Promise.resolve();
    };

    // Webkit (Safari/Chrome)
    if (Element.prototype.webkitRequestFullscreen) {
        Element.prototype.webkitRequestFullscreen = function() {
            console.log('[Bypass] Blocked webkitRequestFullscreen call');
            return Promise.reject(new Error('Fullscreen request blocked'));
        };
    }

    if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen = function() {
            console.log('[Bypass] Blocked webkitExitFullscreen call');
            return Promise.resolve();
        };
    }

    // Moz (Firefox)
    if (Element.prototype.mozRequestFullScreen) {
        Element.prototype.mozRequestFullScreen = function() {
            console.log('[Bypass] Blocked mozRequestFullScreen call');
            return Promise.reject(new Error('Fullscreen request blocked'));
        };
    }

    if (document.mozExitFullScreen) {
        document.mozExitFullScreen = function() {
            console.log('[Bypass] Blocked mozExitFullScreen call');
            return Promise.resolve();
        };
    }

    // Ms (IE/Edge)
    if (Element.prototype.msRequestFullscreen) {
        Element.prototype.msRequestFullscreen = function() {
            console.log('[Bypass] Blocked msRequestFullscreen call');
            return Promise.reject(new Error('Fullscreen request blocked'));
        };
    }

    if (document.msExitFullscreen) {
        document.msExitFullscreen = function() {
            console.log('[Bypass] Blocked msExitFullscreen call');
            return Promise.resolve();
        };
    }

    // =====================================================
    // Bypass Right Click (Context Menu) Detection
    // =====================================================

    Object.defineProperty(document, 'oncontextmenu', {
        get: function() { return function() {}; },
        set: function() { },
        configurable: false
    });

    Object.defineProperty(window, 'oncontextmenu', {
        get: function() { return function() {}; },
        set: function() { },
        configurable: false
    });

    // =====================================================
    // Unified addEventListener Override
    // =====================================================
    
    window.addEventListener = function(type, listener, options) {
        if (blockedEvents.indexOf(type) !== -1) {
            console.log('[Bypass] Blocked ' + type + ' event listener');
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    document.addEventListener = function(type, listener, options) {
        if (blockedEvents.indexOf(type) !== -1) {
            console.log('[Bypass] Blocked document ' + type + ' event listener');
            return;
        }
        return originalDocumentAddEventListener.call(this, type, listener, options);
    };

    if (EventTarget && EventTarget.prototype && originalEventTargetAddEventListener) {
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (blockedEvents.indexOf(type) !== -1) {
                console.log('[Bypass] Blocked EventTarget.' + type + ' event listener');
                return;
            }
            return originalEventTargetAddEventListener.call(this, type, listener, options);
        };
    }

    // Prevent Default Context Menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        console.log('[Bypass] Prevented context menu');
        return false;
    }, true);

    console.log('[Bypass] Detection bypass loaded successfully!');

    // =====================================================
    // GUI Popup
    // =====================================================
    
    function createPopup() {
        const existingPopup = document.getElementById('tabhack-popup');
        if (existingPopup) {
            existingPopup.remove();
            return;
        }

        const popup = document.createElement('div');
        popup.id = 'tabhack-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            padding: 30px 40px;
            border-radius: 15px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 999999;
            text-align: center;
            min-width: 300px;
            border: 2px solid #0f3460;
        `;

        const authorText = document.createElement('div');
        authorText.innerHTML = '<strong>Developer</strong><br>xDitt4GT++';
        authorText.style.cssText = `
            font-size: 14px;
            color: #00d9ff;
            margin-bottom: 15px;
            line-height: 1.8;
            text-transform: uppercase;
            letter-spacing: 2px;
        `;

        const statusText = document.createElement('div');
        statusText.innerHTML = '✅ <strong>DitByPass Activated!</strong><br><span style="font-size: 12px; color: #aaa;">Detection Bypassed</span>';
        statusText.style.cssText = `
            font-size: 18px;
            margin-bottom: 15px;
            line-height: 1.6;
        `;

        const warningText = document.createElement('div');
        warningText.innerHTML = '⚠️ <strong>JANGAN REFRESH!</strong><br><span style="font-size: 11px; color: #ff6b6b;">Refresh akan membuat script tidak berfungsi!</span>';
        warningText.style.cssText = `
            font-size: 14px;
            margin-bottom: 20px;
            line-height: 1.6;
            padding: 10px;
            background: rgba(255, 107, 107, 0.1);
            border-radius: 8px;
            border: 1px solid #ff6b6b;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕ Close';
        closeBtn.style.cssText = `
            background: #e94560;
            color: white;
            border: none;
            padding: 10px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;

        closeBtn.onmouseenter = function() {
            this.style.background = '#ff6b6b';
            this.style.transform = 'scale(1.05)';
        };
        closeBtn.onmouseleave = function() {
            this.style.background = '#e94560';
            this.style.transform = 'scale(1)';
        };

        closeBtn.onclick = function() {
            popup.remove();
        };

        popup.appendChild(authorText);
        popup.appendChild(statusText);
        popup.appendChild(warningText);
        popup.appendChild(closeBtn);

        document.body.appendChild(popup);

        popup.style.opacity = '0';
        popup.style.transition = 'opacity 0.3s ease';
        setTimeout(function() {
            popup.style.opacity = '1';
        }, 10);
    }

    createPopup();

    window.toggleTabHackPopup = function() {
        createPopup();
    };
})();
